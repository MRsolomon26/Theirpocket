'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, User, MapPin, LogOut, Settings, Package, Heart, Plus, Edit2, Trash2, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const addressSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  recipientName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  streetAddress: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().optional(),
  isDefault: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchAddresses();
    }
  }, [session]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/user/addresses');
      const data = await response.json();
      setAddresses(data.addresses || []);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: AddressFormData) => {
    try {
      const url = editingId ? `/api/user/addresses/${editingId}` : '/api/user/addresses';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save address');
      }

      toast.success(editingId ? 'Address updated successfully' : 'Address added successfully');
      setIsCreating(false);
      setEditingId(null);
      reset();
      fetchAddresses();
    } catch (error) {
      toast.error('Failed to save address');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      const response = await fetch(`/api/user/addresses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      toast.success('Address deleted successfully');
      fetchAddresses();
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const response = await fetch(`/api/user/addresses/${id}/default`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to set default address');
      }

      toast.success('Default address updated');
      fetchAddresses();
    } catch (error) {
      toast.error('Failed to set default address');
    }
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setIsCreating(true);
    reset(address);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    reset();
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 animate-spin mx-auto text-blue-600" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/account" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Account
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Addresses
          </h1>
          <p className="mt-2 text-gray-600">Manage your shipping addresses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-2 border-gray-100">
              <CardHeader className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{session.user.name}</CardTitle>
                    <CardDescription className="text-blue-100">{session.user.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-2">
                <Link
                  href="/account"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/account/addresses"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-600 font-semibold"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Addresses</span>
                </Link>
                <Link
                  href="/account/wishlist"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Address Form */}
            {isCreating && (
              <Card className="shadow-xl border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {editingId ? 'Edit Address' : 'Add New Address'}
                  </CardTitle>
                  <CardDescription>
                    {editingId ? 'Update your address details' : 'Enter your address details'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="label" className="text-sm font-semibold">
                          Label
                        </Label>
                        <Input
                          id="label"
                          placeholder="Home, Work, etc."
                          className="border-2 focus:border-blue-500 focus:ring-blue-500"
                          {...register('label')}
                        />
                        {errors.label && (
                          <p className="text-sm text-red-500">{errors.label.message}</p>
                        )}
                      </div>
                      <div className="space-y-2 flex items-center pt-6">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isDefault"
                            {...register('isDefault')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <Label htmlFor="isDefault" className="text-sm">
                            Set as default
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientName" className="text-sm font-semibold">
                        Recipient Name
                      </Label>
                      <Input
                        id="recipientName"
                        placeholder="John Doe"
                        className="border-2 focus:border-blue-500 focus:ring-blue-500"
                        {...register('recipientName')}
                      />
                      {errors.recipientName && (
                        <p className="text-sm text-red-500">{errors.recipientName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+234 800 123 4567"
                        className="border-2 focus:border-blue-500 focus:ring-blue-500"
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="streetAddress" className="text-sm font-semibold">
                        Street Address
                      </Label>
                      <Input
                        id="streetAddress"
                        placeholder="123 Main Street"
                        className="border-2 focus:border-blue-500 focus:ring-blue-500"
                        {...register('streetAddress')}
                      />
                      {errors.streetAddress && (
                        <p className="text-sm text-red-500">{errors.streetAddress.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-semibold">
                          City
                        </Label>
                        <Input
                          id="city"
                          placeholder="Lagos"
                          className="border-2 focus:border-blue-500 focus:ring-blue-500"
                          {...register('city')}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-semibold">
                          State
                        </Label>
                        <Input
                          id="state"
                          placeholder="Lagos"
                          className="border-2 focus:border-blue-500 focus:ring-blue-500"
                          {...register('state')}
                        />
                        {errors.state && (
                          <p className="text-sm text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-sm font-semibold">
                        Postal Code (Optional)
                      </Label>
                      <Input
                        id="postalCode"
                        placeholder="100001"
                        className="border-2 focus:border-blue-500 focus:ring-blue-500"
                        {...register('postalCode')}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        {editingId ? 'Update Address' : 'Add Address'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="border-2 border-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Addresses List */}
            {!isCreating && (
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <Card
                  key={address.id}
                  className={`shadow-lg border-2 transition-all ${
                    address.isDefault
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-100 hover:border-blue-200'
                  }`}
                >
                  <CardContent className="pt-6">
                    {address.isDefault && (
                      <div className="flex items-center space-x-2 text-blue-600 mb-3">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-semibold">Default Address</span>
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span className="font-semibold text-gray-900">{address.label}</span>
                      </div>
                      <p className="text-sm text-gray-700">{address.recipientName}</p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                      <p className="text-sm text-gray-600">{address.streetAddress}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state}
                      </p>
                      {address.postalCode && (
                        <p className="text-sm text-gray-600">{address.postalCode}</p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      {!address.isDefault && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSetDefault(address.id)}
                          className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(address)}
                        className="flex-1"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(address.id)}
                        className="border-red-500 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {addresses.length === 0 && !isCreating && (
              <Card className="shadow-xl border-2 border-gray-100">
                <CardContent className="pt-12 pb-12 text-center">
                  <MapPin className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses saved</h3>
                  <p className="text-gray-600 mb-6">Add your first address to get started</p>
                  <Button
                    onClick={() => setIsCreating(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
