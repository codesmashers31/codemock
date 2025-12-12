/**
 * Migration Script: Add Pricing and Metrics to Existing Experts
 * Run this once to update all existing expert profiles
 */

import mongoose from "mongoose";
import ExpertDetails from "./models/expertModel.js";
import { calculateSuggestedPricing } from "./utils/pricing.js";

async function migratePricingAndMetrics() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/mockinterview";
        await mongoose.connect(mongoUri);
        console.log("✅ Connected to MongoDB\n");

        // Get all experts
        const experts = await ExpertDetails.find({});
        console.log(`📊 Found ${experts.length} experts to migrate\n`);

        let updated = 0;
        let skipped = 0;

        for (const expert of experts) {
            try {
                // Check if already has pricing
                if (expert.pricing && expert.pricing.hourlyRate && expert.pricing.hourlyRate !== 500) {
                    console.log(`⏭️  Skipping ${expert.personalInformation?.userName} - already has custom pricing`);
                    skipped++;
                    continue;
                }

                // Calculate suggested pricing
                const suggestedRate = calculateSuggestedPricing(expert);

                // Update pricing
                expert.pricing = {
                    hourlyRate: suggestedRate,
                    currency: "INR",
                    customPricing: false
                };

                // Initialize metrics if not exists
                if (!expert.metrics) {
                    expert.metrics = {
                        totalSessions: 0,
                        completedSessions: 0,
                        cancelledSessions: 0,
                        avgRating: 0,
                        totalReviews: 0,
                        avgResponseTime: 0
                    };
                }

                await expert.save();

                console.log(`✅ Updated ${expert.personalInformation?.userName}`);
                console.log(`   Category: ${expert.personalInformation?.category}`);
                console.log(`   Hourly Rate: ₹${suggestedRate}/hr`);
                console.log(`   Experience: ${expert.professionalDetails?.totalExperience || 0} years\n`);

                updated++;
            } catch (err) {
                console.error(`❌ Error updating expert ${expert._id}:`, err.message);
            }
        }

        console.log("\n" + "=".repeat(50));
        console.log("📊 Migration Summary:");
        console.log(`   Total Experts: ${experts.length}`);
        console.log(`   Updated: ${updated}`);
        console.log(`   Skipped: ${skipped}`);
        console.log("=".repeat(50));
        console.log("\n✅ Migration completed successfully!");

    } catch (error) {
        console.error("❌ Migration error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\n👋 Database connection closed");
    }
}

// Run the migration
migratePricingAndMetrics();
