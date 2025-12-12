
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import mongoose from 'mongoose';
import User from './models/User.js';
import connectDB from './config/db.js';

const getIds = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    
    const expert = await User.findOne({ email: "kohsanar20@gmail.com" });
    const candidate = await User.findOne({ email: "kohsanar2011@gmail.com" });

    const output = {
        expertId: expert ? expert._id.toString() : "NOT_FOUND",
        candidateId: candidate ? candidate._id.toString() : "NOT_FOUND"
    };
    
    fs.writeFileSync('ids.json', JSON.stringify(output, null, 2));
    console.log("IDs written to ids.json");

    process.exit();
};

getIds();
