'use client';
import { getSafetyColor, getSafetyLevel, getScoreBreakdown } from '../utils/securityScoring';

export default function PhishingModal({ isOpen, onClose, analysisData }) {
    if (!isOpen || !analysisData) return null;

    const { score, vtResult, deepAnalysis, recommendation, url } = analysisData;
    const safetyColor = getSafetyColor(score);
    const safetyLevel = getSafetyLevel(score);
    const breakdown = getScoreBreakdown(vtResult, deepAnalysis);

    return (
        <>
            {/* Modal Overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    animation: 'fadeIn 0.3s ease'
                }}
                onClick={onClose}
            >
                {/* Modal Content */}
                <div
                    style={{
                        background: 'rgba(26, 26, 46, 0.98)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        maxWidth: '700px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '2.5rem',
                        animation: 'fadeIn 0.4s ease',
                        position: 'relative'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            color: 'var(--text-secondary)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                    >
                        ×
                    </button>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                            Security Analysis
                        </h2>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            wordBreak: 'break-all',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            {url}
                        </p>
                    </div>

                    {/* Score Badge */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2.5rem'
                    }}>
                        <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${safetyColor}20, ${safetyColor}40)`,
                            border: `6px solid ${safetyColor}`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            boxShadow: `0 8px 32px ${safetyColor}60`
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                color: safetyColor
                            }}>
                                {score}
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: safetyColor,
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                / 100
                            </div>
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            color: safetyColor,
                            margin: 0
                        }}>
                            {recommendation.title}
                        </h3>
                    </div>

                    {/* Divider */}
                    <div style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                        marginBottom: '2rem'
                    }} />

                    {/* Analysis Breakdown */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{
                            fontSize: '1.1rem',
                            marginBottom: '1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            🔍 Analysis Details
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {breakdown.map((item, idx) => (
                                <div key={idx} style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.95rem',
                                            fontWeight: '600'
                                        }}>
                                            <span>{item.icon}</span>
                                            <span>{item.name}</span>
                                        </div>
                                        <div style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            color: item.score >= item.maxScore * 0.8 ? '#34a853' :
                                                item.score >= item.maxScore * 0.5 ? '#fbbc04' : '#ea4335'
                                        }}>
                                            {item.score}/{item.maxScore}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div style={{
                                        width: '100%',
                                        height: '6px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '3px',
                                        overflow: 'hidden',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <div style={{
                                            width: `${(item.score / item.maxScore) * 100}%`,
                                            height: '100%',
                                            background: item.score >= item.maxScore * 0.8 ? '#34a853' :
                                                item.score >= item.maxScore * 0.5 ? '#fbbc04' : '#ea4335',
                                            transition: 'width 0.6s ease-out'
                                        }} />
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '0.8rem',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        <span>{item.status}</span>
                                        <span>{item.details}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendation Panel */}
                    <div style={{
                        background: `${safetyColor}15`,
                        borderRadius: '16px',
                        padding: '1.5rem',
                        border: `1px solid ${safetyColor}40`,
                        marginBottom: '1.5rem'
                    }}>
                        <h4 style={{
                            fontSize: '1.1rem',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            💡 Our Recommendation
                        </h4>

                        <p style={{
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            marginBottom: '1rem',
                            color: 'var(--text-primary)'
                        }}>
                            {recommendation.message}
                        </p>

                        <ul style={{
                            margin: 0,
                            paddingLeft: '1.25rem',
                            lineHeight: '1.8',
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)'
                        }}>
                            {recommendation.actions.map((action, idx) => (
                                <li key={idx} style={{ marginBottom: '0.25rem' }}>
                                    {action}
                                </li>
                            ))}
                        </ul>

                        <div style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontStyle: 'italic'
                        }}>
                            <strong>Advice:</strong> {recommendation.advice}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{
                                padding: '0.875rem 2rem',
                                background: safetyColor,
                                fontWeight: '600',
                                fontSize: '1rem'
                            }}
                        >
                            Got It
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
