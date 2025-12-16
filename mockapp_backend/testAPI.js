import axios from 'axios';

const testAPI = async () => {
    try {
        console.log('🔍 Testing Expert API...\n');

        // Test 1: Get all verified experts
        console.log('1️⃣ Fetching verified experts from API...');
        const response = await axios.get('http://localhost:3000/api/expert/verified');

        if (response.data.success) {
            const experts = response.data.data;
            console.log(`✅ Found ${experts.length} verified experts\n`);

            // Group by category
            const byCategory = {};
            experts.forEach(expert => {
                const category = expert.personalInformation?.category || 'Unknown';
                if (!byCategory[category]) byCategory[category] = [];
                byCategory[category].push(expert);
            });

            console.log('📊 Experts by Category:');
            Object.keys(byCategory).sort().forEach(category => {
                console.log(`   ${category}: ${byCategory[category].length} experts`);
            });

            console.log('\n👤 Sample Experts:');
            experts.slice(0, 5).forEach((expert, index) => {
                console.log(`   ${index + 1}. ${expert.personalInformation?.userName} (${expert.personalInformation?.category})`);
                console.log(`      Status: ${expert.status}`);
                console.log(`      Company: ${expert.professionalDetails?.company}`);
            });

        } else {
            console.log('❌ API returned success: false');
            console.log('Response:', response.data);
        }

    } catch (error) {
        console.error('❌ Error testing API:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
};

testAPI();
