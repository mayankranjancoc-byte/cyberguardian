'use client';
import { useState } from 'react';
import playbooks from '../../data/incident-playbooks.json';

export default function IncidentResponse() {
    const [selected, setSelected] = useState(null);
    const [checkedSteps, setCheckedSteps] = useState([]);

    function toggleStep(index) {
        if (checkedSteps.includes(index)) {
            setCheckedSteps(checkedSteps.filter(i => i !== index));
        } else {
            setCheckedSteps([...checkedSteps, index]);
        }
    }

    if (!selected) {
        return (
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🚨</div>
                    <h1>Incident Response Center</h1>
                    <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                        Select the type of security incident you're experiencing for step-by-step guidance
                    </p>
                </div>

                <div className="grid grid-2">
                    {playbooks.map(playbook => (
                        <div
                            key={playbook.id}
                            className="card card-clickable"
                            onClick={() => setSelected(playbook)}
                            style={{
                                borderLeft: `4px solid ${playbook.severity === 'critical' ? 'var(--danger)' :
                                        playbook.severity === 'high' ? 'var(--warning)' :
                                            'var(--primary)'
                                    }`,
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{playbook.icon}</div>
                            <h3>{playbook.name}</h3>
                            <p style={{ marginBottom: '1rem' }}>{playbook.description}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span className={`badge badge-${playbook.severity === 'critical' ? 'critical' :
                                        playbook.severity === 'high' ? 'high' :
                                            'medium'
                                    }`}>
                                    {playbook.severity.toUpperCase()}
                                </span>
                                <span className="badge badge-info">{playbook.steps.length} Steps</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card" style={{ marginTop: '2rem', background: 'rgba(234, 67, 53, 0.05)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>⚠️ Emergency? Act Fast!</h3>
                    <p style={{ margin: 0 }}>
                        If you're actively experiencing a security incident, select the appropriate playbook above for immediate guidance. Time is critical in cybersecurity incidents.
                    </p>
                </div>
            </div>
        );
    }

    const progress = (checkedSteps.length / selected.steps.length) * 100;
    const isComplete = progress === 100;

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <button
                onClick={() => {
                    setSelected(null);
                    setCheckedSteps([]);
                }}
                className="btn"
                style={{ marginBottom: '2rem' }}
            >
                ← Back to Incidents
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{selected.icon}</div>
                <h1>{selected.name}</h1>
                <p style={{ fontSize: '1.05rem' }}>{selected.description}</p>
                <span className={`badge badge-${selected.severity === 'critical' ? 'critical' :
                        selected.severity === 'high' ? 'high' :
                            'medium'
                    }`} style={{ fontSize: '1rem', padding: '0.5rem 1rem', marginTop: '0.5rem' }}>
                    {selected.severity.toUpperCase()} SEVERITY
                </span>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    color: 'var(--text-secondary)'
                }}>
                    <span>Progress</span>
                    <span>{checkedSteps.length} of {selected.steps.length} completed</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}>
                        {Math.round(progress)}%
                    </div>
                </div>
            </div>

            {/* Completion Message */}
            {isComplete && (
                <div className="card" style={{
                    background: 'rgba(52, 168, 83, 0.1)',
                    borderColor: 'var(--success)',
                    textAlign: 'center',
                    animation: 'fadeIn 0.5s ease',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>
                        ✅ Incident Response Complete!
                    </h2>
                    <p style={{ margin: 0 }}>
                        You've completed all recommended steps. Continue monitoring your systems and accounts for the next 30 days.
                    </p>
                </div>
            )}

            {/* Steps Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selected.steps.map((step, index) => {
                    const isChecked = checkedSteps.includes(index);

                    return (
                        <div
                            key={index}
                            className="card"
                            style={{
                                opacity: isChecked ? 0.7 : 1,
                                borderColor: isChecked ? 'var(--success)' : 'var(--border)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleStep(index)}
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        cursor: 'pointer',
                                        marginTop: '0.25rem',
                                        flexShrink: 0
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        marginBottom: '0.5rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        <h3 style={{
                                            margin: 0,
                                            textDecoration: isChecked ? 'line-through' : 'none',
                                            color: isChecked ? 'var(--text-secondary)' : 'var(--text-primary)'
                                        }}>
                                            {index + 1}. {step.title}
                                        </h3>
                                        <span className="badge badge-info" style={{ flexShrink: 0 }}>
                                            {step.timeframe}
                                        </span>
                                    </div>
                                    <p style={{
                                        margin: 0,
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        {step.detail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Additional Resources */}
            <div className="card" style={{ marginTop: '2rem', background: 'rgba(66, 133, 244, 0.05)' }}>
                <h3 style={{ marginBottom: '1rem' }}>📞 Additional Resources</h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                    <li><strong>FBI Internet Crime Complaint Center:</strong> ic3.gov</li>
                    <li><strong>Emergency Contacts:</strong> Document all incident details for law enforcement</li>
                    <li><strong>Professional Help:</strong> Consider hiring cybersecurity professionals for critical incidents</li>
                    <li><strong>Prevention:</strong> After recovery, implement security measures to prevent future incidents</li>
                </ul>
            </div>
        </div>
    );
}
