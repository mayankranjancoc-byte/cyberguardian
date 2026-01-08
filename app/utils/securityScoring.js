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
            title: '✅ Safe to Visit',
            message: 'This site appears to be safe based on our comprehensive analysis.',
            actions: [
                'Site has a clean security record',
                'Domain has been registered for a reasonable time',
                'No community reports of suspicious activity',
                'Passed all threat intelligence checks'
            ],
            advice: 'You can proceed with normal caution. Always verify HTTPS and look for trust indicators.'
        };
    }

    if (score >= 50) {
        return {
            level: 'caution',
            title: '⚠️ Exercise Caution',
            message: 'This site has some concerning indicators. Proceed carefully.',
            actions: [
                'Avoid entering sensitive personal information',
                'Never share passwords or financial details',
                'Check URL carefully for typos or misspellings',
                'Verify you\'re on HTTPS (lock icon in browser)',
                'Read reviews and user feedback before interacting',
                'Consider using alternative, well-known sites'
            ],
            advice: 'Proceed with extreme caution. Limit what you share and avoid making purchases until you verify legitimacy.'
        };
    }

    return {
        level: 'danger',
        title: '🔴 High Risk - Avoid This Site',
        message: 'WARNING: This site shows multiple serious red flags indicating it may be malicious.',
        actions: [
            '❌ Do NOT enter any personal information',
            '❌ Do NOT make any payments or financial transactions',
            '❌ Do NOT download any files',
            '❌ Close this site immediately',
            '✅ Report this link if you received it unexpectedly',
            '✅ Scan your device if you visited this site'
        ],
        advice: 'We strongly recommend avoiding this site entirely. If you received a link to this site, it may be a phishing attempt.'
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
        name: 'VirusTotal Scan',
        score: vtScore,
        maxScore: 40,
        status: vtStatus,
        details: `${vtResult.malicious} malicious, ${vtResult.suspicious} suspicious`,
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
        name: 'DNS Reputation',
        score: dnsScore,
        maxScore: 25,
        status: dnsStatus,
        details: `${deepAnalysis.dns.reportCount} report(s)`,
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
        name: 'Domain Age',
        score: ageScore,
        maxScore: 20,
        status: ageStatus,
        details: `${deepAnalysis.domain.age.years}y ${deepAnalysis.domain.age.months}m old`,
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
        name: 'Community Reports',
        score: communityScore,
        maxScore: 15,
        status: communityStatus,
        details: `${deepAnalysis.community.totalReports} report(s)`,
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
