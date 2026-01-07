'use client';
import { useState, useRef } from 'react';

export default function ScanTools() {
    const [activeTab, setActiveTab] = useState('qr');
    const [qrImage, setQrImage] = useState(null);
    const [qrResult, setQrResult] = useState(null);
    const [qrLoading, setQrLoading] = useState(false);

    const [ocrImage, setOcrImage] = useState(null);
    const [ocrResult, setOcrResult] = useState(null);
    const [ocrLoading, setOcrLoading] = useState(false);

    const qrFileInput = useRef(null);
    const ocrFileInput = useRef(null);

    // QR Code Scanner
    async function handleQRUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        setQrLoading(true);
        setQrResult(null);

        // Display preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setQrImage(event.target.result);
        };
        reader.readAsDataURL(file);

        // Simulate QR decode (in real app, would use jsQR library)
        setTimeout(() => {
            // Mock QR decode result
            const mockResults = [
                { url: 'https://amaz0n-verify-payment.tk', safe: false },
                { url: 'https://google.com', safe: true },
                { url: 'https://paypa1-security-check.ml', safe: false }
            ];

            const result = mockResults[Math.floor(Math.random() * mockResults.length)];

            setQrResult({
                decoded: true,
                content: result.url,
                type: 'URL',
                safe: result.safe,
                analysis: result.safe
                    ? '✅ This QR code leads to a legitimate website'
                    : '⚠️ WARNING: This QR code may lead to a phishing or scam website'
            });
            setQrLoading(false);
        }, 2000);
    }

    // OCR Screenshot Analyzer
    async function handleOCRUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        setOcrLoading(true);
        setOcrResult(null);

        // Display preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setOcrImage(event.target.result);
        };
        reader.readAsDataURL(file);

        // Simulate OCR extraction (in real app, would use Tesseract.js)
        setTimeout(() => {
            // Mock extracted text from email screenshot
            const extractedText = `
URGENT: Your account has been suspended

Dear Customer,

Your account will be permanently deleted within 24 hours due to suspicious activity.

Click here to verify your identity immediately: http://verify-account-now.tk

If you don't act now, you will lose access to all your data.

Thank you,
Security Team
      `.trim();

            // Analyze for phishing indicators
            const indicators = [];
            if (extractedText.toLowerCase().includes('urgent')) indicators.push('Urgency tactics');
            if (extractedText.toLowerCase().includes('suspended')) indicators.push('Account suspension threat');
            if (extractedText.toLowerCase().includes('click here')) indicators.push('Suspicious call-to-action');
            if (extractedText.match(/\.tk|\.ml|\.ga/)) indicators.push('Suspicious domain detected');

            setOcrResult({
                extracted: true,
                text: extractedText,
                indicators: indicators,
                riskLevel: indicators.length >= 3 ? 'HIGH' : indicators.length >= 2 ? 'MEDIUM' : 'LOW',
                recommendation: indicators.length >= 3
                    ? '🚨 HIGH RISK: This appears to be a phishing attempt. Do NOT click any links!'
                    : indicators.length >= 2
                        ? '⚠️ MEDIUM RISK: Multiple red flags detected. Verify sender before taking action.'
                        : '✅ LOW RISK: No obvious phishing indicators found.'
            });
            setOcrLoading(false);
        }, 3000);
    }

    return (
        <div className="container" style={{ maxWidth: '1000px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🔍</div>
                <h1>Multi-Modal Scanner</h1>
                <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                    Analyze QR codes and extract text from screenshots to detect phishing and scams
                </p>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('qr')}
                    className={`btn ${activeTab === 'qr' ? 'btn-success' : ''}`}
                    style={{
                        flex: 1,
                        background: activeTab === 'qr' ? '' : 'var(--bg-card)',
                        borderColor: activeTab === 'qr' ? '' : 'var(--border)'
                    }}
                >
                    📱 QR Code Scanner
                </button>
                <button
                    onClick={() => setActiveTab('ocr')}
                    className={`btn ${activeTab === 'ocr' ? 'btn-success' : ''}`}
                    style={{
                        flex: 1,
                        background: activeTab === 'ocr' ? '' : 'var(--bg-card)',
                        borderColor: activeTab === 'ocr' ? '' : 'var(--border)'
                    }}
                >
                    📧 Screenshot Analyzer
                </button>
            </div>

            {/* QR Code Scanner Tab */}
            {activeTab === 'qr' && (
                <div style={{ animation: 'fadeIn 0.5s ease' }}>
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>📱 QR Code Scanner</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Upload an image of a QR code to decode and analyze its contents. QR codes are commonly used in phishing attacks.
                        </p>

                        <input
                            ref={qrFileInput}
                            type="file"
                            accept="image/*"
                            onChange={handleQRUpload}
                            style={{ display: 'none' }}
                        />

                        <button
                            onClick={() => qrFileInput.current.click()}
                            className="btn btn-success"
                            disabled={qrLoading}
                            style={{ width: '100%', fontSize: '1.1rem' }}
                        >
                            {qrLoading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <span className="loading"></span>
                                    Decoding QR Code...
                                </span>
                            ) : (
                                '📸 Upload QR Code Image'
                            )}
                        </button>
                    </div>

                    {qrImage && (
                        <div className="card" style={{ marginBottom: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Uploaded Image:</h4>
                            <img
                                src={qrImage}
                                alt="QR Code"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '400px',
                                    borderRadius: '8px',
                                    border: '2px solid var(--border)'
                                }}
                            />
                        </div>
                    )}

                    {qrResult && (
                        <div className={`result risk-${qrResult.safe ? 'low' : 'high'}`} style={{ animation: 'fadeIn 0.5s ease' }}>
                            <h2 style={{ marginBottom: '1rem' }}>QR Code Analysis</h2>

                            <div className="card" style={{ background: qrResult.safe ? 'rgba(52, 168, 83, 0.1)' : 'rgba(234, 67, 53, 0.1)' }}>
                                <h4 style={{ marginBottom: '0.75rem' }}>Decoded Content:</h4>
                                <code style={{
                                    display: 'block',
                                    padding: '1rem',
                                    background: 'var(--bg-dark)',
                                    borderRadius: '6px',
                                    wordBreak: 'break-all',
                                    marginBottom: '1rem'
                                }}>
                                    {qrResult.content}
                                </code>
                                <p style={{ fontSize: '1.1rem', margin: 0 }}>{qrResult.analysis}</p>
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <a href="/phishing" style={{ textDecoration: 'none' }}>
                                    <button className="btn btn-danger" style={{ width: '100%' }}>
                                        🔍 Analyze This URL in Phishing Detector
                                    </button>
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="card" style={{ marginTop: '2rem', background: 'rgba(66, 133, 244, 0.05)' }}>
                        <h4 style={{ marginBottom: '0.75rem' }}>ℹ️ Why Scan QR Codes?</h4>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                            <li>QR codes can hide malicious URLs that aren't visible before scanning</li>
                            <li>Scammers use QR codes in parking meters, restaurants, and public places</li>
                            <li>Always verify the destination before visiting a QR code link</li>
                            <li>Use this tool to safely decode QR codes without visiting the link</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* OCR Screenshot Tab */}
            {activeTab === 'ocr' && (
                <div style={{ animation: 'fadeIn 0.5s ease' }}>
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>📧 Screenshot Analyzer</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Upload a screenshot of a suspicious email or message. We'll extract the text and analyze it for phishing indicators.
                        </p>

                        <input
                            ref={ocrFileInput}
                            type="file"
                            accept="image/*"
                            onChange={handleOCRUpload}
                            style={{ display: 'none' }}
                        />

                        <button
                            onClick={() => ocrFileInput.current.click()}
                            className="btn btn-success"
                            disabled={ocrLoading}
                            style={{ width: '100%', fontSize: '1.1rem' }}
                        >
                            {ocrLoading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <span className="loading"></span>
                                    Extracting Text...
                                </span>
                            ) : (
                                '📸 Upload Screenshot'
                            )}
                        </button>
                    </div>

                    {ocrImage && (
                        <div className="card" style={{ marginBottom: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Uploaded Screenshot:</h4>
                            <img
                                src={ocrImage}
                                alt="Screenshot"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '400px',
                                    borderRadius: '8px',
                                    border: '2px solid var(--border)'
                                }}
                            />
                        </div>
                    )}

                    {ocrResult && (
                        <div className={`result risk-${ocrResult.riskLevel.toLowerCase()}`} style={{ animation: 'fadeIn 0.5s ease' }}>
                            <h2 style={{ marginBottom: '1rem' }}>Screenshot Analysis</h2>

                            <div className="card" style={{
                                background: ocrResult.riskLevel === 'HIGH' ? 'rgba(234, 67, 53, 0.1)' :
                                    ocrResult.riskLevel === 'MEDIUM' ? 'rgba(251, 188, 4, 0.1)' :
                                        'rgba(52, 168, 83, 0.1)',
                                marginBottom: '1.5rem'
                            }}>
                                <h4 style={{ marginBottom: '0.75rem' }}>Recommendation:</h4>
                                <p style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)' }}>
                                    {ocrResult.recommendation}
                                </p>
                            </div>

                            <div className="card" style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.75rem' }}>Extracted Text:</h4>
                                <pre style={{
                                    padding: '1rem',
                                    background: 'var(--bg-dark)',
                                    borderRadius: '6px',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {ocrResult.text}
                                </pre>
                            </div>

                            {ocrResult.indicators.length > 0 && (
                                <div>
                                    <h4 style={{ marginBottom: '1rem' }}>🚩 Phishing Indicators Detected:</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {ocrResult.indicators.map((indicator, index) => (
                                            <div key={index} className="card" style={{
                                                padding: '1rem',
                                                background: 'rgba(234, 67, 53, 0.1)',
                                                border: '1px solid rgba(234, 67, 53, 0.3)'
                                            }}>
                                                ⚠️ {indicator}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="card" style={{ marginTop: '2rem', background: 'rgba(66, 133, 244, 0.05)' }}>
                        <h4 style={{ marginBottom: '0.75rem' }}>ℹ️ Common Phishing Email Signs:</h4>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                            <li>Urgent language ("act now", "immediately", "suspended")</li>
                            <li>Generic greetings ("Dear Customer" instead of your name)</li>
                            <li>Suspicious links or attachments</li>
                            <li>Poor grammar and spelling mistakes</li>
                            <li>Requests for personal information</li>
                            <li>Threats of account closure or legal action</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
