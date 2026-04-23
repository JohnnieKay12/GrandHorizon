require('dotenv').config();
const mongoose = require('mongoose');

const Room = require('../models/Room');
const User = require('../models/User');

// ================= CONNECT DB =================
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB Connected\n');
};

// ================= ROOMS DATA =================
const roomsData = [
   // Cheap Rooms (₦15,000 - ₦35,000)
  {
    name: 'Cozy Single Room',
    price: 15000,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    ],
    description: 'A comfortable single room perfect for solo travelers. Features a single bed, private bathroom, air conditioning, and free Wi-Fi. Ideal for budget-conscious guests seeking a clean and cozy stay.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Work Desk', 'Daily Housekeeping'],
    category: 'cheap',
    maxGuests: 1,
    bedType: 'Single Bed',
    roomSize: '18 sqm',
    rating: 4.2,
    reviewCount: 45
  },
  {
    name: 'Standard Twin Room',
    price: 22000,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'
    ],
    description: 'Spacious twin room with two comfortable single beds. Perfect for friends or colleagues traveling together. Includes modern amenities and a pleasant city view.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Fridge', 'Coffee Maker'],
    category: 'cheap',
    maxGuests: 2,
    bedType: '2 Single Beds',
    roomSize: '24 sqm',
    rating: 4.3,
    reviewCount: 62
  },
  {
    name: 'Budget Double Room',
    price: 28000,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
    ],
    description: 'Affordable double room with a comfortable queen bed. Great value for couples or solo travelers wanting extra space. Clean, modern, and well-maintained.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Flat Screen TV', 'Closet', 'Desk'],
    category: 'cheap',
    maxGuests: 2,
    bedType: 'Queen Bed',
    roomSize: '22 sqm',
    rating: 4.4,
    reviewCount: 78
  },
  {
    name: 'Economy Family Room',
    price: 35000,
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800'
    ],
    description: 'Budget-friendly family room accommodating up to 3 guests. Features a double bed and a single bed, perfect for small families on a budget.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Fridge', 'Safe'],
    category: 'cheap',
    maxGuests: 3,
    bedType: '1 Double + 1 Single',
    roomSize: '28 sqm',
    rating: 4.1,
    reviewCount: 34
  },
  {
    name: 'Compact Studio',
    price: 20000,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'
    ],
    description: 'Efficient studio room with all essentials. Features a small kitchenette, perfect for extended stays on a budget. Clean, functional, and comfortable.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Kitchenette', 'TV', 'Microwave', 'Refrigerator'],
    category: 'cheap',
    maxGuests: 2,
    bedType: 'Double Bed',
    roomSize: '20 sqm',
    rating: 4.0,
    reviewCount: 28
  },

  // Standard Rooms (₦40,000 - ₦80,000)
  {
    name: 'Deluxe Queen Room',
    price: 45000,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
    ],
    description: 'Elegant deluxe room featuring a plush queen bed, modern decor, and premium amenities. Perfect for business travelers or couples seeking comfort and style.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Coffee Machine', 'Safe', 'Bathrobe'],
    category: 'standard',
    maxGuests: 2,
    bedType: 'Queen Bed',
    roomSize: '32 sqm',
    rating: 4.6,
    reviewCount: 124
  },
  {
    name: 'Executive King Room',
    price: 55000,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
    ],
    description: 'Spacious executive room with a luxurious king bed. Features a work area, premium bedding, and upscale amenities for discerning guests.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Work Desk', 'Safe', 'Bathrobe', 'Slippers'],
    category: 'standard',
    maxGuests: 2,
    bedType: 'King Bed',
    roomSize: '38 sqm',
    rating: 4.7,
    reviewCount: 156
  },
  {
    name: 'Superior Double Room',
    price: 50000,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'
    ],
    description: 'Superior room offering extra space and comfort. Features elegant furnishings, city views, and all modern conveniences for a pleasant stay.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Seating Area', 'Safe', 'Hair Dryer'],
    category: 'standard',
    maxGuests: 2,
    bedType: 'King Bed',
    roomSize: '35 sqm',
    rating: 4.5,
    reviewCount: 98
  },
  {
    name: 'Family Suite',
    price: 75000,
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800'
    ],
    description: 'Perfect for families, this suite offers a separate living area and bedroom. Accommodates up to 4 guests with comfort and privacy.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Bathrooms', 'Smart TV', 'Mini Bar', 'Living Room', 'Safe', 'Kitchenette'],
    category: 'standard',
    maxGuests: 4,
    bedType: '2 Queen Beds',
    roomSize: '55 sqm',
    rating: 4.6,
    reviewCount: 87
  },
  {
    name: 'Garden View Room',
    price: 48000,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
    ],
    description: 'Relaxing room with beautiful garden views. Features a private balcony, perfect for morning coffee or evening relaxation.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Balcony', 'Safe', 'Coffee Machine'],
    category: 'standard',
    maxGuests: 2,
    bedType: 'Queen Bed',
    roomSize: '34 sqm',
    rating: 4.7,
    reviewCount: 112
  },
  {
    name: 'Business Room',
    price: 52000,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    ],
    description: 'Designed for business travelers with a spacious work desk, high-speed internet, and express laundry service. Comfort meets productivity.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Work Desk', 'Printer Access', 'Safe', 'Iron'],
    category: 'standard',
    maxGuests: 2,
    bedType: 'King Bed',
    roomSize: '36 sqm',
    rating: 4.5,
    reviewCount: 76
  },
  {
    name: 'Pool View Room',
    price: 58000,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'
    ],
    description: 'Enjoy stunning pool views from your private balcony. Features premium amenities and direct pool access for a refreshing stay.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Pool View Balcony', 'Safe', 'Bathrobe'],
    category: 'standard',
    maxGuests: 2,
    bedType: 'King Bed',
    roomSize: '37 sqm',
    rating: 4.6,
    reviewCount: 93
  },

  // Luxury Rooms (₦100,000 - ₦250,000)
  {
    name: 'Presidential Suite',
    price: 250000,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
    ],
    description: 'The epitome of luxury living. Our Presidential Suite offers a master bedroom, separate living room, dining area, and private terrace with panoramic city views. Includes butler service and exclusive amenities.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Bathrooms', 'Smart TV', 'Full Bar', 'Dining Room', 'Butler Service', 'Private Terrace', 'Jacuzzi', 'Safe'],
    category: 'luxury',
    maxGuests: 4,
    bedType: 'King Bed + Sofa Bed',
    roomSize: '120 sqm',
    rating: 5.0,
    reviewCount: 34
  },
  {
    name: 'Royal Suite',
    price: 180000,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
    ],
    description: 'Experience royal treatment in our magnificent Royal Suite. Features opulent furnishings, a private jacuzzi, and stunning views. Perfect for special occasions.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'Living Area', 'Jacuzzi', 'City View', 'Safe', 'Champagne Welcome'],
    category: 'luxury',
    maxGuests: 2,
    bedType: 'King Bed',
    roomSize: '85 sqm',
    rating: 4.9,
    reviewCount: 56
  },
  {
    name: 'Penthouse Suite',
    price: 220000,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800'
    ],
    description: 'Located on the top floor, our Penthouse Suite offers breathtaking 360-degree views. Features a private rooftop terrace, infinity pool access, and world-class amenities.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Bathrooms', 'Smart TV', 'Full Kitchen', 'Rooftop Terrace', 'Infinity Pool Access', 'Personal Chef', 'Safe', 'Helicopter Transfer'],
    category: 'luxury',
    maxGuests: 4,
    bedType: '2 King Beds',
    roomSize: '150 sqm',
    rating: 4.9,
    reviewCount: 28
  },
  {
    name: 'Honeymoon Suite',
    price: 150000,
    images: [
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800'
    ],
    description: 'Romantic suite designed for couples. Features a four-poster bed, rose petal service, couples spa bath, and intimate dining setup. Create unforgettable memories.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'Spa Bath', 'Romantic Decor', 'Champagne', 'Couples Massage', 'Late Checkout'],
    category: 'luxury',
    maxGuests: 2,
    bedType: 'King Four-Poster Bed',
    roomSize: '65 sqm',
    rating: 4.8,
    reviewCount: 67
  },
  {
    name: 'Ambassador Suite',
    price: 120000,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
    ],
    description: 'Sophisticated suite perfect for VIP guests. Features a separate living room, premium amenities, and personalized concierge service.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Bathrooms', 'Smart TV', 'Mini Bar', 'Living Room', 'Concierge Service', 'Airport Transfer', 'Safe', 'Premium Toiletries'],
    category: 'luxury',
    maxGuests: 3,
    bedType: 'King Bed',
    roomSize: '75 sqm',
    rating: 4.7,
    reviewCount: 45
  },
  {
    name: 'Ocean View Villa',
    price: 200000,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
    ],
    description: 'Stunning villa with direct ocean views. Features floor-to-ceiling windows, private balcony, and exclusive beach access. The ultimate coastal retreat.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'Ocean View Balcony', 'Beach Access', 'Sunset Deck', 'Safe', 'Beach Butler'],
    category: 'luxury',
    maxGuests: 2,
    bedType: 'King Bed',
    roomSize: '70 sqm',
    rating: 4.9,
    reviewCount: 52
  },
  {
    name: 'Garden Villa',
    price: 160000,
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
    ],
    description: 'Private villa surrounded by lush gardens. Features a private plunge pool, outdoor shower, and serene atmosphere for ultimate relaxation.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'Private Pool', 'Garden Access', 'Outdoor Shower', 'Safe', 'Yoga Deck'],
    category: 'luxury',
    maxGuests: 2,
    bedType: 'King Bed',
    roomSize: '80 sqm',
    rating: 4.8,
    reviewCount: 41
  },
  {
    name: 'Skyline Suite',
    price: 135000,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    ],
    description: 'Modern suite with stunning city skyline views. Features contemporary design, smart home controls, and a private balcony for enjoying the urban landscape.',
    amenities: ['Free Wi-Fi', 'Smart Home', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'City View Balcony', 'Smart Controls', 'Nespresso Machine', 'Safe', 'Evening Turndown'],
    category: 'luxury',
    maxGuests: 2,
    bedType: 'King Bed',
    roomSize: '60 sqm',
    rating: 4.7,
    reviewCount: 38
  }
];

// ================= SEED ADMIN =================
const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@grandhorizon.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
  const adminName = process.env.ADMIN_NAME || 'System Administrator';

  const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

  if (existingAdmin) {
    console.log(`ℹ️ Admin already exists: ${adminEmail}`);

    if (existingAdmin.role !== 'admin') {
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('✅ Updated role to admin');
    }

    return;
  }

  const admin = new User({
    name: adminName,
    email: adminEmail.toLowerCase(),
    password: adminPassword,
    role: 'admin',
    authProvider: 'local'
  });

  await admin.save();

  console.log('\n========================================');
  console.log('✅ Admin Created Successfully');
  console.log(`Email: ${adminEmail}`);
  console.log('========================================\n');
};

// ================= SEED ROOMS =================
const seedRooms = async () => {
  await Room.deleteMany();
  console.log('🧹 Cleared existing rooms...');

  const createdRooms = await Room.insertMany(roomsData);

  console.log(`✅ Seeded ${createdRooms.length} rooms`);

  const cheap = createdRooms.filter(r => r.category === 'cheap').length;
  const standard = createdRooms.filter(r => r.category === 'standard').length;
  const luxury = createdRooms.filter(r => r.category === 'luxury').length;

  console.log('\nRoom Summary:');
  console.log(`- Cheap: ${cheap}`);
  console.log(`- Standard: ${standard}`);
  console.log(`- Luxury: ${luxury}`);
};

// ================= MAIN RUNNER =================
const seedAll = async () => {
  try {
    await connectDB();

    await seedAdmin();   // ✅ create admin first
    await seedRooms();   // ✅ then seed rooms

    console.log('\n🎉 ALL DATA SEEDED SUCCESSFULLY');
    process.exit();

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedAll();








// require('dotenv').config();
// const mongoose = require('mongoose');
// const Room = require('../models/Room');
// const connectDB = require('./db');

// // Sample room data
// const roomsData = [
//   // Cheap Rooms (₦15,000 - ₦35,000)
//   {
//     name: 'Cozy Single Room',
//     price: 15000,
//     images: [
//       'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
//       'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
//     ],
//     description: 'A comfortable single room perfect for solo travelers. Features a single bed, private bathroom, air conditioning, and free Wi-Fi. Ideal for budget-conscious guests seeking a clean and cozy stay.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Work Desk', 'Daily Housekeeping'],
//     category: 'cheap',
//     maxGuests: 1,
//     bedType: 'Single Bed',
//     roomSize: '18 sqm',
//     rating: 4.2,
//     reviewCount: 45
//   },
//   {
//     name: 'Standard Twin Room',
//     price: 22000,
//     images: [
//       'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
//       'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'
//     ],
//     description: 'Spacious twin room with two comfortable single beds. Perfect for friends or colleagues traveling together. Includes modern amenities and a pleasant city view.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Fridge', 'Coffee Maker'],
//     category: 'cheap',
//     maxGuests: 2,
//     bedType: '2 Single Beds',
//     roomSize: '24 sqm',
//     rating: 4.3,
//     reviewCount: 62
//   },
//   {
//     name: 'Budget Double Room',
//     price: 28000,
//     images: [
//       'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
//       'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
//     ],
//     description: 'Affordable double room with a comfortable queen bed. Great value for couples or solo travelers wanting extra space. Clean, modern, and well-maintained.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Flat Screen TV', 'Closet', 'Desk'],
//     category: 'cheap',
//     maxGuests: 2,
//     bedType: 'Queen Bed',
//     roomSize: '22 sqm',
//     rating: 4.4,
//     reviewCount: 78
//   },
//   {
//     name: 'Economy Family Room',
//     price: 35000,
//     images: [
//       'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
//       'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800'
//     ],
//     description: 'Budget-friendly family room accommodating up to 3 guests. Features a double bed and a single bed, perfect for small families on a budget.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Fridge', 'Safe'],
//     category: 'cheap',
//     maxGuests: 3,
//     bedType: '1 Double + 1 Single',
//     roomSize: '28 sqm',
//     rating: 4.1,
//     reviewCount: 34
//   },
//   {
//     name: 'Compact Studio',
//     price: 20000,
//     images: [
//       'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
//       'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'
//     ],
//     description: 'Efficient studio room with all essentials. Features a small kitchenette, perfect for extended stays on a budget. Clean, functional, and comfortable.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Kitchenette', 'TV', 'Microwave', 'Refrigerator'],
//     category: 'cheap',
//     maxGuests: 2,
//     bedType: 'Double Bed',
//     roomSize: '20 sqm',
//     rating: 4.0,
//     reviewCount: 28
//   },

//   // Standard Rooms (₦40,000 - ₦80,000)
//   {
//     name: 'Deluxe Queen Room',
//     price: 45000,
//     images: [
//       'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
//       'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
//     ],
//     description: 'Elegant deluxe room featuring a plush queen bed, modern decor, and premium amenities. Perfect for business travelers or couples seeking comfort and style.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Coffee Machine', 'Safe', 'Bathrobe'],
//     category: 'standard',
//     maxGuests: 2,
//     bedType: 'Queen Bed',
//     roomSize: '32 sqm',
//     rating: 4.6,
//     reviewCount: 124
//   },
//   {
//     name: 'Executive King Room',
//     price: 55000,
//     images: [
//       'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
//       'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
//     ],
//     description: 'Spacious executive room with a luxurious king bed. Features a work area, premium bedding, and upscale amenities for discerning guests.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Work Desk', 'Safe', 'Bathrobe', 'Slippers'],
//     category: 'standard',
//     maxGuests: 2,
//     bedType: 'King Bed',
//     roomSize: '38 sqm',
//     rating: 4.7,
//     reviewCount: 156
//   },
//   {
//     name: 'Superior Double Room',
//     price: 50000,
//     images: [
//       'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
//       'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'
//     ],
//     description: 'Superior room offering extra space and comfort. Features elegant furnishings, city views, and all modern conveniences for a pleasant stay.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Seating Area', 'Safe', 'Hair Dryer'],
//     category: 'standard',
//     maxGuests: 2,
//     bedType: 'King Bed',
//     roomSize: '35 sqm',
//     rating: 4.5,
//     reviewCount: 98
//   },
//   {
//     name: 'Family Suite',
//     price: 75000,
//     images: [
//       'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
//       'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800'
//     ],
//     description: 'Perfect for families, this suite offers a separate living area and bedroom. Accommodates up to 4 guests with comfort and privacy.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Bathrooms', 'Smart TV', 'Mini Bar', 'Living Room', 'Safe', 'Kitchenette'],
//     category: 'standard',
//     maxGuests: 4,
//     bedType: '2 Queen Beds',
//     roomSize: '55 sqm',
//     rating: 4.6,
//     reviewCount: 87
//   },
//   {
//     name: 'Garden View Room',
//     price: 48000,
//     images: [
//       'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
//       'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
//     ],
//     description: 'Relaxing room with beautiful garden views. Features a private balcony, perfect for morning coffee or evening relaxation.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Balcony', 'Safe', 'Coffee Machine'],
//     category: 'standard',
//     maxGuests: 2,
//     bedType: 'Queen Bed',
//     roomSize: '34 sqm',
//     rating: 4.7,
//     reviewCount: 112
//   },
//   {
//     name: 'Business Room',
//     price: 52000,
//     images: [
//       'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
//       'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
//     ],
//     description: 'Designed for business travelers with a spacious work desk, high-speed internet, and express laundry service. Comfort meets productivity.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Work Desk', 'Printer Access', 'Safe', 'Iron'],
//     category: 'standard',
//     maxGuests: 2,
//     bedType: 'King Bed',
//     roomSize: '36 sqm',
//     rating: 4.5,
//     reviewCount: 76
//   },
//   {
//     name: 'Pool View Room',
//     price: 58000,
//     images: [
//       'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
//       'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'
//     ],
//     description: 'Enjoy stunning pool views from your private balcony. Features premium amenities and direct pool access for a refreshing stay.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Smart TV', 'Mini Bar', 'Pool View Balcony', 'Safe', 'Bathrobe'],
//     category: 'standard',
//     maxGuests: 2,
//     bedType: 'King Bed',
//     roomSize: '37 sqm',
//     rating: 4.6,
//     reviewCount: 93
//   },

//   // Luxury Rooms (₦100,000 - ₦250,000)
//   {
//     name: 'Presidential Suite',
//     price: 250000,
//     images: [
//       'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
//       'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
//       'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
//     ],
//     description: 'The epitome of luxury living. Our Presidential Suite offers a master bedroom, separate living room, dining area, and private terrace with panoramic city views. Includes butler service and exclusive amenities.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Bathrooms', 'Smart TV', 'Full Bar', 'Dining Room', 'Butler Service', 'Private Terrace', 'Jacuzzi', 'Safe'],
//     category: 'luxury',
//     maxGuests: 4,
//     bedType: 'King Bed + Sofa Bed',
//     roomSize: '120 sqm',
//     rating: 5.0,
//     reviewCount: 34
//   },
//   {
//     name: 'Royal Suite',
//     price: 180000,
//     images: [
//       'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
//       'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
//       'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
//     ],
//     description: 'Experience royal treatment in our magnificent Royal Suite. Features opulent furnishings, a private jacuzzi, and stunning views. Perfect for special occasions.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'Living Area', 'Jacuzzi', 'City View', 'Safe', 'Champagne Welcome'],
//     category: 'luxury',
//     maxGuests: 2,
//     bedType: 'King Bed',
//     roomSize: '85 sqm',
//     rating: 4.9,
//     reviewCount: 56
//   },
//   {
//     name: 'Penthouse Suite',
//     price: 220000,
//     images: [
//       'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
//       'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
//       'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800'
//     ],
//     description: 'Located on the top floor, our Penthouse Suite offers breathtaking 360-degree views. Features a private rooftop terrace, infinity pool access, and world-class amenities.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Bathrooms', 'Smart TV', 'Full Kitchen', 'Rooftop Terrace', 'Infinity Pool Access', 'Personal Chef', 'Safe', 'Helicopter Transfer'],
//     category: 'luxury',
//     maxGuests: 4,
//     bedType: '2 King Beds',
//     roomSize: '150 sqm',
//     rating: 4.9,
//     reviewCount: 28
//   },
//   {
//     name: 'Honeymoon Suite',
//     price: 150000,
//     images: [
//       'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800',
//       'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
//       'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800'
//     ],
//     description: 'Romantic suite designed for couples. Features a four-poster bed, rose petal service, couples spa bath, and intimate dining setup. Create unforgettable memories.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'Spa Bath', 'Romantic Decor', 'Champagne', 'Couples Massage', 'Late Checkout'],
//     category: 'luxury',
//     maxGuests: 2,
//     bedType: 'King Four-Poster Bed',
//     roomSize: '65 sqm',
//     rating: 4.8,
//     reviewCount: 67
//   },
//   {
//     name: 'Ambassador Suite',
//     price: 120000,
//     images: [
//       'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
//       'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
//       'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
//     ],
//     description: 'Sophisticated suite perfect for VIP guests. Features a separate living room, premium amenities, and personalized concierge service.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Bathrooms', 'Smart TV', 'Mini Bar', 'Living Room', 'Concierge Service', 'Airport Transfer', 'Safe', 'Premium Toiletries'],
//     category: 'luxury',
//     maxGuests: 3,
//     bedType: 'King Bed',
//     roomSize: '75 sqm',
//     rating: 4.7,
//     reviewCount: 45
//   },
//   {
//     name: 'Ocean View Villa',
//     price: 200000,
//     images: [
//       'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
//       'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
//       'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
//     ],
//     description: 'Stunning villa with direct ocean views. Features floor-to-ceiling windows, private balcony, and exclusive beach access. The ultimate coastal retreat.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'Ocean View Balcony', 'Beach Access', 'Sunset Deck', 'Safe', 'Beach Butler'],
//     category: 'luxury',
//     maxGuests: 2,
//     bedType: 'King Bed',
//     roomSize: '70 sqm',
//     rating: 4.9,
//     reviewCount: 52
//   },
//   {
//     name: 'Garden Villa',
//     price: 160000,
//     images: [
//       'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
//       'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800',
//       'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
//     ],
//     description: 'Private villa surrounded by lush gardens. Features a private plunge pool, outdoor shower, and serene atmosphere for ultimate relaxation.',
//     amenities: ['Free Wi-Fi', 'Air Conditioning', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'Private Pool', 'Garden Access', 'Outdoor Shower', 'Safe', 'Yoga Deck'],
//     category: 'luxury',
//     maxGuests: 2,
//     bedType: 'King Bed',
//     roomSize: '80 sqm',
//     rating: 4.8,
//     reviewCount: 41
//   },
//   {
//     name: 'Skyline Suite',
//     price: 135000,
//     images: [
//       'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
//       'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
//       'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
//     ],
//     description: 'Modern suite with stunning city skyline views. Features contemporary design, smart home controls, and a private balcony for enjoying the urban landscape.',
//     amenities: ['Free Wi-Fi', 'Smart Home', 'Luxury Bathroom', 'Smart TV', 'Mini Bar', 'City View Balcony', 'Smart Controls', 'Nespresso Machine', 'Safe', 'Evening Turndown'],
//     category: 'luxury',
//     maxGuests: 2,
//     bedType: 'King Bed',
//     roomSize: '60 sqm',
//     rating: 4.7,
//     reviewCount: 38
//   }
// ];

// // Seed function
// const seedRooms = async () => {
//   try {
//     await connectDB();
    
//     console.log('Connected to database...');
    
//     // Clear existing rooms
//     await Room.deleteMany();
//     console.log('Cleared existing rooms...');
    
//     // Insert new rooms
//     const createdRooms = await Room.insertMany(roomsData);
//     console.log(`Successfully seeded ${createdRooms.length} rooms!`);
    
//     // Log summary by category
//     const cheapCount = createdRooms.filter(r => r.category === 'cheap').length;
//     const standardCount = createdRooms.filter(r => r.category === 'standard').length;
//     const luxuryCount = createdRooms.filter(r => r.category === 'luxury').length;
    
//     console.log('\nRoom Summary:');
//     console.log(`- Cheap Rooms: ${cheapCount}`);
//     console.log(`- Standard Rooms: ${standardCount}`);
//     console.log(`- Luxury Rooms: ${luxuryCount}`);
//     console.log(`- Total: ${createdRooms.length}`);
    
//   process.exit(0);
//   } catch (error) {
//     console.error('Error seeding rooms:', error);
//     process.exit(1);
//   }
// };

// // Run if called directly
// if (require.main === module) {
//   seedRooms();
// }

// module.exports = seedRooms;
