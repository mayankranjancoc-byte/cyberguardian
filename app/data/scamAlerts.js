// Mock data for local scam alerts
// India-specific scam scenarios with realistic details

export const scamAlerts = [
    {
        id: 1,
        location: "Delhi NCR",
        title: "Fake Courier Delivery Messages",
        emoji: "📦",
        description: "Many people nearby are receiving SMS about undelivered parcels from courier companies asking them to click a link.",
        howTrapped: [
            "SMS looks official with courier company logos and tracking numbers",
            "Creates urgency: 'Parcel will be returned in 24 hours'",
            "Link asks for personal details or small 'redelivery fee'",
            "Some links install malware on your phone"
        ],
        howAvoid: [
            "Check tracking on the official courier app or website directly",
            "Never click links in unexpected SMS messages",
            "Real courier companies don't ask for payment via SMS",
            "If unsure, call the courier helpline directly"
        ],
        reportedCount: 47,
        timeAgo: "2 hours ago",
        severity: "high"
    },
    {
        id: 2,
        location: "Mumbai",
        title: "Fake Bank Security Calls",
        emoji: "📞",
        description: "Residents are reporting calls from people claiming to be from their bank's security department asking to verify KYC details.",
        howTrapped: [
            "Caller ID shows a number similar to your bank's helpline",
            "They know your name and partial account details",
            "Say your account will be blocked if you don't share OTP",
            "Sound professional and use banking terminology"
        ],
        howAvoid: [
            "Banks never call asking for OTP, PIN, or CVV",
            "Hang up and call your bank's official number yourself",
            "Never share OTP with anyone, even if they claim to be from bank",
            "Enable SMS/email alerts for all transactions"
        ],
        reportedCount: 31,
        timeAgo: "5 hours ago",
        severity: "high"
    },
    {
        id: 3,
        location: "Bangalore",
        title: "UPI Fake Payment Links",
        emoji: "💳",
        description: "People selling items online are receiving payment links that actually request money instead of collecting it.",
        howTrapped: [
            "Buyer sends a UPI link claiming it's for payment",
            "Link actually requests money from the seller",
            "In rush to complete sale, sellers don't notice the direction",
            "Money gets debited instead of credited"
        ],
        howAvoid: [
            "Always check if link is 'Collect' or 'Pay' before accepting",
            "For selling items, only accept direct UPI transfers",
            "Never click payment links from buyers",
            "Use trusted platforms with buyer protection"
        ],
        reportedCount: 23,
        timeAgo: "1 day ago",
        severity: "medium"
    },
    {
        id: 4,
        location: "Pune",
        title: "Fake Job Offer Emails",
        emoji: "💼",
        description: "Job seekers are getting emails from companies offering work-from-home positions that ask for registration fees.",
        howTrapped: [
            "Email looks professional with company logo and letterhead",
            "Offers high salary for simple data entry work",
            "Asks for small 'registration fee' or 'training materials cost'",
            "Once paid, they disappear or keep asking for more money"
        ],
        howAvoid: [
            "Legitimate companies never ask candidates to pay",
            "Verify company on official job portals like Naukri, LinkedIn",
            "Google the company name + 'scam' to check reviews",
            "Be suspicious of too-good-to-be-true salary offers"
        ],
        reportedCount: 18,
        timeAgo: "2 days ago",
        severity: "medium"
    },
    {
        id: 5,
        location: "Hyderabad",
        title: "WhatsApp OTP Scam",
        emoji: "💬",
        description: "Folks are getting WhatsApp messages from friends asking to share the OTP code they're about to receive.",
        howTrapped: [
            "Message comes from a friend's WhatsApp number (already hacked)",
            "Friend says they accidentally sent OTP to your number",
            "You receive an actual OTP from WhatsApp",
            "Sharing the OTP gives scammers access to your WhatsApp"
        ],
        howAvoid: [
            "Never share OTP codes with anyone, even friends",
            "Call your friend directly to verify (not on WhatsApp)",
            "WhatsApp OTPs are only for setting up WhatsApp on a new device",
            "Enable two-step verification in WhatsApp settings"
        ],
        reportedCount: 29,
        timeAgo: "8 hours ago",
        severity: "high"
    },
    {
        id: 6,
        location: "Chennai",
        title: "Electricity Bill Disconnection SMS",
        emoji: "⚡",
        description: "Many residents received messages about electricity disconnection due to unpaid bills with a payment link attached.",
        howTrapped: [
            "SMS creates panic about immediate power cut",
            "Link looks like it's from electricity board website",
            "Asks for bill payment through the link",
            "Fake payment gateway steals card/UPI details"
        ],
        howAvoid: [
            "Check your bill on the official electricity board app/website",
            "Electricity boards send physical disconnection notices first",
            "Pay only through official apps or authorized counters",
            "Most boards send advance notice, not sudden SMS threats"
        ],
        reportedCount: 15,
        timeAgo: "1 day ago",
        severity: "low"
    },
    {
        id: 7,
        location: "Kolkata",
        title: "Fake Investment Schemes on Social Media",
        emoji: "📈",
        description: "Social media groups are promoting investment plans promising guaranteed returns of 50-100% in short periods.",
        howTrapped: [
            "Testimonials with screenshots of big returns",
            "Claims of using 'insider trading' or 'AI algorithms'",
            "Small initial investments show returns to build trust",
            "Large investments disappear when you try to withdraw"
        ],
        howAvoid: [
            "No legitimate investment guarantees such high returns",
            "Check if company is registered with SEBI (for stocks/mutual funds)",
            "If it sounds too good to be true, it probably is",
            "Consult a certified financial advisor before investing"
        ],
        reportedCount: 12,
        timeAgo: "3 days ago",
        severity: "medium"
    }
];

// Helper function to get alerts by severity
export function getAlertsBySeverity(severity) {
    if (severity === 'all') return scamAlerts;
    return scamAlerts.filter(alert => alert.severity === severity);
}

// Helper function to get recent alerts
export function getRecentAlerts(count = 5) {
    return scamAlerts.slice(0, count);
}
