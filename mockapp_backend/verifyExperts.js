import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_LOCAL || process.env.MONGO_URI || 'mongodb://localhost:27017/mockdata');
        console.log('✅ MongoDB Connected to:', process.env.MONGO_URI_LOCAL || process.env.MONGO_URI || 'mongodb://localhost:27017/mockdata');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

// User Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    userType: String,
    name: String,
    createdAt: Date
});

// Expert Schema (simplified)
const expertSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    personalInformation: {
        userName: String,
        category: String
    },
    status: String
});

const User = mongoose.model('User', userSchema);
const ExpertDetails = mongoose.model('ExpertDetails', expertSchema);

// Verify Database
const verifyDatabase = async () => {
    try {
        await connectDB();

        console.log('\n📊 Checking Database...\n');

        // Count users
        const totalUsers = await User.countDocuments();
        const expertUsers = await User.countDocuments({ userType: 'expert' });

        console.log(`👥 Total Users: ${totalUsers}`);
        console.log(`🎓 Expert Users: ${expertUsers}`);

        // Count experts
        const totalExperts = await ExpertDetails.countDocuments();
        const activeExperts = await ExpertDetails.countDocuments({ status: 'Active' });

        console.log(`\n📋 Total Expert Profiles: ${totalExperts}`);
        console.log(`✅ Active Experts: ${activeExperts}`);

        // Count by category
        console.log('\n📂 Experts by Category:');
        const categories = ['IT', 'HR', 'Business', 'Design', 'Marketing', 'Finance', 'AI'];

        for (const category of categories) {
            const count = await ExpertDetails.countDocuments({ 'personalInformation.category': category });
            console.log(`   ${category}: ${count} experts`);
        }

        // List some experts
        console.log('\n👤 Sample Experts:');
        const sampleExperts = await ExpertDetails.find()
            .limit(5)
            .select('personalInformation.userName personalInformation.category status');

        sampleExperts.forEach((expert, index) => {
            console.log(`   ${index + 1}. ${expert.personalInformation.userName} (${expert.personalInformation.category}) - ${expert.status}`);
        });

        // List some users
        console.log('\n📧 Sample Expert User Emails:');
        const sampleUsers = await User.find({ userType: 'expert' })
            .limit(5)
            .select('email name');

        sampleUsers.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.email} (${user.name})`);
        });

        console.log('\n✅ Database verification complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error verifying database:', error);
        process.exit(1);
    }
};

// Run verification
verifyDatabase();
