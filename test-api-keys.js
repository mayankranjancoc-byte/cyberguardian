// API Key Testing Script for CyberGuardian AI
// Run with: node test-api-keys.js

const GEMINI_API_KEY = 'AIzaSyBoIiLJVEe9qaqnuAN9wqNkWqXNLQrxfLM';
const VIRUSTOTAL_API_KEY = '6ed4fd9bf93f47113bf641e84a8fa28ff6acdb9f1667c7be9f95b6c2a5e4b789';

console.log('🔍 Testing CyberGuardian AI - API Keys\n');
console.log('='.repeat(50));

// Test 1: Gemini AI
async function testGeminiAI() {
    console.log('\n📡 Test 1: Gemini AI API');
    console.log('-'.repeat(50));

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: 'Hello, respond with just "API Working"' }]
                    }]
                })
            }
        );

        const data = await response.json();

        if (response.ok && data.candidates) {
            console.log('✅ Status: WORKING');
            console.log(`📊 Response Code: ${response.status}`);
            console.log(`💬 Test Response: ${data.candidates[0]?.content?.parts[0]?.text || 'Received'}`);
            return true;
        } else {
            console.log('❌ Status: FAILED');
            console.log(`📊 Response Code: ${response.status}`);
            console.log(`⚠️  Error: ${data.error?.message || 'Unknown error'}`);
            return false;
        }
    } catch (error) {
        console.log('❌ Status: ERROR');
        console.log(`⚠️  Error: ${error.message}`);
        return false;
    }
}

// Test 2: VirusTotal
async function testVirusTotal() {
    console.log('\n📡 Test 2: VirusTotal API');
    console.log('-'.repeat(50));

    try {
        const response = await fetch(
            'https://www.virustotal.com/api/v3/domains/google.com',
            {
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                }
            }
        );

        const data = await response.json();

        if (response.ok && data.data) {
            console.log('✅ Status: WORKING');
            console.log(`📊 Response Code: ${response.status}`);
            console.log(`🔍 Test Domain: google.com`);
            console.log(`📈 Reputation Score: ${data.data.attributes?.reputation || 'N/A'}`);
            return true;
        } else {
            console.log('❌ Status: FAILED');
            console.log(`📊 Response Code: ${response.status}`);
            console.log(`⚠️  Error: ${data.error?.message || 'Unknown error'}`);

            if (response.status === 429) {
                console.log('💡 Note: Rate limit reached (4 requests/min)');
            }
            return false;
        }
    } catch (error) {
        console.log('❌ Status: ERROR');
        console.log(`⚠️  Error: ${error.message}`);
        return false;
    }
}

// Run all tests
async function runTests() {
    console.log('\n🚀 Starting API Tests...\n');

    const geminiResult = await testGeminiAI();
    const virusTotalResult = await testVirusTotal();

    console.log('\n' + '='.repeat(50));
    console.log('📊 FINAL RESULTS');
    console.log('='.repeat(50));

    console.log(`\n1. Gemini AI:     ${geminiResult ? '✅ WORKING' : '❌ NOT WORKING'}`);
    console.log(`2. VirusTotal:    ${virusTotalResult ? '✅ WORKING' : '❌ NOT WORKING'}`);

    console.log('\n' + '='.repeat(50));
    console.log('💡 RECOMMENDATIONS');
    console.log('='.repeat(50));

    if (geminiResult && virusTotalResult) {
        console.log('\n🎉 EXCELLENT! Both APIs are working perfectly!');
        console.log('✅ Your app has full AI capabilities');
        console.log('✅ Real-time threat intelligence enabled');
    } else if (!geminiResult && !virusTotalResult) {
        console.log('\n⚠️  Both APIs need attention');
        console.log('✅ BUT: App still works with fallbacks!');
        console.log('- Chatbot has smart fallback responses');
        console.log('- Phishing uses pattern matching');
    } else {
        console.log('\n⚠️  Partial functionality');
        if (!geminiResult) {
            console.log('❌ Gemini AI: Get new key at https://makersuite.google.com/app/apikey');
            console.log('✅ Chatbot fallbacks still work');
        }
        if (!virusTotalResult) {
            console.log('❌ VirusTotal: Check key at https://www.virustotal.com/gui/my-apikey');
            console.log('✅ Pattern matching still works');
        }
    }

    console.log('\n✨ App is DEMO-READY regardless of API status!\n');
}

// Execute tests
runTests().catch(console.error);
