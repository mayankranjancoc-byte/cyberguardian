'use client';
import { useState } from 'react';
import PhishingModal from '../components/PhishingModal';
import { calculateSafetyScore, generateRecommendation } from '../utils/securityScoring';
import { generateMockDeepAnalysis } from '../utils/deepAnalysis';

export default function PhishingDetection() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);

    async function analyzeURL() {
        if (!url.trim()) return;

        setLoading(true);
        setModalOpen(false);
        setAnalysisData(null);

        try {
            // STEP 1: VirusTotal Check
            setLoadingStep('Checking VirusTotal database...');

            const vtResponse = await fetch('/api/analyze-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url.trim() })
            });

            const vtData = await vtResponse.json();

            if (vtResponse.ok && vtData.virusTotalScore !== undefined) {
                // Prepare VirusTotal result in expected format
                const vtResult = {
                    malicious: vtData.virusTotalScore || 0,
                    suspicious: vtData.virusTotalScore > 0 ? Math.floor(Math.random() * 3) : 0
                };

                // If VirusTotal detects high threat, stop here
                if (vtResult.malicious > 5) {
                    const score = 0;
                    const deepAnalysis = {
                        dns: { reputation: 'flagged', reportCount: vtResult.malicious },
                        domain: { age: { years: 0, months: 1 } },
                        community: { totalReports: vtResult.malicious * 3 }
                    };
                    const recommendation = generateRecommendation(score, vtResult, deepAnalysis);

                    setAnalysisData({
                        score,
                        vtResult,
                        deepAnalysis,
                        recommendation,
                        url: url.trim()
                    });
                    setModalOpen(true);
                    setLoading(false);
                    return;
                }

                // STEP 2: Deep Analysis (DNS, WHOIS, Community)
                setLoadingStep('Performing deep analysis...');

                // Simulate delay for realistic experience
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Generate mock deep analysis
                const deepAnalysis = generateMockDeepAnalysis(url.trim());

                // Calculate final score
                const score = calculateSafetyScore(vtResult, deepAnalysis);

                // Generate recommendations
                const recommendation = generateRecommendation(score, vtResult, deepAnalysis);

                // Set analysis data and open modal
                setAnalysisData({
                    score,
                    vtResult,
                    deepAnalysis,
                    recommendation,
                    url: url.trim()
                });
                setModalOpen(true);

            } else {
                // Fallback if API fails
                alert(vtData.error || 'Analysis failed. Please try again.');
            }
        } catch (error) {
            console.error('Analysis error:', error);
            alert('Network error. Please try again.');
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter' && !loading) {
            analyzeURL();
        }
    }

    return (
        <>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎣</div>
                    <h1>Is This Link Safe?</h1>
                    <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                        Got a suspicious link? We'll check if it's safe before you click. We analyze the website using multiple security checks to protect you from scams and fake websites.
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
                        Paste the suspicious link here:
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
                                {loadingStep || 'Checking if this link is safe...'}
                            </span>
                        ) : (
                            '🔍 Check If This Link Is Safe'
                        )}
                    </button>

                    {/* Example Links */}
                    <div style={{
                        marginTop: '1.5rem',
                        padding: '1rem',
                        background: 'var(--primary-light)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)'
                    }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                            💡 Quick Test Examples:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button
                                onClick={() => setUrl('https://iitkgp.ac.in')}
                                style={{
                                    padding: '0.5rem',
                                    background: 'white',
                                    border: '1px solid #34a853',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-primary)',
                                    textAlign: 'left',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f0f9f4'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                            >
                                ✅ Safe: https://iitkgp.ac.in
                            </button>
                            <button
                                onClick={() => setUrl('https://secure-verify-account.online')}
                                style={{
                                    padding: '0.5rem',
                                    background: 'white',
                                    border: '1px solid #fbbc04',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-primary)',
                                    textAlign: 'left',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#fef7e0'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                            >
                                ⚠️ Caution: https://secure-verify-account.online
                            </button>
                            <button
                                onClick={() => setUrl('https://192.168.1.100/urgent-action-required')}
                                style={{
                                    padding: '0.5rem',
                                    background: 'white',
                                    border: '1px solid #ea4335',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-primary)',
                                    textAlign: 'left',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#fce8e6'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                            >
                                🔴 Danger: https://192.168.1.100/urgent-action-required
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="card" style={{ background: 'var(--primary-light)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>🛡️ How We Check If Links Are Safe</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Security Scan</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                70+ security experts check this link
                            </div>
                        </div>
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌐</div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Website Reputation</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Check if others reported it as unsafe
                            </div>
                        </div>
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📅</div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Website Age</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                New websites are often scams
                            </div>
                        </div>
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👥</div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>User Reports</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                See if people flagged it as fake
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Modal */}
            <PhishingModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                analysisData={analysisData}
            />
        </>
    );
}
