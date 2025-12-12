
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from './models/User.js';
import connectDB from './config/db.js';

const checkUsers = async () => {
    try {
        await connectDB();
        console.log("DB Connected");
        
        const emailsToCheck = [
            "kosanar20@gmail.com", 
            "kosana2011@gmail.com",
            "kohsanar20@gmail.com", 
            "kohsanar2011@gmail.com"
        ];

        console.log("--- Checking Users ---");
        for (const email of emailsToCheck) {
            const user = await User.findOne({ email });
            console.log(`Email: '${email}'`);
            console.log(`Found: ${!!user}`);
            if (user) console.log(`ID: ${user._id}`);
            console.log("----------------------");
        }
    } catch (e) {
        console.error(e);
    }
    process.exit();
};

checkUsers();
