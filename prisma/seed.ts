import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'clothing' },
      update: {},
      create: {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Fashionable clothing for men and women',
        sortOrder: 1,
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'shoes' },
      update: {},
      create: {
        name: 'Shoes',
        slug: 'shoes',
        description: 'Stylish footwear for every occasion',
        sortOrder: 2,
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'watches' },
      update: {},
      create: {
        name: 'Watches',
        slug: 'watches',
        description: 'Classic and modern timepieces',
        sortOrder: 3,
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Fashion accessories to complete your look',
        sortOrder: 4,
        isActive: true,
      },
    }),
  ]);

  console.log(`Created ${categories.length} categories`);

  // Create shipping zones
  const shippingZones = await Promise.all([
    prisma.shippingZone.upsert({
      where: { name: 'Lagos' },
      update: {},
      create: {
        name: 'Lagos',
        states: ['Lagos'],
        baseFee: 1500,
        freeShippingThreshold: 15000,
        estimatedDays: 2,
        isActive: true,
      },
    }),
    prisma.shippingZone.upsert({
      where: { name: 'South West' },
      update: {},
      create: {
        name: 'South West',
        states: ['Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'],
        baseFee: 2000,
        freeShippingThreshold: 20000,
        estimatedDays: 3,
        isActive: true,
      },
    }),
    prisma.shippingZone.upsert({
      where: { name: 'South East' },
      update: {},
      create: {
        name: 'South East',
        states: ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
        baseFee: 2500,
        freeShippingThreshold: 25000,
        estimatedDays: 4,
        isActive: true,
      },
    }),
    prisma.shippingZone.upsert({
      where: { name: 'North Central' },
      update: {},
      create: {
        name: 'North Central',
        states: ['Abuja', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau', 'Benue'],
        baseFee: 3000,
        freeShippingThreshold: 30000,
        estimatedDays: 5,
        isActive: true,
      },
    }),
  ]);

  console.log(`Created ${shippingZones.length} shipping zones`);

  // Create sample coupon
  const coupon = await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10,
      minOrderValue: 5000,
      maxUses: 1000,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      isActive: true,
    },
  });

  console.log(`Created coupon: ${coupon.code}`);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
