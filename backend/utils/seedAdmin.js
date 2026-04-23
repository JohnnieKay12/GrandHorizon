const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/haven_hotels';

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Default admin credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@havenhotels.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const adminName = process.env.ADMIN_NAME || 'System Administrator';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

    if (existingAdmin) {
      console.log(`Admin account already exists: ${adminEmail}`);
      console.log('Role:', existingAdmin.role);
      
      // Ensure the role is admin
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('Updated role to admin');
      }
      
      await mongoose.disconnect();
      console.log('Done.');
      return;
    }

    // Create admin user
    const admin = new User({
      name: adminName,
      email: adminEmail.toLowerCase(),
      password: adminPassword,
      role: 'admin',
      authProvider: 'local'
    });

    await admin.save();

    console.log('\n========================================');
    console.log('  Admin Account Created Successfully');
    console.log('========================================');
    console.log(`  Name:  ${adminName}`);
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Role:  admin`);
    console.log('========================================\n');

    await mongoose.disconnect();
    console.log('Done. Run "npm run seed" anytime to ensure admin exists.');
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
