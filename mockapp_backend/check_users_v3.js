
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import mongoose from 'mongoose';
import User from './models/User.js';
import connectDB from './config/db.js';

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const emailsToCheck = [
            "kosanar20@gmail.com", 
            "kosana2011@gmail.com",
            "kohsanar20@gmail.com", 
            "kohsanar2011@gmail.com"
        ];

        for (const email of emailsToCheck) {
            const user = await User.findOne({ email });
            if (user) {
                console.log(`FOUND: ${email}`);
            } else {
                console.log(`MISSING: ${email}`);
            }
        }
    } catch (e) {
        console.error("ERROR");
    }
    process.exit();
};

checkUsers();
