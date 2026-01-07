# 🛡️ CyberGuardian AI

**Your All-in-One AI-Powered Cybersecurity Companion**

Making enterprise-grade cybersecurity accessible to everyone—from everyday users to security professionals.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=vercel)](https://cyberguardian-ai.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js) ![AI](https://img.shields.io/badge/AI-Gemini-blue?style=flat) ![Security](https://img.shields.io/badge/Security-VirusTotal-red?style=flat) ![License](https://img.shields.io/badge/License-Educational-green?style=flat)

## 🌐 Live Demo

**Try it now:** [https://cyberguardian-ai.vercel.app](https://cyberguardian-ai.vercel.app)

---

## 🎯 Overview

CyberGuardian AI is a comprehensive cybersecurity platform that combines artificial intelligence with real-time threat intelligence to protect users from digital threats. The platform offers multiple security modules designed to educate, detect, and respond to cybersecurity incidents.

---

## ✨ Key Features

### Core Security Modules

🎣 **Phishing Detection**
- Real-time URL analysis with AI-powered pattern recognition
- Integration with VirusTotal's 70+ security vendors
- Risk scoring and detailed threat explanations
- Actionable security recommendations

📚 **Cyber Awareness Training**
- Interactive quiz with 10+ cybersecurity questions
- Instant feedback and detailed explanations
- Score tracking and achievement badges
- Gamified learning experience

🚨 **Incident Response**
- Step-by-step playbooks for common security incidents
- Coverage for phishing, ransomware, data breaches, and more
- Progress tracking with checklists
- Expert-curated response procedures

💻 **Code Security Scanner**
- Detects SQL injection, XSS, and other vulnerabilities
- Identifies hardcoded secrets and credentials
- Provides fix recommendations
- Supports multiple programming languages

### Enhanced Features

💬 **AI Security Assistant**
- Conversational chatbot powered by Gemini AI
- Ask questions about cybersecurity best practices
- Context-aware responses
- 24/7 availability

🌍 **Community Threat Feed**
- Real-time threat intelligence from community reports
- Filter by threat type (phishing, malware, scam)
- Sort by recency or report volume
- Trending threats highlighted

📊 **Security Dashboard**
- Personal security score (0-100)
- Detailed breakdown by category
- Achievement tracking
- Activity history

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- API keys (Gemini AI and VirusTotal)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mayankranjancoc-byte/cyberguardian.git
   cd cyberguardian
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
   ```
   
   **Getting API Keys:**
   - Gemini AI: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - VirusTotal: [https://www.virustotal.com/gui/my-apikey](https://www.virustotal.com/gui/my-apikey)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
cyberguardian/
├── app/
│   ├── page.js                    # Landing page
│   ├── layout.js                  # Root layout with navigation
│   ├── globals.css                # Design system & styles
│   ├── chat/page.js               # AI chatbot
│   ├── awareness/page.js          # Quiz module
│   ├── phishing/page.js           # Phishing detection
│   ├── incident/page.js           # Incident response
│   ├── code-security/page.js      # Code scanner
│   ├── community/page.js          # Community feed
│   ├── dashboard/page.js          # Security dashboard
│   └── api/
│       ├── chat/route.js          # Gemini AI integration
│       └── analyze-url/route.js   # VirusTotal integration
├── data/
│   ├── quiz-questions.json        # Quiz database
│   ├── incident-playbooks.json    # Response guides
│   ├── community-threats.json     # Threat database
│   └── phishing-patterns.json     # Detection patterns
├── .env.local                     # Environment variables (create this)
├── package.json                   # Dependencies
└── README.md                      # Documentation
```

---

## 🛠️ Technology Stack

- **Frontend Framework:** Next.js 14 (React)
- **Styling:** Vanilla CSS with custom design system
- **Backend:** Next.js API Routes (Serverless)
- **AI/APIs:**
  - Google Gemini AI for conversational intelligence
  - VirusTotal API for threat intelligence
- **Deployment:** Vercel-ready

---

## 🎯 Feature Status

| Feature | Status | Description |
|---------|--------|-------------|
| Phishing URL Analyzer | ✅ Complete | Real-time analysis with VirusTotal |
| AI Chatbot | ✅ Complete | Gemini-powered security assistant |
| Quiz System | ✅ Complete | 10 questions with scoring |
| Incident Response | ✅ Complete | 4 detailed playbooks |
| Code Scanner | ✅ Complete | 6 vulnerability types |
| Community Feed | ✅ Complete | 10+ threats with filtering |
| Security Dashboard | ✅ Complete | Score tracking & achievements |

**Overall: 100% functional** - All features fully implemented and tested

---

## 🏆 Innovation Highlights

1. **Real Threat Intelligence** - Live integration with VirusTotal's 70+ security scanners
2. **AI-Powered Assistance** - Intelligent chatbot using Google's Gemini AI
3. **Community-Driven Security** - Real-time threat feed from user reports
4. **Gamification** - Achievement badges and security scoring
5. **Explainable Security** - Clear explanations of why threats are flagged
6. **Comprehensive Coverage** - 7 interconnected security modules
7. **Professional UX** - Modern, responsive, and accessible design

---

## 🚢 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel login
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `VIRUSTOTAL_API_KEY`

Your application will be live at `your-project.vercel.app`

---

## 📖 Usage Guide

### Phishing Detection
1. Navigate to the Phishing Detection page
2. Enter a suspicious URL
3. Click "Analyze URL"
4. Review the risk score and detailed analysis

### AI Chatbot
1. Open the Chat page
2. Ask cybersecurity-related questions
3. Receive instant, context-aware responses
4. View conversation history

### Security Quiz
1. Go to Cyber Awareness
2. Answer 10 cybersecurity questions
3. Review explanations for each answer
4. See your final score and earned badges

### Incident Response
1. Navigate to Incident Response
2. Select your incident type
3. Follow the step-by-step checklist
4. Track your progress

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! We appreciate your help in making CyberGuardian AI better.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is created for educational purposes and cybersecurity awareness.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For intelligent conversational capabilities
- **VirusTotal** - For comprehensive threat intelligence
- **Next.js Team** - For the amazing framework
- **The Open Source Community** - For continuous inspiration and support

---

## 📧 Contact

For questions, feedback, or collaboration opportunities:

- GitHub: [@mayankranjancoc-byte](https://github.com/mayankranjancoc-byte)
- Repository: [cyberguardian](https://github.com/mayankranjancoc-byte/cyberguardian)

---

**Built with ❤️ for a Safer Internet**

*Making the internet safer, one user at a time* 🛡️
