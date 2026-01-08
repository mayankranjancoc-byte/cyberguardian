// Security scoring utilities for enhanced phishing detection
// Calculates comprehensive safety scores based on multiple factors

/**
 * Calculate overall safety score (0-100) based on verification results
 */
export function calculateSafetyScore(vtResult, deepAnalysis) {
    let score = 0;

    // Factor 1: VirusTotal (40 points max)
    if (vtResult.malicious === 0 && vtResult.suspicious === 0) {
        score += 40;
    } else if (vtResult.malicious === 0 && vtResult.suspicious > 0) {
        score += 20;
    }
    // If malicious > 0, score stays 0 for this factor

    // Factor 2: DNS Reputation (25 points max)
    if (deepAnalysis.dns.reputation === 'clean') {
        score += 25;
    } else if (deepAnalysis.dns.reputation === 'suspicious' && deepAnalysis.dns.reportCount < 5) {
        score += 15;
    } else if (deepAnalysis.dns.reputation === 'suspicious') {
        score += 5;
    }
    // If flagged, score stays 0 for this factor

    // Factor 3: Domain Age (20 points max)
    const ageInMonths = (deepAnalysis.domain.age.years * 12) + deepAnalysis.domain.age.months;
    if (ageInMonths > 12) {
        score += 20;
    } else if (ageInMonths >= 3) {
        score += 15;
    } else if (ageInMonths >= 1) {
        score += 10;
    } else {
        score += 5;
    }

    // Factor 4: Community Reports (15 points max)
    if (deepAnalysis.community.totalReports === 0) {
        score += 15;
    } else if (deepAnalysis.community.totalReports < 5) {
        score += 10;
    } else if (deepAnalysis.community.totalReports < 15) {
        score += 5;
    }
    // If >= 15 reports, score stays 0 for this factor

    return Math.min(100, Math.max(0, score));
}

/**
 * Generate contextual recommendations based on safety score
 */
export function generateRecommendation(score, vtResult, deepAnalysis) {
    if (score >= 80) {
        return {
            level: 'safe',
            title: '✅ This Link Looks Safe',
            message: 'Based on our checks, this website appears to be legitimate and safe to visit.',
            actions: [
                'No security warnings found',
                'Website has been around for a while (not brand new)',
                'No one has reported this as a scam',
                'Passed all our safety checks'
            ],
            advice: 'You can visit this link, but still double-check the website address and look for the lock icon 🔒 in your browser.'
        };
    }

    if (score >= 50) {
        return {
            level: 'caution',
            title: '⚠️ Be Careful With This Link',
            message: 'This website has some warning signs. If you visit, be very careful.',
            actions: [
                'Don\'t enter personal info like your name, address, or phone number',
                'Never type in passwords or credit card numbers',
                'Check the web address carefully - look for spelling mistakes',
                'Make sure the website shows a lock icon 🔒 in your browser',
                'Search online to see what others say about this website',
                'If possible, use a well-known website instead'
            ],
            advice: 'Think twice before visiting. Don\'t buy anything or share personal information until you\'re 100% sure it\'s real.'
        };
    }

    return {
        level: 'danger',
        title: '🔴 DANGER - This Link Is NOT Safe!',
        message: 'WARNING: This website is very likely a SCAM or FAKE. Do not click or visit!',
        actions: [
            '❌ DO NOT enter your name, email, phone, or address',
            '❌ DO NOT pay for anything or enter credit card numbers',
            '❌ DO NOT download anything from this website',
            '❌ Close this right now and don\'t visit',
            '✅ If someone sent you this link, report it as spam',
            '✅ If you already visited, run a virus scan on your device'
        ],
        advice: 'Stay away from this website completely. Someone may be trying to steal your money or personal information.'
    };
}

/**
 * Get breakdown of score contributors for display
 */
export function getScoreBreakdown(vtResult, deepAnalysis) {
    const breakdown = [];

    // VirusTotal breakdown
    let vtScore = 0;
    let vtStatus = '';
    if (vtResult.malicious === 0 && vtResult.suspicious === 0) {
        vtScore = 40;
        vtStatus = 'Clean';
    } else if (vtResult.malicious === 0) {
        vtScore = 20;
        vtStatus = 'Suspicious';
    } else {
        vtScore = 0;
        vtStatus = 'Malicious';
    }
    breakdown.push({
        name: 'Security Scan',
        score: vtScore,
        maxScore: 40,
        status: vtStatus,
        details: `${vtResult.malicious} found it dangerous, ${vtResult.suspicious} found it suspicious`,
        icon: '🛡️'
    });

    // DNS Reputation breakdown
    let dnsScore = 0;
    let dnsStatus = '';
    if (deepAnalysis.dns.reputation === 'clean') {
        dnsScore = 25;
        dnsStatus = 'Clean';
    } else if (deepAnalysis.dns.reputation === 'suspicious' && deepAnalysis.dns.reportCount < 5) {
        dnsScore = 15;
        dnsStatus = 'Some Reports';
    } else if (deepAnalysis.dns.reputation === 'suspicious') {
        dnsScore = 5;
        dnsStatus = 'Multiple Reports';
    } else {
        dnsScore = 0;
        dnsStatus = 'Flagged';
    }
    breakdown.push({
        name: 'Website Reputation',
        score: dnsScore,
        maxScore: 25,
        status: dnsStatus,
        details: `${deepAnalysis.dns.reportCount} warning(s) from others`,
        icon: '🌐'
    });

    // Domain Age breakdown
    const ageInMonths = (deepAnalysis.domain.age.years * 12) + deepAnalysis.domain.age.months;
    let ageScore = 0;
    let ageStatus = '';
    if (ageInMonths > 12) {
        ageScore = 20;
        ageStatus = 'Established';
    } else if (ageInMonths >= 3) {
        ageScore = 15;
        ageStatus = 'Moderate';
    } else if (ageInMonths >= 1) {
        ageScore = 10;
        ageStatus = 'Recent';
    } else {
        ageScore = 5;
        ageStatus = 'Very New';
    }
    breakdown.push({
        name: 'Website Age',
        score: ageScore,
        maxScore: 20,
        status: ageStatus,
        details: `${deepAnalysis.domain.age.years} years ${deepAnalysis.domain.age.months} months old`,
        icon: '📅'
    });

    // Community Reports breakdown
    let communityScore = 0;
    let communityStatus = '';
    if (deepAnalysis.community.totalReports === 0) {
        communityScore = 15;
        communityStatus = 'No Reports';
    } else if (deepAnalysis.community.totalReports < 5) {
        communityScore = 10;
        communityStatus = 'Few Reports';
    } else if (deepAnalysis.community.totalReports < 15) {
        communityScore = 5;
        communityStatus = 'Some Reports';
    } else {
        communityScore = 0;
        communityStatus = 'Many Reports';
    }
    breakdown.push({
        name: 'User Reports',
        score: communityScore,
        maxScore: 15,
        status: communityStatus,
        details: `${deepAnalysis.community.totalReports} people flagged this`,
        icon: '👥'
    });

    return breakdown;
}

/**
 * Get color for safety level
 */
export function getSafetyColor(score) {
    if (score >= 80) return '#34a853'; // green
    if (score >= 50) return '#fbbc04'; // yellow
    return '#ea4335'; // red
}

/**
 * Get level name from score
 */
export function getSafetyLevel(score) {
    if (score >= 80) return 'safe';
    if (score >= 50) return 'caution';
    return 'danger';
}
