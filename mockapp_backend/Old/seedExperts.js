// Seed script to add sample expert data
import mongoose from "mongoose";
import ExpertDetails from "./models/expertModel.js";

const sampleExperts = [
    {
        userId: new mongoose.Types.ObjectId(),
        profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
        personalInformation: {
            userName: "Rajesh Kumar",
            mobile: "9876543210",
            gender: "Male",
            dob: new Date("1990-05-15"),
            country: "India",
            state: "Karnataka",
            city: "Bangalore",
            category: "IT"
        },
        education: [
            {
                degree: "B.Tech",
                institution: "IIT Bombay",
                field: "Computer Science",
                start: 2008,
                end: 2012
            }
        ],
        professionalDetails: {
            title: "Senior Software Engineer",
            company: "Google",
            totalExperience: 10,
            industry: "Technology",
            previous: [
                {
                    company: "Microsoft",
                    title: "Software Engineer",
                    start: 2012,
                    end: 2015
                },
                {
                    company: "Google",
                    title: "Senior Software Engineer",
                    start: 2015,
                    end: 2023
                }
            ]
        },
        skillsAndExpertise: {
            mode: "Online",
            domains: ["full-stack-development", "system-design", "cloud-architecture"],
            tools: ["react", "node-js", "aws", "docker"],
            languages: ["english", "hindi", "kannada"]
        },
        availability: {
            sessionDuration: 45,
            maxPerDay: 2,
            weekly: {},
            breakDates: []
        },
        verification: {
            linkedin: "https://linkedin.com/in/rajeshkumar"
        },
        status: "Active"
    },
    {
        userId: new mongoose.Types.ObjectId(),
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
        personalInformation: {
            userName: "Priya Sharma",
            mobile: "9876543211",
            gender: "Female",
            dob: new Date("1992-08-20"),
            country: "India",
            state: "Maharashtra",
            city: "Mumbai",
            category: "HR"
        },
        education: [
            {
                degree: "MBA",
                institution: "IIM Ahmedabad",
                field: "Human Resources",
                start: 2014,
                end: 2016
            }
        ],
        professionalDetails: {
            title: "HR Manager",
            company: "Amazon",
            totalExperience: 8,
            industry: "E-commerce",
            previous: [
                {
                    company: "Flipkart",
                    title: "HR Executive",
                    start: 2016,
                    end: 2019
                },
                {
                    company: "Amazon",
                    title: "HR Manager",
                    start: 2019,
                    end: 2024
                }
            ]
        },
        skillsAndExpertise: {
            mode: "Hybrid",
            domains: ["talent-acquisition", "employee-engagement", "performance-management"],
            tools: ["workday", "bamboohr", "linkedin-recruiter"],
            languages: ["english", "hindi", "marathi"]
        },
        availability: {
            sessionDuration: 30,
            maxPerDay: 3,
            weekly: {},
            breakDates: []
        },
        verification: {
            linkedin: "https://linkedin.com/in/priyasharma"
        },
        status: "Active"
    },
    {
        userId: new mongoose.Types.ObjectId(),
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
        personalInformation: {
            userName: "Amit Patel",
            mobile: "9876543212",
            gender: "Male",
            dob: new Date("1988-03-10"),
            country: "India",
            state: "Gujarat",
            city: "Ahmedabad",
            category: "Business"
        },
        education: [
            {
                degree: "MBA",
                institution: "ISB Hyderabad",
                field: "Business Strategy",
                start: 2010,
                end: 2012
            }
        ],
        professionalDetails: {
            title: "Business Consultant",
            company: "McKinsey & Company",
            totalExperience: 12,
            industry: "Consulting",
            previous: [
                {
                    company: "Deloitte",
                    title: "Business Analyst",
                    start: 2012,
                    end: 2016
                },
                {
                    company: "McKinsey & Company",
                    title: "Business Consultant",
                    start: 2016,
                    end: 2024
                }
            ]
        },
        skillsAndExpertise: {
            mode: "Online",
            domains: ["business-strategy", "market-analysis", "financial-planning"],
            tools: ["excel", "tableau", "powerbi"],
            languages: ["english", "hindi", "gujarati"]
        },
        availability: {
            sessionDuration: 60,
            maxPerDay: 1,
            weekly: {},
            breakDates: []
        },
        verification: {
            linkedin: "https://linkedin.com/in/amitpatel"
        },
        status: "Active"
    },
    {
        userId: new mongoose.Types.ObjectId(),
        profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
        personalInformation: {
            userName: "Sneha Reddy",
            mobile: "9876543213",
            gender: "Female",
            dob: new Date("1994-11-25"),
            country: "India",
            state: "Telangana",
            city: "Hyderabad",
            category: "Design"
        },
        education: [
            {
                degree: "B.Des",
                institution: "NID Ahmedabad",
                field: "Product Design",
                start: 2012,
                end: 2016
            }
        ],
        professionalDetails: {
            title: "UX/UI Designer",
            company: "Adobe",
            totalExperience: 6,
            industry: "Software",
            previous: [
                {
                    company: "Zomato",
                    title: "UI Designer",
                    start: 2016,
                    end: 2019
                },
                {
                    company: "Adobe",
                    title: "UX/UI Designer",
                    start: 2019,
                    end: 2024
                }
            ]
        },
        skillsAndExpertise: {
            mode: "Online",
            domains: ["ui-design", "ux-research", "interaction-design"],
            tools: ["figma", "sketch", "adobe-xd", "photoshop"],
            languages: ["english", "telugu", "hindi"]
        },
        availability: {
            sessionDuration: 45,
            maxPerDay: 2,
            weekly: {},
            breakDates: []
        },
        verification: {
            linkedin: "https://linkedin.com/in/snehareddy"
        },
        status: "Active"
    },
    {
        userId: new mongoose.Types.ObjectId(),
        profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
        personalInformation: {
            userName: "Vikram Singh",
            mobile: "9876543214",
            gender: "Male",
            dob: new Date("1991-07-18"),
            country: "India",
            state: "Delhi",
            city: "New Delhi",
            category: "Marketing"
        },
        education: [
            {
                degree: "MBA",
                institution: "FMS Delhi",
                field: "Marketing",
                start: 2013,
                end: 2015
            }
        ],
        professionalDetails: {
            title: "Digital Marketing Manager",
            company: "Unilever",
            totalExperience: 9,
            industry: "FMCG",
            previous: [
                {
                    company: "P&G",
                    title: "Marketing Executive",
                    start: 2015,
                    end: 2018
                },
                {
                    company: "Unilever",
                    title: "Digital Marketing Manager",
                    start: 2018,
                    end: 2024
                }
            ]
        },
        skillsAndExpertise: {
            mode: "Hybrid",
            domains: ["digital-marketing", "brand-management", "social-media"],
            tools: ["google-analytics", "hubspot", "semrush"],
            languages: ["english", "hindi", "punjabi"]
        },
        availability: {
            sessionDuration: 30,
            maxPerDay: 2,
            weekly: {},
            breakDates: []
        },
        verification: {
            linkedin: "https://linkedin.com/in/vikramsingh"
        },
        status: "Active"
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/mockinterview";
        await mongoose.connect(mongoUri);
        console.log("✅ Connected to MongoDB");

        // Clear existing data (optional - comment out if you want to keep existing data)
        // await ExpertDetails.deleteMany({});
        // console.log("🗑️  Cleared existing expert data");

        // Insert sample data
        const result = await ExpertDetails.insertMany(sampleExperts);
        console.log(`✅ Successfully inserted ${result.length} sample experts`);

        // Display inserted experts
        result.forEach((expert, index) => {
            console.log(`\n${index + 1}. ${expert.personalInformation.userName}`);
            console.log(`   Category: ${expert.personalInformation.category}`);
            console.log(`   Title: ${expert.professionalDetails.title}`);
            console.log(`   Company: ${expert.professionalDetails.company}`);
            console.log(`   Location: ${expert.personalInformation.city}, ${expert.personalInformation.state}`);
        });

        console.log("\n✅ Database seeding completed successfully!");

    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\n👋 Database connection closed");
    }
}

// Run the seeder
seedDatabase();
