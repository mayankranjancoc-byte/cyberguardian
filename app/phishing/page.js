'use client';
import { useState } from 'react';

export default function PhishingDetection() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    async function analyzeURL() {
        if (!url.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/analyze-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url.trim() })
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data);
            } else {
                setResult({ error: data.error || 'Analysis failed' });
            }
        } catch (error) {
            setResult({ error: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter' && !loading) {
            analyzeURL();
        }
    }

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎣</div>
                <h1>Phishing Detection</h1>
                <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Paste a suspicious URL to analyze it for phishing indicators using AI-powered pattern matching and real-time threat intelligence.
                </p>
            </div>

            {/* Input Section */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                }}>
                    Enter Suspicious URL:
                </label>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="https://example.com or paste suspicious link here..."
                    style={{ marginBottom: '1rem' }}
                    disabled={loading}
                />

                <button
                    onClick={analyzeURL}
                    disabled={loading || !url.trim()}
                    className="btn btn-danger"
                    style={{ width: '100%', fontSize: '1.1rem' }}
                >
                    {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <span className="loading"></span>
                            Analyzing URL...
                        </span>
                    ) : (
                        '🔍 Analyze URL for Threats'
                    )}
                </button>

                <p style={{ fontSize: '0.875rem', marginTop: '1rem', marginBottom: 0, textAlign: 'center' }}>
                    💡 Try: https://amaz0n-verify-account-now.com
                </p>
            </div>

            {/* Results Section */}
            {result && !result.error && (
                <div className={`result risk-${result.riskLevel}`} style={{ animation: 'fadeIn 0.5s ease' }}>
                    {/* Risk Score */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <div>
                            <h2 style={{ marginBottom: '0.5rem' }}>Analysis Results</h2>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                                {new Date(result.timestamp).toLocaleString()}
                            </p>
                        </div>
                        <div style={{
                            background: result.riskLevel === 'high' ? 'var(--danger)' :
                                result.riskLevel === 'medium' ? 'var(--warning)' :
                                    'var(--success)',
                            color: result.riskLevel === 'medium' ? '#000' : '#fff',
                            padding: '1rem 1.5rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            minWidth: '120px'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{result.riskScore}</div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>RISK SCORE</div>
                        </div>
                    </div>

                    {/* Recommendation */}
                    <div className="card" style={{
                        background: result.riskLevel === 'high' ? 'rgba(234, 67, 53, 0.2)' :
                            result.riskLevel === 'medium' ? 'rgba(251, 188, 4, 0.2)' :
                                'rgba(52, 168, 83, 0.2)',
                        borderColor: result.riskLevel === 'high' ? 'var(--danger)' :
                            result.riskLevel === 'medium' ? 'var(--warning)' :
                                'var(--success)'
                    }}>
                        <h3 style={{ marginBottom: '0.75rem' }}>Recommendation:</h3>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
                            {result.recommendation}
                        </p>
                    </div>

                    {/* Red Flags */}
                    {result.patterns && result.patterns.length > 0 && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>🚩 Red Flags Detected:</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {result.patterns.map((pattern, index) => (
                                    <div key={index} className="card" style={{
                                        padding: '1rem',
                                        background: 'rgba(234, 67, 53, 0.1)',
                                        border: '1px solid rgba(234, 67, 53, 0.3)'
                                    }}>
                                        {pattern}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VirusTotal Results */}
                    <div style={{ marginTop: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>🛡️ Threat Intelligence:</h3>
                        <div className="card" style={{ padding: '1rem' }}>
                            {result.virusTotalError ? (
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                                    ⚠️ {result.virusTotalError}
                                </p>
                            ) : (
                                <div>
                                    <p style={{ margin: 0 }}>
                                        <strong>VirusTotal Scan:</strong> {result.virusTotalScore} out of 70+ security vendors flagged this URL as malicious
                                    </p>
                                    {result.virusTotalScore === 0 && (
                                        <p style={{ color: 'var(--success)', margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>
                                            ✅ No malicious detections from threat intelligence
                                        </p>
                                    )}
                                    {result.virusTotalScore > 0 && (
                                        <p style={{ color: 'var(--danger)', margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>
                                            ⚠️ Multiple vendors detected this as a threat!
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Analyzed URL */}
                    <div style={{ marginTop: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Analyzed URL:
                        </h4>
                        <code style={{
                            display: 'block',
                            padding: '0.75rem',
                            background: 'var(--bg-dark)',
                            borderRadius: '6px',
                            wordBreak: 'break-all',
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)'
                        }}>
                            {result.url}
                        </code>
                    </div>
                </div>
            )}

            {/* Error Display */}
            {result && result.error && (
                <div className="card" style={{
                    background: 'rgba(234, 67, 53, 0.1)',
                    borderColor: 'var(--danger)',
                    animation: 'fadeIn 0.5s ease'
                }}>
                    <h3 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>❌ Error</h3>
                    <p style={{ margin: 0 }}>{result.error}</p>
                </div>
            )}

            {/* Info Section */}
            <div className="card" style={{ marginTop: '2rem', background: 'rgba(66, 133, 244, 0.05)' }}>
                <h3 style={{ marginBottom: '1rem' }}>ℹ️ How It Works</h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                    <li><strong>Pattern Matching:</strong> Detects common phishing tricks like character substitution and suspicious domains</li>
                    <li><strong>Threat Intelligence:</strong> Queries VirusTotal API with 70+ antivirus engines</li>
                    <li><strong>Risk Scoring:</strong> Combines multiple signals to calculate overall threat level</li>
                    <li><strong>Explainable AI:</strong> Shows you exactly why a URL is flagged as suspicious</li>
                </ul>
            </div>
        </div>
    );
}
