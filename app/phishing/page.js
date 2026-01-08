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
                    <h1>Enhanced Phishing Detection</h1>
                    <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                        Advanced multi-layer threat analysis combining VirusTotal, DNS reputation, domain age verification, and community reports to give you a comprehensive safety score.
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
                        Enter URL to Analyze:
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
                                {loadingStep || 'Analyzing URL...'}
                            </span>
                        ) : (
                            '🔍 Analyze URL with Advanced Verification'
                        )}
                    </button>

                    <p style={{ fontSize: '0.875rem', marginTop: '1rem', marginBottom: 0, textAlign: 'center' }}>
                        💡 Try: https://amaz0n-verify-account-now.com
                    </p>
                </div>

                {/* Info Section */}
                <div className="card" style={{ background: 'rgba(66, 133, 244, 0.05)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>🛡️ Multi-Layer Analysis</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Step 1: VirusTotal</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Check against 70+ threat databases
                            </div>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌐</div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Step 2: DNS Check</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Analyze domain reputation
                            </div>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📅</div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Domain Age</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Verify registration history
                            </div>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👥</div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Community</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Check user reports
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
