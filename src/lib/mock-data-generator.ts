// Mock data generator for 350+ products

const categories = [
  { id: '1', name: 'Clothing', slug: 'clothing' },
  { id: '2', name: 'Shoes', slug: 'shoes' },
  { id: '3', name: 'Watches', slug: 'watches' },
  { id: '4', name: 'Bags', slug: 'bags' },
  { id: '5', name: 'Accessories', slug: 'accessories' },
];

const clothingProducts = [
  { name: 'Classic White T-Shirt', basePrice: 5000 },
  { name: 'Black Polo Shirt', basePrice: 6500 },
  { name: 'Striped Casual Shirt', basePrice: 7500 },
  { name: 'Denim Jacket', basePrice: 18000 },
  { name: 'Hoodie - Navy Blue', basePrice: 12000 },
  { name: 'Sweater - Grey', basePrice: 10000 },
  { name: 'Cargo Pants - Khaki', basePrice: 14000 },
  { name: 'Slim Fit Jeans - Blue', basePrice: 15000 },
  { name: 'Chino Pants - Beige', basePrice: 13000 },
  { name: 'Shorts - White', basePrice: 8000 },
  { name: 'Tank Top - Black', basePrice: 4000 },
  { name: 'Long Sleeve Shirt - White', basePrice: 9000 },
  { name: 'Flannel Shirt - Red', basePrice: 8500 },
  { name: 'Blazer - Navy', basePrice: 25000 },
  { name: 'Cardigan - Cream', basePrice: 11000 },
  { name: 'Joggers - Grey', basePrice: 9000 },
  { name: 'Track Pants - Black', basePrice: 9500 },
  { name: 'Windbreaker - Green', basePrice: 16000 },
  { name: 'Vest - Brown', basePrice: 7000 },
  { name: 'Polo Dress - Pink', basePrice: 12000 },
  { name: 'Maxi Dress - Floral', basePrice: 18000 },
  { name: 'Sundress - Yellow', basePrice: 10000 },
  { name: 'Midi Skirt - Black', basePrice: 8500 },
  { name: 'Mini Skirt - Denim', basePrice: 7000 },
  { name: 'Blouse - White', basePrice: 9500 },
  { name: 'Crop Top - Black', basePrice: 5500 },
  { name: 'Leggings - Black', basePrice: 6000 },
  { name: 'Jumpsuit - Navy', basePrice: 15000 },
  { name: 'Romper - Floral', basePrice: 11000 },
  { name: 'Cardigan - Pink', basePrice: 10500 },
  { name: 'Sweater Dress - Grey', basePrice: 14000 },
  { name: 'Tunic - White', basePrice: 8000 },
  { name: 'Peplum Top - Red', basePrice: 9000 },
  { name: 'Wrap Dress - Blue', basePrice: 16000 },
  { name: 'Pencil Skirt - Black', basePrice: 7500 },
  { name: 'A-Line Skirt - Floral', basePrice: 8500 },
  { name: 'Culottes - Beige', basePrice: 11000 },
  { name: 'Wide Leg Pants - White', basePrice: 13000 },
  { name: 'Cropped Jeans - Blue', basePrice: 14500 },
  { name: 'High Waisted Jeans - Black', basePrice: 15500 },
  { name: 'Ripped Jeans - Grey', basePrice: 14000 },
  { name: 'Skinny Jeans - Indigo', basePrice: 15000 },
  { name: 'Bootcut Jeans - Dark Blue', basePrice: 15500 },
  { name: 'Straight Leg Jeans - Light Blue', basePrice: 14500 },
  { name: 'Mom Jeans - Vintage Wash', basePrice: 15000 },
  { name: 'Boyfriend Jeans - Blue', basePrice: 14500 },
  { name: 'Flare Jeans - Black', basePrice: 16000 },
  { name: 'Cropped Hoodie - Grey', basePrice: 11000 },
  { name: 'Oversized Hoodie - Black', basePrice: 13000 },
  { name: 'Zip Up Hoodie - Navy', basePrice: 12000 },
  { name: 'Pullover Hoodie - Red', basePrice: 11500 },
  { name: 'Graphic Hoodie - White', basePrice: 12500 },
  { name: 'Fleece Hoodie - Brown', basePrice: 13500 },
  { name: 'Cropped Sweater - Pink', basePrice: 10000 },
  { name: 'Chunky Knit Sweater - Cream', basePrice: 14000 },
  { name: 'Lightweight Sweater - Grey', basePrice: 11000 },
  { name: 'V-Neck Sweater - Navy', basePrice: 12000 },
  { name: 'Crew Neck Sweater - Black', basePrice: 11500 },
  { name: 'Turtleneck Sweater - White', basePrice: 13000 },
  { name: 'Cardigan Sweater - Beige', basePrice: 12500 },
  { name: 'Cable Knit Sweater - Red', basePrice: 14500 },
  { name: 'Ribbed Sweater - Green', basePrice: 12000 },
  { name: 'Striped Sweater - Blue', basePrice: 11500 },
  { name: 'Color Block Sweater - Yellow', basePrice: 12500 },
  { name: 'Oversized Sweater - Grey', basePrice: 13500 },
  { name: 'Crop Sweater - Black', basePrice: 10500 },
  { name: 'Longline Sweater - Navy', basePrice: 14000 },
  { name: 'Button Down Cardigan - Pink', basePrice: 13000 },
  { name: 'Open Front Cardigan - Cream', basePrice: 12000 },
  { name: 'Long Cardigan - Brown', basePrice: 13500 },
  { name: 'Short Cardigan - White', basePrice: 11000 },
  { name: 'Shawl Collar Cardigan - Grey', basePrice: 14000 },
  { name: 'Belted Cardigan - Black', basePrice: 14500 },
  { name: 'Kimono Cardigan - Floral', basePrice: 12500 },
  { name: 'Cropped Cardigan - Navy', basePrice: 11500 },
  { name: 'Sleeveless Cardigan - Beige', basePrice: 10500 },
];

const shoesProducts = [
  { name: 'White Sneakers', basePrice: 15000 },
  { name: 'Black Running Shoes', basePrice: 18000 },
  { name: 'Canvas Shoes - Blue', basePrice: 12000 },
  { name: 'Leather Loafers - Brown', basePrice: 22000 },
  { name: 'Oxford Shoes - Black', basePrice: 25000 },
  { name: 'Derby Shoes - Tan', basePrice: 23000 },
  { name: 'Boots - Brown Leather', basePrice: 28000 },
  { name: 'Chelsea Boots - Black', basePrice: 26000 },
  { name: 'Ankle Boots - Grey', basePrice: 24000 },
  { name: 'High Top Sneakers - White', basePrice: 17000 },
  { name: 'Low Top Sneakers - Black', basePrice: 16000 },
  { name: 'Slip On Sneakers - Grey', basePrice: 14000 },
  { name: 'Basketball Shoes - Red', basePrice: 20000 },
  { name: 'Training Shoes - Blue', basePrice: 19000 },
  { name: 'Walking Shoes - Green', basePrice: 17500 },
  { name: 'Trail Running Shoes - Orange', basePrice: 21000 },
  { name: 'Cross Training Shoes - Purple', basePrice: 19500 },
  { name: 'Minimalist Shoes - White', basePrice: 16500 },
  { name: 'Memory Foam Shoes - Black', basePrice: 18500 },
  { name: 'Gel Running Shoes - Blue', basePrice: 22000 },
  { name: 'Cushioned Walking Shoes - Pink', basePrice: 18000 },
  { name: 'Lightweight Running Shoes - Yellow', basePrice: 20000 },
  { name: 'Breathable Sneakers - Green', basePrice: 17000 },
  { name: 'Waterproof Shoes - Navy', basePrice: 24000 },
  { name: 'Slip Resistant Shoes - Brown', basePrice: 19500 },
  { name: 'Orthopedic Shoes - Black', basePrice: 26000 },
  { name: 'Comfort Shoes - Beige', basePrice: 21000 },
  { name: 'Dress Shoes - Black Patent', basePrice: 28000 },
  { name: 'Formal Shoes - Brown', basePrice: 27000 },
  { name: 'Party Shoes - Silver', basePrice: 22000 },
  { name: 'Evening Shoes - Gold', basePrice: 24000 },
  { name: 'Wedge Heels - Nude', basePrice: 18000 },
  { name: 'Stiletto Heels - Black', basePrice: 20000 },
  { name: 'Block Heels - Red', basePrice: 19000 },
  { name: 'Platform Shoes - White', basePrice: 17000 },
  { name: 'Flats - Black', basePrice: 14000 },
  { name: 'Ballet Flats - Pink', basePrice: 13000 },
  { name: 'Mules - Beige', basePrice: 15000 },
  { name: 'Slides - Gold', basePrice: 16000 },
  { name: 'Sandals - Brown', basePrice: 12000 },
  { name: 'Flip Flops - Blue', basePrice: 8000 },
  { name: 'Espadrilles - White', basePrice: 11000 },
  { name: 'Clogs - Red', basePrice: 13000 },
  { name: 'Moccasins - Tan', basePrice: 15000 },
  { name: 'Boat Shoes - Navy', basePrice: 17000 },
  { name: 'Driving Shoes - Black', basePrice: 16000 },
  { name: 'Slippers - Grey', basePrice: 9000 },
  { name: 'House Shoes - Pink', basePrice: 8500 },
];

const watchesProducts = [
  { name: 'Classic Leather Watch', basePrice: 25000 },
  { name: 'Sport Watch - Black', basePrice: 30000 },
  { name: 'Digital Watch - Blue', basePrice: 15000 },
  { name: 'Smart Watch - Silver', basePrice: 45000 },
  { name: 'Analog Watch - Gold', basePrice: 35000 },
  { name: 'Chronograph Watch - Brown', basePrice: 40000 },
  { name: 'Diving Watch - Black', basePrice: 38000 },
  { name: 'Pilot Watch - Silver', basePrice: 42000 },
  { name: 'Dress Watch - Gold', basePrice: 50000 },
  { name: 'Minimalist Watch - White', basePrice: 28000 },
  { name: 'Skeleton Watch - Silver', basePrice: 55000 },
  { name: 'Moonphase Watch - Blue', basePrice: 60000 },
  { name: 'GMT Watch - Black', basePrice: 48000 },
  { name: 'World Timer Watch - Gold', basePrice: 65000 },
  { name: 'Perpetual Calendar Watch - Silver', basePrice: 70000 },
  { name: 'Tourbillon Watch - Platinum', basePrice: 150000 },
  { name: 'Pocket Watch - Gold', basePrice: 45000 },
  { name: 'Pocket Watch - Silver', basePrice: 40000 },
  { name: 'Vintage Watch - Bronze', basePrice: 55000 },
  { name: 'Retro Watch - Cream', basePrice: 32000 },
  { name: 'Modern Watch - Black', basePrice: 35000 },
  { name: 'Futuristic Watch - Silver', basePrice: 42000 },
  { name: 'Luxury Watch - Gold', basePrice: 80000 },
  { name: 'Designer Watch - Rose Gold', basePrice: 75000 },
  { name: 'Limited Edition Watch - Titanium', basePrice: 95000 },
  { name: 'Automatic Watch - Steel', basePrice: 38000 },
  { name: 'Mechanical Watch - Brass', basePrice: 42000 },
  { name: 'Quartz Watch - Silver', basePrice: 25000 },
  { name: 'Solar Watch - Black', basePrice: 28000 },
  { name: 'Kinetic WatchBlue', basePrice: 32000 },
  { name: 'Eco Drive Watch - Green', basePrice: 30000 },
  { name: 'Radio Controlled Watch - Silver', basePrice: 36000 },
  { name: 'Atomic Watch - Black', basePrice: 40000 },
  { name: 'GPS Watch - Orange', basePrice: 45000 },
  { name: 'Heart Rate Monitor Watch - Red', basePrice: 35000 },
  { name: 'Fitness Tracker Watch - Blue', basePrice: 30000 },
  { name: 'Sleep Tracker Watch - Purple', basePrice: 32000 },
  { name: 'Step Counter Watch - Green', basePrice: 28000 },
  { name: 'Calorie Tracker Watch - Yellow', basePrice: 30000 },
  { name: 'Music Player Watch - Pink', basePrice: 35000 },
  { name: 'Phone Sync Watch - White', basePrice: 40000 },
  { name: 'Notification Watch - Grey', basePrice: 38000 },
  { name: 'Voice Control Watch - Black', basePrice: 42000 },
  { name: 'Touch Screen Watch - Silver', basePrice: 45000 },
  { name: 'Waterproof Watch - Blue', basePrice: 32000 },
  { name: 'Shock Resistant Watch - Orange', basePrice: 35000 },
  { name: 'Anti Magnetic Watch - Green', basePrice: 38000 },
  { name: 'Scratch Resistant Watch - Red', basePrice: 40000 },
];

const bagsProducts = [
  { name: 'Canvas Backpack', basePrice: 12000 },
  { name: 'Leather Backpack - Brown', basePrice: 25000 },
  { name: 'School Backpack - Navy', basePrice: 15000 },
  { name: 'Laptop Backpack - Black', basePrice: 18000 },
  { name: 'Travel Backpack - Grey', basePrice: 20000 },
  { name: 'Hiking Backpack - Green', basePrice: 22000 },
  { name: 'Daypack - Blue', basePrice: 14000 },
  { name: 'Hydration Pack - Red', basePrice: 16000 },
  { name: 'Camera Backpack - Black', basePrice: 28000 },
  { name: 'Gym Bag - Purple', basePrice: 13000 },
  { name: 'Duffel Bag - Brown', basePrice: 17000 },
  { name: 'Weekend Bag - Beige', basePrice: 19000 },
  { name: 'Tote Bag - Black', basePrice: 15000 },
  { name: 'Leather Tote - Tan', basePrice: 28000 },
  { name: 'Canvas Tote - White', basePrice: 12000 },
  { name: 'Shoulder Bag - Red', basePrice: 16000 },
  { name: 'Crossbody Bag - Navy', basePrice: 14000 },
  { name: 'Messenger Bag - Grey', basePrice: 18000 },
  { name: 'Satchel - Brown', basePrice: 22000 },
  { name: 'Clutch - Black', basePrice: 10000 },
  { name: 'Evening Bag - Gold', basePrice: 15000 },
  { name: 'Wristlet - Silver', basePrice: 8000 },
  { name: 'Pouch - Pink', basePrice: 6000 },
  { name: 'Cosmetic Bag - Blue', basePrice: 7000 },
  { name: 'Makeup Bag - Green', basePrice: 8000 },
  { name: 'Toiletry Bag - Orange', basePrice: 9000 },
  { name: 'Shoe Bag - Yellow', basePrice: 7500 },
  { name: 'Laundry Bag - Purple', basePrice: 6500 },
  { name: 'Garment Bag - Black', basePrice: 20000 },
  { name: 'Suit Bag - Navy', basePrice: 22000 },
  { name: 'Dress Bag - Brown', basePrice: 24000 },
  { name: 'Garment Cover - Grey', basePrice: 18000 },
  { name: 'Luggage Set - Black', basePrice: 45000 },
  { name: 'Suitcase - Silver', basePrice: 35000 },
  { name: 'Carry On - Red', basePrice: 28000 },
  { name: 'Checked Bag - Blue', basePrice: 32000 },
  { name: 'Hard Shell Suitcase - Pink', basePrice: 38000 },
  { name: 'Soft Shell Suitcase - Green', basePrice: 34000 },
  { name: 'Spinner Suitcase - Orange', basePrice: 40000 },
  { name: 'Wheeled Duffel - Yellow', basePrice: 30000 },
  { name: 'Travel Organizer - Beige', basePrice: 12000 },
  { name: 'Packing Cubes - Multi', basePrice: 8000 },
  { name: 'Travel Pillow - White', basePrice: 5000 },
  { name: 'Eye Mask - Black', basePrice: 3000 },
  { name: 'Travel Blanket - Grey', basePrice: 7000 },
  { name: 'Luggage Tag - Silver', basePrice: 2000 },
  { name: 'Luggage Lock - Gold', basePrice: 2500 },
  { name: 'Travel Wallet - Brown', basePrice: 6000 },
  { name: 'Passport Holder - Navy', basePrice: 4500 },
  { name: 'Boarding Pass Holder - Red', basePrice: 3500 },
  { name: 'Travel Pouch - Blue', basePrice: 4000 },
];

const accessoriesProducts = [
  { name: 'Sunglasses - Black', basePrice: 8000 },
  { name: 'Sunglasses - Brown', basePrice: 9000 },
  { name: 'Sunglasses - Aviator', basePrice: 12000 },
  { name: 'Sunglasses - Wayfarer', basePrice: 10000 },
  { name: 'Sunglasses - Round', basePrice: 11000 },
  { name: 'Sunglasses - Cat Eye', basePrice: 9500 },
  { name: 'Sunglasses - Sport', basePrice: 8500 },
  { name: 'Sunglasses - Polarized', basePrice: 15000 },
  { name: 'Leather Belt - Black', basePrice: 6000 },
  { name: 'Leather Belt - Brown', basePrice: 6500 },
  { name: 'Canvas Belt - Navy', basePrice: 4000 },
  { name: 'Braided Belt - Tan', basePrice: 5000 },
  { name: 'Western Belt - Red', basePrice: 5500 },
  { name: 'Dress Belt - Black', basePrice: 7000 },
  { name: 'Casual Belt - Grey', basePrice: 4500 },
  { name: 'Reversible Belt - Brown', basePrice: 7500 },
  { name: 'Wallet - Leather Black', basePrice: 8000 },
  { name: 'Wallet - Leather Brown', basePrice: 8500 },
  { name: 'Wallet - Bifold', basePrice: 7000 },
  { name: 'Wallet - Trifold', basePrice: 7500 },
  { name: 'Card Holder - Slim', basePrice: 5000 },
  { name: 'Money Clip - Silver', basePrice: 6000 },
  { name: 'Coin Purse - Leather', basePrice: 4000 },
  { name: 'Phone Case - Black', basePrice: 3000 },
  { name: 'Phone Case - Clear', basePrice: 2500 },
  { name: 'Phone Case - Leather', basePrice: 5000 },
  { name: 'Phone Case - Rugged', basePrice: 6000 },
  { name: 'Phone Case - Designer', basePrice: 8000 },
  { name: 'Phone Case - Wallet', basePrice: 7000 },
  { name: 'Phone Case - Battery', basePrice: 10000 },
  { name: 'Phone Case - Waterproof', basePrice: 9000 },
  { name: 'Screen Protector - Glass', basePrice: 2000 },
  { name: 'Screen Protector - Film', basePrice: 1500 },
  { name: 'Charging Cable - USB', basePrice: 2500 },
  { name: 'Charging Cable - Lightning', basePrice: 3000 },
  { name: 'Charging Cable - Type C', basePrice: 2800 },
  { name: 'Power Bank - 10000mAh', basePrice: 12000 },
  { name: 'Power Bank - 20000mAh', basePrice: 18000 },
  { name: 'Wireless Charger - Black', basePrice: 8000 },
  { name: 'Car Charger - Dual USB', basePrice: 4000 },
  { name: 'Wall Charger - Fast', basePrice: 5000 },
  { name: 'Earbuds - Wireless', basePrice: 15000 },
  { name: 'Headphones - Over Ear', basePrice: 25000 },
  { name: 'Headphones - On Ear', basePrice: 18000 },
  { name: 'Headphones - In Ear', basePrice: 12000 },
  { name: 'Speaker - Bluetooth', basePrice: 20000 },
  { name: 'Speaker - Portable', basePrice: 15000 },
  { name: 'Speaker - Waterproof', basePrice: 18000 },
  { name: 'Hat - Baseball Cap', basePrice: 5000 },
  { name: 'Hat - Beanie', basePrice: 4000 },
  { name: 'Hat - Fedora', basePrice: 8000 },
  { name: 'Hat - Bucket', basePrice: 6000 },
  { name: 'Hat - Sun Hat', basePrice: 7000 },
  { name: 'Scarf - Wool', basePrice: 5000 },
  { name: 'Scarf - Silk', basePrice: 7000 },
  { name: 'Scarf - Cotton', basePrice: 4000 },
  { name: 'Scarf - Infinity', basePrice: 5500 },
  { name: 'Gloves - Leather', basePrice: 6000 },
  { name: 'Gloves - Wool', basePrice: 5000 },
  { name: 'Gloves - Touchscreen', basePrice: 7000 },
  { name: 'Socks - Cotton Pack', basePrice: 3000 },
  { name: 'Socks - Wool Pack', basePrice: 4000 },
  { name: 'Socks - Athletic', basePrice: 3500 },
  { name: 'Jewelry - Necklace', basePrice: 15000 },
  { name: 'Jewelry - Bracelet', basePrice: 12000 },
  { name: 'Jewelry - Earrings', basePrice: 10000 },
  { name: 'Jewelry - Ring', basePrice: 18000 },
  { name: 'Jewelry - Anklet', basePrice: 8000 },
  { name: 'Jewelry - Pendant', basePrice: 14000 },
  { name: 'Keychain - Leather', basePrice: 2500 },
  { name: 'Keychain - Metal', basePrice: 3000 },
  { name: 'Keychain - Personalized', basePrice: 4000 },
  { name: 'Lanyard - Nylon', basePrice: 2000 },
  { name: 'Lanyard - Breakaway', basePrice: 2500 },
  { name: 'Badge Holder - Clear', basePrice: 1500 },
  { name: 'ID Card Holder - Leather', basePrice: 3500 },
  { name: 'Pen - Premium', basePrice: 5000 },
  { name: 'Notebook - Leather', basePrice: 6000 },
  { name: 'Planner - Weekly', basePrice: 8000 },
  { name: 'Organizer - Desk', basePrice: 10000 },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colours = ['Black', 'White', 'Navy', 'Grey', 'Brown', 'Beige', 'Red', 'Blue', 'Green', 'Pink', 'Yellow', 'Purple', 'Orange', 'Cream', 'Tan'];

const clothingImages = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=800&fit=crop',
];

const shoesImages = [
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop',
];

const watchesImages = [
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&h=800&fit=crop',
];

const bagsImages = [
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
];

const accessoriesImages = [
  'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateVariants(categoryId: string, basePrice: number, images: string[]) {
  const variantCount = Math.floor(Math.random() * 4) + 1; // 1-4 variants
  const variants = [];
  
  for (let i = 0; i < variantCount; i++) {
    const hasSize = categoryId === '1'; // Only clothing has sizes
    const hasColour = true;
    
    const size = hasSize ? getRandomItem(sizes) : undefined;
    const colour = hasColour ? getRandomItem(colours) : undefined;
    const price = basePrice + Math.floor(Math.random() * 2000) - 1000; // Price variation
    const stock = Math.floor(Math.random() * 100) + 1;
    const name = size || colour || 'Standard';
    
    variants.push({
      id: `${categoryId}-${Date.now()}-${i}`,
      name,
      sku: `${categoryId.substring(0, 3).toUpperCase()}-${size?.charAt(0) || 'N'}-${colour?.substring(0, 3).toUpperCase() || 'NA'}`,
      size,
      colour,
      price: Math.max(price, basePrice * 0.8),
      stock,
      images: images.slice(0, Math.floor(Math.random() * 3) + 1),
      isActive: true,
    });
  }
  
  return variants;
}

export function generateProducts() {
  const allProducts: Product[] = [];

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  isPublished: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  category: { id: string; name: string; slug: string };
  variants: Array<{
    id: string;
    name: string;
    price: number;
    stock: number;
    images: string[];
  }>;
}
  let productIdCounter = 1;

  // Generate clothing products
  clothingProducts.forEach((product) => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const images = getRandomItem(clothingImages);
    
    allProducts.push({
      id: String(productIdCounter++),
      name: product.name,
      slug,
      description: `High-quality ${product.name} made from premium materials. Perfect for everyday wear.`,
      basePrice: product.basePrice,
      isPublished: true,
      isFeatured: Math.random() > 0.8,
      isBestseller: Math.random() > 0.7,
      category: categories[0],
      variants: generateVariants('1', product.basePrice, [images, getRandomItem(clothingImages)]),
    });
  });

  // Generate shoes products
  shoesProducts.forEach((product) => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const images = getRandomItem(shoesImages);
    
    allProducts.push({
      id: String(productIdCounter++),
      name: product.name,
      slug,
      description: `Comfortable and stylish ${product.name} for all occasions.`,
      basePrice: product.basePrice,
      isPublished: true,
      isFeatured: Math.random() > 0.8,
      isBestseller: Math.random() > 0.7,
      category: categories[1],
      variants: generateVariants('2', product.basePrice, [images, getRandomItem(shoesImages)]),
    });
  });

  // Generate watches products
  watchesProducts.forEach((product) => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const images = getRandomItem(watchesImages);
    
    allProducts.push({
      id: String(productIdCounter++),
      name: product.name,
      slug,
      description: `Elegant ${product.name} with precision timekeeping.`,
      basePrice: product.basePrice,
      isPublished: true,
      isFeatured: Math.random() > 0.8,
      isBestseller: Math.random() > 0.7,
      category: categories[2],
      variants: generateVariants('3', product.basePrice, [images, getRandomItem(watchesImages)]),
    });
  });

  // Generate bags products
  bagsProducts.forEach((product) => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const images = getRandomItem(bagsImages);
    
    allProducts.push({
      id: String(productIdCounter++),
      name: product.name,
      slug,
      description: `Durable and functional ${product.name} for everyday use.`,
      basePrice: product.basePrice,
      isPublished: true,
      isFeatured: Math.random() > 0.8,
      isBestseller: Math.random() > 0.7,
      category: categories[3],
      variants: generateVariants('4', product.basePrice, [images, getRandomItem(bagsImages)]),
    });
  });

  // Generate accessories products
  accessoriesProducts.forEach((product) => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const images = getRandomItem(accessoriesImages);
    
    allProducts.push({
      id: String(productIdCounter++),
      name: product.name,
      slug,
      description: `Premium quality ${product.name} to complete your look.`,
      basePrice: product.basePrice,
      isPublished: true,
      isFeatured: Math.random() > 0.8,
      isBestseller: Math.random() > 0.7,
      category: categories[4],
      variants: generateVariants('5', product.basePrice, [images, getRandomItem(accessoriesImages)]),
    });
  });

  return allProducts;
}

export function generateCategories() {
  return categories.map((cat, index) => ({
    ...cat,
    description: `${cat.name} - Quality products at affordable prices`,
    imageUrl: [clothingImages, shoesImages, watchesImages, bagsImages, accessoriesImages][index]?.[0] || null,
    sortOrder: index + 1,
    _count: { products: Math.floor(Math.random() * 50) + 20 },
  }));
}
