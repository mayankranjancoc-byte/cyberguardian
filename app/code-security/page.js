'use client';
import { useState } from 'react';

const vulnerabilityPatterns = [
    {
        id: 'sql-injection',
        name: 'SQL Injection',
        severity: 'critical',
        pattern: /execute.*\+|query.*\$|SELECT.*\+|INSERT.*\+|UPDATE.*\+|DELETE.*\+/gi,
        description: 'Potential SQL injection vulnerability detected',
        fix: 'Use parameterized queries or prepared statements instead of string concatenation',
        example: `// Bad:\ndb.query('SELECT * FROM users WHERE id = ' + userId);\n\n// Good:\ndb.query('SELECT * FROM users WHERE id = ?', [userId]);`
    },
    {
        id: 'xss',
        name: 'Cross-Site Scripting (XSS)',
        severity: 'high',
        pattern: /innerHTML|outerHTML|document\.write|eval\(/gi,
        description: 'Potential XSS vulnerability detected',
        fix: 'Use textContent instead of innerHTML, or sanitize user input properly',
        example: `// Bad:\nelement.innerHTML = userInput;\n\n// Good:\nelement.textContent = userInput;\n// Or use a sanitization library`
    },
    {
        id: 'hardcoded-secrets',
        name: 'Hardcoded Credentials',
        severity: 'critical',
        pattern: /api_key\s*=\s*['"]|password\s*=\s*['"]|secret\s*=\s*['"]|token\s*=\s*['"]/gi,
        description: 'Hardcoded credentials or API keys detected',
        fix: 'Store sensitive data in environment variables, not in code',
        example: `// Bad:\nconst apiKey = 'sk_live_1234567890';\n\n// Good:\nconst apiKey = process.env.API_KEY;`
    },
    {
        id: 'eval-usage',
        name: 'Dangerous eval() Usage',
        severity: 'high',
        pattern: /eval\(|Function\(\s*['"]|setTimeout\(['"]|setInterval\(['"]/gi,
        description: 'Dangerous use of eval() or Function() constructor detected',
        fix: 'Avoid eval(). Use JSON.parse() for parsing JSON, or other safer alternatives',
        example: `// Bad:\neval(userCode);\n\n// Good:\nJSON.parse(jsonString);`
    },
    {
        id: 'weak-crypto',
        name: 'Weak Cryptography',
        severity: 'medium',
        pattern: /\bmd5\b|\bsha1\b(?!\d)|\bDES\b|\bRC4\b/gi,
        description: 'Use of weak cryptographic algorithm detected',
        fix: 'Use SHA-256 or stronger algorithms for hashing and encryption',
        example: `// Bad:\ncrypto.createHash('md5');\n\n// Good:\ncrypto.createHash('sha256');`
    },
    {
        id: 'path-traversal',
        name: 'Path Traversal',
        severity: 'high',
        pattern: /readFile.*\+|writeFile.*\+|require.*\+/gi,
        description: 'Potential path traversal vulnerability',
        fix: 'Validate and sanitize file paths. Use path.basename() to prevent directory traversal',
        example: `// Bad:\nfs.readFile('/files/' + userInput);\n\n// Good:\nconst safePath = path.join('/files/', path.basename(userInput));`
    }
];

export default function CodeSecurity() {
    const [code, setCode] = useState('');
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [scanned, setScanned] = useState(false);

    function scanCode() {
        if (!code.trim()) {
            setVulnerabilities([]);
            setScanned(false);
            return;
        }

        const found = [];
        const lines = code.split('\n');

        vulnerabilityPatterns.forEach(pattern => {
            if (pattern.pattern.test(code)) {
                // Find matching lines
                const matchingLines = lines
                    .map((line, idx) => ({ line, lineNumber: idx + 1 }))
                    .filter(({ line }) => pattern.pattern.test(line));

                if (matchingLines.length > 0) {
                    found.push({
                        ...pattern,
                        matches: matchingLines
                    });
                }
            }
        });

        setVulnerabilities(found);
        setScanned(true);
    }

    const criticalCount = vulnerabilities.filter(v => v.severity === 'critical').length;
    const highCount = vulnerabilities.filter(v => v.severity === 'high').length;
    const mediumCount = vulnerabilities.filter(v => v.severity === 'medium').length;

    return (
        <div className="container" style={{ maxWidth: '1100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>💻</div>
                <h1>Code Security Scanner</h1>
                <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                    Scan your code for common security vulnerabilities and get instant fix recommendations
                </p>
            </div>

            {/* Code Input */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                }}>
                    Paste Your Code:
                </label>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here to scan for vulnerabilities...

Example:
const userId = req.params.id;
db.query('SELECT * FROM users WHERE id = ' + userId);
const apiKey = 'sk_live_1234567890';
"
                    rows={15}
                    style={{
                        fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
                        fontSize: '0.95rem',
                        lineHeight: '1.5'
                    }}
                />

                <button
                    onClick={scanCode}
                    disabled={!code.trim()}
                    className="btn btn-danger"
                    style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }}
                >
                    🔍 Scan for Vulnerabilities
                </button>
            </div>

            {/* Results */}
            {scanned && vulnerabilities.length === 0 && (
                <div className="card" style={{
                    background: 'rgba(52, 168, 83, 0.1)',
                    borderColor: 'var(--success)',
                    textAlign: 'center',
                    animation: 'fadeIn 0.5s ease'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <h2 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>No Vulnerabilities Detected!</h2>
                    <p style={{ margin: 0 }}>
                        Your code looks good! No common security issues were found in this scan.
                    </p>
                </div>
            )}

            {scanned && vulnerabilities.length > 0 && (
                <div style={{ animation: 'fadeIn 0.5s ease' }}>
                    {/* Summary */}
                    <div className="card" style={{
                        background: 'rgba(234, 67, 53, 0.1)',
                        borderColor: 'var(--danger)',
                        marginBottom: '2rem'
                    }}>
                        <h2 style={{ marginBottom: '1rem' }}>
                            ⚠️ Found {vulnerabilities.length} Security {vulnerabilities.length === 1 ? 'Issue' : 'Issues'}
                        </h2>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {criticalCount > 0 && (
                                <span className="badge badge-critical" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                                    🔴 {criticalCount} Critical
                                </span>
                            )}
                            {highCount > 0 && (
                                <span className="badge badge-high" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                                    🟠 {highCount} High
                                </span>
                            )}
                            {mediumCount > 0 && (
                                <span className="badge badge-medium" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                                    🟡 {mediumCount} Medium
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Vulnerability Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {vulnerabilities.map((vuln, index) => (
                            <div
                                key={index}
                                className="card"
                                style={{
                                    borderLeft: `4px solid ${vuln.severity === 'critical' ? 'var(--danger)' :
                                            vuln.severity === 'high' ? 'var(--warning)' :
                                                '#ff9800'
                                        }`
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '1rem',
                                    flexWrap: 'wrap',
                                    gap: '1rem'
                                }}>
                                    <h3 style={{ margin: 0 }}>{vuln.name}</h3>
                                    <span className={`badge badge-${vuln.severity === 'critical' ? 'critical' :
                                            vuln.severity === 'high' ? 'high' :
                                                'medium'
                                        }`}>
                                        {vuln.severity.toUpperCase()}
                                    </span>
                                </div>

                                <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                    {vuln.description}
                                </p>

                                {/* Affected Lines */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                        Found on {vuln.matches.length} {vuln.matches.length === 1 ? 'line' : 'lines'}:
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {vuln.matches.slice(0, 5).map((match, i) => (
                                            <span key={i} className="badge badge-info">Line {match.lineNumber}</span>
                                        ))}
                                        {vuln.matches.length > 5 && (
                                            <span className="badge badge-info">+{vuln.matches.length - 5} more</span>
                                        )}
                                    </div>
                                </div>

                                {/* Fix Recommendation */}
                                <div style={{
                                    background: 'rgba(66, 133, 244, 0.05)',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    borderLeft: '3px solid var(--primary)'
                                }}>
                                    <h4 style={{ marginBottom: '0.75rem', color: 'var(--primary)' }}>🔧 How to Fix:</h4>
                                    <p style={{ marginBottom: '1rem' }}>{vuln.fix}</p>

                                    <details>
                                        <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>
                                            View Code Example
                                        </summary>
                                        <pre style={{
                                            background: 'var(--bg-dark)',
                                            padding: '1rem',
                                            borderRadius: '6px',
                                            overflow: 'auto',
                                            fontSize: '0.875rem',
                                            lineHeight: '1.5',
                                            marginTop: '0.5rem'
                                        }}>
                                            <code>{vuln.example}</code>
                                        </pre>
                                    </details>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Information Section */}
            <div className="card" style={{ marginTop: '2rem', background: 'rgba(66, 133, 244, 0.05)' }}>
                <h3 style={{ marginBottom: '1rem' }}>ℹ️ What We Check For</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>🔴 Critical</h4>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>SQL Injection</li>
                            <li>Hardcoded Secrets</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>🟠 High</h4>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>XSS Vulnerabilities</li>
                            <li>eval() Usage</li>
                            <li>Path Traversal</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>🟡 Medium</h4>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>Weak Cryptography</li>
                            <li>Poor Practices</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
