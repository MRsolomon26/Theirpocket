import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PhoneInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function PhoneInput({
  label = 'Phone Number',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  onChange,
  error,
  required = false,
}: PhoneInputProps) {
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');
    
    // Nigerian phone format: +234 XXX XXX XXXX
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 3) return `+${cleaned}`;
    if (cleaned.length <= 6) return `+${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange?.(formatted);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id="phone"
        type="tel"
        placeholder="+234 XXX XXX XXXX"
        value={value}
        onChange={handleChange}
        className={error ? 'border-destructive' : ''}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
