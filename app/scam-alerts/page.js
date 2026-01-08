'use client';
import { useState } from 'react';
import { scamAlerts, getAlertsBySeverity } from '../data/scamAlerts';

export default function ScamAlertsPage() {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [userLocation] = useState('Delhi NCR'); // Mock location for MVP

    const filteredAlerts = getAlertsBySeverity(selectedFilter);

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return '#ea4335';
            case 'medium': return '#fbbc04';
            case 'low': return '#4285f4';
            default: return '#4285f4';
        }
    };

    const getSeverityBadge = (severity) => {
        switch (severity) {
            case 'high': return '🔴 High Priority';
            case 'medium': return '🟡 Medium Priority';
            case 'low': return '🔵 Low Priority';
            default: return '';
        }
    };

    return (
        <div className="container" style={{ maxWidth: '1200px', padding: '2rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    🗺️ What's Happening Nearby
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    Stay informed about scams people are reporting in <strong style={{ color: 'var(--primary)' }}>{userLocation}</strong>
                </p>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    marginTop: '0.5rem',
                    maxWidth: '600px',
                    margin: '0.5rem auto 0'
                }}>
                    Real stories from your area to help you stay safe. Not boring lectures - just what's actually happening around you.
                </p>
            </div>

            {/* Filter Buttons */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {['all', 'high', 'medium', 'low'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className="btn"
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: selectedFilter === filter
                                ? 'var(--primary)'
                                : 'rgba(26, 26, 46, 0.6)',
                            border: selectedFilter === filter
                                ? 'none'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                            textTransform: 'capitalize'
                        }}
                    >
                        {filter === 'all' ? '📊 All Alerts' : getSeverityBadge(filter)}
                    </button>
                ))}
            </div>

            {/* Alert Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                {filteredAlerts.map(alert => (
                    <div
                        key={alert.id}
                        className="card"
                        style={{
                            background: 'rgba(26, 26, 46, 0.7)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            border: `1px solid rgba(255, 255, 255, 0.1)`,
                            borderLeft: `4px solid ${getSeverityColor(alert.severity)}`,
                            padding: '1.5rem',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = `0 12px 40px ${getSeverityColor(alert.severity)}40`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                        }}
                    >
                        {/* Card Header */}
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                                {alert.emoji}
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                marginBottom: '0.5rem',
                                color: 'var(--text-primary)'
                            }}>
                                {alert.title}
                            </h3>
                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)',
                                flexWrap: 'wrap'
                            }}>
                                <span>📍 {alert.location}</span>
                                <span>•</span>
                                <span>👥 {alert.reportedCount} reports</span>
                                <span>•</span>
                                <span>🕐 {alert.timeAgo}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            marginBottom: '1.5rem',
                            borderLeft: '3px solid rgba(66, 133, 244, 0.3)',
                            paddingLeft: '1rem',
                            fontStyle: 'italic'
                        }}>
                            "{alert.description}"
                        </p>

                        {/* How People Get Trapped */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                marginBottom: '0.75rem',
                                color: '#fbbc04',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                🔍 How People Get Trapped
                            </h4>
                            <ul style={{
                                margin: 0,
                                paddingLeft: '1.5rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                lineHeight: '1.8'
                            }}>
                                {alert.howTrapped.map((point, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.25rem' }}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* How to Avoid It */}
                        <div>
                            <h4 style={{
                                fontSize: '1rem',
                                marginBottom: '0.75rem',
                                color: '#34a853',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                ✅ How to Avoid It
                            </h4>
                            <ul style={{
                                margin: 0,
                                paddingLeft: '1.5rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                lineHeight: '1.8'
                            }}>
                                {alert.howAvoid.map((point, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.25rem' }}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                            marginTop: '1.5rem',
                            paddingTop: '1rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            gap: '0.75rem',
                            justifyContent: 'space-between'
                        }}>
                            <button
                                className="badge badge-info"
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.85rem'
                                }}
                            >
                                👍 Helpful
                            </button>
                            <button
                                className="badge"
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.85rem',
                                    background: 'rgba(66, 133, 244, 0.2)',
                                    border: '1px solid rgba(66, 133, 244, 0.3)'
                                }}
                            >
                                📤 Share
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Footer */}
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'rgba(26, 26, 46, 0.5)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    💡 <strong>Tip:</strong> Share these alerts with family and friends to keep them safe too!
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    These alerts are based on reported scam patterns in your area. Stay vigilant and always verify before taking action.
                </p>
            </div>
        </div>
    );
}
