
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import mongoose from 'mongoose';
import User from './models/User.js';
import connectDB from './config/db.js';

const checkUsers = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check Expert
    const e1 = await User.findOne({ email: "kosanar20@gmail.com" });
    console.log(`kosanar20: ${e1 ? 'YES' : 'NO'}`);

    const e2 = await User.findOne({ email: "kohsanar20@gmail.com" });
    console.log(`kohsanar20: ${e2 ? 'YES' : 'NO'}`);

    // Check Candidate
    const c1 = await User.findOne({ email: "kosana2011@gmail.com" });
    console.log(`kosana2011: ${c1 ? 'YES' : 'NO'}`);

    const c2 = await User.findOne({ email: "kohsanar2011@gmail.com" });
    console.log(`kohsanar2011: ${c2 ? 'YES' : 'NO'}`);

    process.exit();
};

checkUsers();
