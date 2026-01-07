'use client';
import { useState, useEffect } from 'react';

export default function CommunityFeed() {
    const [threats, setThreats] = useState([]);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('reports');
    const [loading, setLoading] = useState(true);

    // Load threat data with fallback
    useEffect(() => {
        // Fallback data
        const fallbackThreats = [
            { id: 1, type: 'phishing', severity: 'high', title: 'Fake Amazon Prime Renewal', description: 'Scam emails claiming Prime membership expired with malicious payment links', url: 'amaz0n-renew-prime.tk', reports: 847, timestamp: '2026-01-05T10:30:00Z', trending: true },
            { id: 2, type: 'smishing', severity: 'critical', title: 'Bank Security Alert SMS', description: 'Text messages claiming account locked with phishing links', url: 'secure-bank-verify.ml', reports: 1203, timestamp: '2026-01-05T09:15:00Z', trending: true },
            { id: 3, type: 'malware', severity: 'critical', title: 'Fake Windows Defender', description: 'Pop-up claiming virus detected, demands payment', url: 'windows-support-fix.com', reports: 654, timestamp: '2026-01-05T08:00:00Z', trending: false },
            { id: 4, type: 'phishing', severity: 'high', title: 'PayPal Payment Failed', description: 'Emails about failed payments requiring verification', url: 'paypa1-secure.net', reports: 521, timestamp: '2026-01-04T16:45:00Z', trending: true },
            { id: 5, type: 'scam', severity: 'medium', title: 'Crypto Investment Promise', description: 'Promises 10x returns on cryptocurrency', url: 'crypto-millionaire-club.biz', reports: 389, timestamp: '2026-01-04T14:20:00Z', trending: false },
            { id: 6, type: 'phishing', severity: 'high', title: 'Microsoft 365 Expiration', description: 'Fake emails about Office subscription expiring', url: 'microsoft-renew-office.cf', reports: 712, timestamp: '2026-01-04T11:30:00Z', trending: false },
            { id: 7, type: 'smishing', severity: 'high', title: 'Package Delivery Failed', description: 'SMS claiming package delivery failed', url: 'usps-redelivery.ga', reports: 456, timestamp: '2026-01-03T18:00:00Z', trending: false },
            { id: 8, type: 'phishing', severity: 'medium', title: 'Netflix Billing Problem', description: 'Emails about billing issues', url: 'netf1ix-billing.info', reports: 298, timestamp: '2026-01-03T13:15:00Z', trending: false },
            { id: 9, type: 'scam', severity: 'high', title: 'Tech Support Scam', description: 'Pop-ups claiming computer infected', url: 'microsoft-help-center.org', reports: 567, timestamp: '2026-01-02T20:30:00Z', trending: false },
            { id: 10, type: 'phishing', severity: 'critical', title: 'IRS Tax Refund', description: 'Fake IRS emails claiming tax refund pending', url: 'irs-refund-claim.tk', reports: 923, timestamp: '2026-01-02T09:00:00Z', trending: true }
        ];

        setThreats(fallbackThreats);
        setLoading(false);
    }, []);

    // Filter and sort
    let filteredThreats = threats;
    if (filter !== 'all') {
        filteredThreats = threats.filter(t => t.type === filter);
    }

    filteredThreats = [...filteredThreats].sort((a, b) => {
        if (sortBy === 'reports') return b.reports - a.reports;
        if (sortBy === 'recent') return new Date(b.timestamp) - new Date(a.timestamp);
        return 0;
    });

    const trendingThreats = threats.filter(t => t.trending);
    const totalReports = threats.reduce((sum, t) => sum + t.reports, 0);

    if (loading) {
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div className="loading" style={{ width: '60px', height: '60px', margin: '0 auto' }}></div>
                <p style={{ marginTop: '2rem' }}>Loading community threats...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '1100px' }}>
            {/* Enhanced Gradient Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '3rem',
                padding: '3rem 2rem',
                background: 'linear-gradient(135deg, rgba(234, 67, 53, 0.15) 0%, rgba(251, 188, 4, 0.15) 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(234, 67, 53, 0.2)',
                boxShadow: '0 8px 32px rgba(234, 67, 53, 0.1)'
            }}>
                <div style={{
                    fontSize: '5rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 6px 12px rgba(234, 67, 53, 0.3))',
                    animation: 'fadeIn 0.8s ease'
                }}>🌍</div>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #ea4335 0%, #fbbc04 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: '800'
                }}>Community Threat Feed</h1>
                <p style={{
                    fontSize: '1.2rem',
                    maxWidth: '750px',
                    margin: '0 auto',
                    lineHeight: '1.7',
                    color: 'var(--text-primary)',
                    opacity: 0.9
                }}>
                    Real-time threats reported by our global community. Together, we protect millions from scams and cyber attacks.
                </p>
            </div>

            {/* Enhanced Stats Cards with Gradients */}
            <div className="grid" style={{ marginBottom: '3rem', gap: '1.5rem' }}>
                <div className="card" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(234, 67, 53, 0.2) 0%, rgba(234, 67, 53, 0.05) 100%)',
                    borderColor: 'var(--danger)',
                    borderWidth: '2px',
                    boxShadow: '0 4px 16px rgba(234, 67, 53, 0.2)'
                }}>
                    <h3 style={{ fontSize: '3.5rem', color: 'var(--danger)', marginBottom: '0.5rem', fontWeight: '800' }}>
                        {threats.length}
                    </h3>
                    <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>Active Threats</p>
                </div>
                <div className="card" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(251, 188, 4, 0.2) 0%, rgba(251, 188, 4, 0.05) 100%)',
                    borderColor: 'var(--warning)',
                    borderWidth: '2px',
                    boxShadow: '0 4px 16px rgba(251, 188, 4, 0.2)'
                }}>
                    <h3 style={{ fontSize: '3.5rem', color: 'var(--warning)', marginBottom: '0.5rem', fontWeight: '800' }}>
                        {totalReports.toLocaleString()}
                    </h3>
                    <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>Total Reports</p>
                </div>
                <div className="card" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.2) 0%, rgba(66, 133, 244, 0.05) 100%)',
                    borderColor: 'var(--primary)',
                    borderWidth: '2px',
                    boxShadow: '0 4px 16px rgba(66, 133, 244, 0.2)'
                }}>
                    <h3 style={{ fontSize: '3.5rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '800' }}>
                        {trendingThreats.length}
                    </h3>
                    <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>Trending Now</p>
                </div>
            </div>

            {/* Trending Alert */}
            {trendingThreats.length > 0 && (
                <div className="card" style={{
                    background: 'linear-gradient(135deg, rgba(251, 188, 4, 0.15) 0%, rgba(251, 188, 4, 0.05) 100%)',
                    borderColor: 'var(--warning)',
                    borderWidth: '2px',
                    marginBottom: '2rem',
                    boxShadow: '0 4px 16px rgba(251, 188, 4, 0.2)'
                }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>🔥 Trending Threats This Week</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {trendingThreats.slice(0, 3).map(threat => (
                            <div key={threat.id} style={{
                                padding: '1rem',
                                background: 'var(--bg-dark)',
                                borderRadius: '10px',
                                border: '1px solid rgba(251, 188, 4, 0.3)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                            }}>
                                <strong style={{ fontSize: '1.05rem' }}>{threat.title}</strong>
                                <span className="badge badge-high">{threat.reports} reports</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Enhanced Filters */}
            <div className="card" style={{ marginBottom: '2.5rem', padding: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {['all', 'phishing', 'smishing', 'scam', 'malware'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`badge ${filter === type ?
                                    (type === 'all' ? 'badge-info' :
                                        type === 'phishing' || type === 'malware' ? 'badge-critical' :
                                            type === 'smishing' ? 'badge-high' : 'badge-medium') : ''}`}
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.75rem 1.25rem',
                                    fontSize: '0.95rem',
                                    background: filter === type ? '' : 'var(--bg-dark)',
                                    border: filter === type ? '' : '2px solid var(--border)',
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            borderRadius: '8px',
                            border: '2px solid var(--border)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.95rem'
                        }}
                    >
                        <option value="reports">📊 Most Reported</option>
                        <option value="recent">🕐 Most Recent</option>
                    </select>
                </div>
            </div>

            {/* Threat Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {filteredThreats.map((threat, index) => (
                    <div
                        key={threat.id}
                        className="card"
                        style={{
                            borderLeft: `5px solid ${threat.severity === 'critical' ? 'var(--danger)' :
                                    threat.severity === 'high' ? 'var(--warning)' :
                                        '#ff9800'
                                }`,
                            animation: `fadeIn ${0.3 + index * 0.1}s ease`
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.35rem' }}>{threat.title}</h3>
                                    {threat.trending && (
                                        <span className="badge badge-high" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                                            🔥 TRENDING
                                        </span>
                                    )}
                                </div>
                                <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.6' }}>{threat.description}</p>

                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                                    <span className={`badge badge-${threat.severity === 'critical' ? 'critical' :
                                            threat.severity === 'high' ? 'high' : 'medium'
                                        }`} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                                        {threat.severity.toUpperCase()}
                                    </span>
                                    <span className="badge badge-info" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                                        {threat.type.toUpperCase()}
                                    </span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '600' }}>
                                        {threat.reports.toLocaleString()} reports
                                    </span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        • {new Date(threat.timestamp).toLocaleDateString()}
                                    </span>
                                </div>

                                {threat.url && (
                                    <code style={{
                                        display: 'block',
                                        padding: '0.75rem',
                                        background: 'var(--bg-dark)',
                                        borderRadius: '6px',
                                        fontSize: '0.9rem',
                                        wordBreak: 'break-all',
                                        border: '1px solid var(--border)'
                                    }}>
                                        {threat.url}
                                    </code>
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '150px' }}>
                                <a href="/phishing" style={{ textDecoration: 'none' }}>
                                    <button className="btn" style={{ width: '100%', fontSize: '0.9rem' }}>
                                        🔍 Analyze
                                    </button>
                                </a>
                                <button
                                    className="btn btn-success"
                                    style={{ width: '100%', fontSize: '0.9rem' }}
                                    onClick={() => alert('✅ Thanks for confirming! Your report helps protect the community.')}
                                >
                                    👍 I Saw This
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="card" style={{
                marginTop: '3rem',
                background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.15) 0%, rgba(234, 67, 53, 0.15) 100%)',
                textAlign: 'center',
                borderColor: 'var(--primary)',
                borderWidth: '2px',
                padding: '2.5rem',
                boxShadow: '0 8px 24px rgba(66, 133, 244, 0.2)'
            }}>
                <h2 style={{ marginBottom: '1.25rem', fontSize: '2rem' }}>Spotted a New Threat?</h2>
                <p style={{ marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Help protect millions by reporting suspicious URLs, emails, or scams you encounter.
                </p>
                <button
                    className="btn btn-danger"
                    style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
                    onClick={() => alert('📝 Report feature coming soon! For now, use our Phishing Detection tool to analyze threats.')}
                >
                    📝 Report a Threat
                </button>
            </div>
        </div>
    );
}
