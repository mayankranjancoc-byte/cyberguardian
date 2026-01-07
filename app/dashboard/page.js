'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [securityScore, setSecurityScore] = useState(0);

    // Simulate loading animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setSecurityScore(73);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Mock user data
    const userData = {
        name: 'Cybersecurity Learner',
        quizScore: 80,
        phishingDetections: 5,
        incidentsLearned: 3,
        codeScans: 2,
        daysActive: 1,
        badges: [
            { name: 'First Login', icon: '🎯', earned: true },
            { name: 'Quiz Master', icon: '📚', earned: false },
            { name: 'Phishing Hunter', icon: '🎣', earned: true },
            { name: 'Incident Responder', icon: '🚨', earned: true },
            { name: 'Code Guardian', icon: '💻', earned: false },
            { name: '7-Day Streak', icon: '🔥', earned: false }
        ],
        recentActivity: [
            { action: 'Completed Cyber Awareness Quiz', score: '8/10', time: '2 hours ago' },
            { action: 'Analyzed suspicious URL', result: 'High Risk Detected', time: '3 hours ago' },
            { action: 'Reviewed Phishing Incident Playbook', result: 'Completed', time: '5 hours ago' }
        ]
    };

    const scoreBreakdown = [
        { category: 'Quiz Performance', score: userData.quizScore, weight: 25, icon: '📚' },
        { category: 'Phishing Detection', score: 65, weight: 25, icon: '🎣' },
        { category: 'Incident Response', score: 70, weight: 20, icon: '🚨' },
        { category: 'Code Security', score: 60, weight: 15, icon: '💻' },
        { category: 'Active Learning', score: 85, weight: 15, icon: '🔥' }
    ];

    function getScoreLevel(score) {
        if (score >= 90) return { level: 'Expert', color: 'var(--success)', emoji: '🏆' };
        if (score >= 70) return { level: 'Advanced', color: 'var(--primary)', emoji: '⭐' };
        if (score >= 50) return { level: 'Intermediate', color: 'var(--warning)', emoji: '📈' };
        return { level: 'Beginner', color: 'var(--text-secondary)', emoji: '🌱' };
    }

    const scoreInfo = getScoreLevel(securityScore);

    return (
        <div className="container" style={{ maxWidth: '1200px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📊</div>
                <h1>Security Dashboard</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    Track your cybersecurity knowledge and progress
                </p>
            </div>

            {/* Security Score Card */}
            <div className="card" style={{
                background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, rgba(52, 168, 83, 0.1) 100%)',
                borderColor: scoreInfo.color,
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <div style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>{scoreInfo.emoji}</div>
                <h2 style={{ marginBottom: '0.5rem' }}>Your Security Score</h2>
                <div style={{
                    fontSize: '5rem',
                    fontWeight: '700',
                    color: scoreInfo.color,
                    marginBottom: '1rem'
                }}>
                    {securityScore}
                    <span style={{ fontSize: '2.5rem', opacity: 0.7 }}>/100</span>
                </div>
                <div className="badge badge-info" style={{ fontSize: '1.2rem', padding: '0.75rem 1.5rem' }}>
                    {scoreInfo.level}
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    You're in the top 30% of users! Keep learning to reach Expert status.
                </p>
            </div>

            {/* Score Breakdown */}
            <h2 style={{ marginBottom: '1.5rem' }}>Score Breakdown</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {scoreBreakdown.map((item, index) => (
                    <div key={index} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                <div>
                                    <h4 style={{ margin: 0 }}>{item.category}</h4>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {item.weight}% of total score
                                    </span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--primary)' }}>
                                    {item.score}%
                                </div>
                            </div>
                        </div>
                        <div style={{
                            height: '12px',
                            background: 'var(--border)',
                            borderRadius: '6px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                height: '100%',
                                width: `${item.score}%`,
                                background: `linear-gradient(90deg, var(--primary), var(--success))`,
                                transition: 'width 1s ease'
                            }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Achievements */}
            <h2 style={{ marginBottom: '1.5rem' }}>Achievements</h2>
            <div className="grid" style={{ marginBottom: '2rem' }}>
                {userData.badges.map((badge, index) => (
                    <div
                        key={index}
                        className="card"
                        style={{
                            textAlign: 'center',
                            opacity: badge.earned ? 1 : 0.4,
                            border: badge.earned ? '2px solid var(--success)' : '1px solid var(--border)'
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{badge.icon}</div>
                        <h4 style={{ marginBottom: '0.25rem' }}>{badge.name}</h4>
                        {badge.earned ? (
                            <span className="badge badge-low">Earned!</span>
                        ) : (
                            <span className="badge" style={{ background: 'var(--border)' }}>Locked</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <h2 style={{ marginBottom: '1.5rem' }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {userData.recentActivity.map((activity, index) => (
                    <div key={index} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h4 style={{ marginBottom: '0.25rem' }}>{activity.action}</h4>
                                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{activity.result || activity.score}</p>
                            </div>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                {activity.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recommendations */}
            <div className="card" style={{
                background: 'rgba(66, 133, 244, 0.05)',
                borderColor: 'var(--primary)'
            }}>
                <h3 style={{ marginBottom: '1rem' }}>💡 Recommendations to Improve</h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '2' }}>
                    <li>Complete more quizzes to improve your awareness score</li>
                    <li>Practice phishing detection with our training scenarios</li>
                    <li>Review incident response playbooks for different attack types</li>
                    <li>Scan more code to learn about secure coding practices</li>
                    <li>Come back daily to build a learning streak 🔥</li>
                </ul>
            </div>
        </div>
    );
}
