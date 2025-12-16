import mongoose from 'mongoose';
import { config } from 'dotenv';
import fs from 'fs';

config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://saran:saran2003@cluster0.o8q3c.mongodb.net/mockapp?retryWrites=true&w=majority";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['expert', 'candidate'], default: 'candidate' },
  name: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
const Expert = mongoose.model('Expert', userSchema); // Assuming experts might be in a different collection or same? actually check_users_v2 used User for both usually, but let's check. 
// Actually, earlier scripts just checked 'User'.

const emails = [
    "balasudhan17@gmail.com",
    "codetalk24x7@gmail.com"
];

async function getIds() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");

        const results = {};
        
        for (const email of emails) {
            const user = await User.findOne({ email });
            if (user) {
                results[email] = { id: user._id.toString(), role: user.role };
                console.log(`Found ${email}: ${user._id} (${user.role})`);
            } else {
                console.log(`MISSING: ${email}`);
            }
        }
        
        fs.writeFileSync('new_ids.json', JSON.stringify(results, null, 2));
        
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

getIds();
