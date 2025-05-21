const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const Admin = require('./models/Admin');
const Company = require('./models/Company');
const Member = require('./models/Member');

// Sample ASAWUSA Data
const seedData = async () => {
  // Connect to DB
  await mongoose.connect(process.env.MONGODB_URI);

  // Clear existing data
  await Promise.all([
    Admin.deleteMany(),
    Company.deleteMany(),
    Member.deleteMany()
  ]);

  // Create admin
  const hashedPassword = await bcrypt.hash('asawusa2023', 10);
  const admin = await Admin.create({
    name: 'ASAWUSA Admin',
    email: 'admin@asawusa.org.za',
    password: hashedPassword,
    role: 'superadmin'
  });

  // Create sample companies
  const companies = await Company.insertMany([
    {
      name: 'ASAWUSA Head Office',
      industry: 'Labor Union',
      address: {
        street: '123 Union House',
        city: 'Johannesburg',
        state: 'Gauteng',
        zip: '2000'
      },
      contactPerson: 'General Secretary',
      contactEmail: 'secretary@asawusa.org.za',
      contactPhone: '+27 11 123 4567',
      status: 'active'
    },
    {
      name: 'Mine Workers Co',
      industry: 'Mining',
      contactPerson: 'HR Manager',
      status: 'active'
    }
  ]);

  // Create sample members
  await Member.create([
    {
      firstName: 'Thabo',
      lastName: 'Mbeki',
      email: 'thabo@mining.co.za',
      company: companies[1]._id,
      position: 'Underground Miner',
      status: 'active',
      createdBy: admin._id
    },
    {
      firstName: 'Nomsa',
      lastName: 'Zulu',
      email: 'nomsa@mining.co.za',
      company: companies[1]._id,
      position: 'Safety Officer',
      status: 'active',
      createdBy: admin._id
    }
  ]);

  console.log('ASAWUSA sample data seeded successfully');
  process.exit();
};

seedData().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});