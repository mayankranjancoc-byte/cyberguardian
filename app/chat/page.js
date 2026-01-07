'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatPage() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "👋 Hello! I'm CyberGuardian AI, your personal cybersecurity assistant. I can help you with phishing detection, security advice, incident response, and more. What would you like to know?"
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    async function sendMessage(e) {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    context: messages.slice(-6) // Last 3 exchanges
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.response,
                    source: data.source
                }]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting right now. Please try again or use our other tools directly.",
                error: true
            }]);
        } finally {
            setLoading(false);
        }
    }

    const quickPrompts = [
        "How do I identify a phishing email?",
        "What makes a strong password?",
        "What should I do if I clicked a suspicious link?",
        "How to enable two-factor authentication?",
        "What is ransomware?"
    ];

    function useQuickPrompt(prompt) {
        setInput(prompt);
    }

    return (
        <div className="container" style={{ maxWidth: '900px', height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingTop: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💬</div>
                <h1 style={{ marginBottom: '0.5rem' }}>AI Security Assistant</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Ask me anything about cybersecurity
                </p>
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                        Try asking:
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {quickPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => useQuickPrompt(prompt)}
                                className="badge badge-info"
                                style={{ cursor: 'pointer', padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            animation: 'fadeIn 0.3s ease'
                        }}
                    >
                        <div style={{
                            maxWidth: '80%',
                            background: msg.role === 'user' ? 'var(--primary)' : msg.error ? 'rgba(234, 67, 53, 0.1)' : 'var(--bg-card)',
                            color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                            padding: '1rem 1.25rem',
                            borderRadius: '16px',
                            borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                            borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                            border: msg.error ? '1px solid var(--danger)' : '1px solid var(--border)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            whiteSpace: 'pre-wrap',
                            lineHeight: '1.6'
                        }}>
                            {msg.role === 'assistant' && (
                                <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🤖</div>
                            )}
                            <div>{msg.content}</div>
                            {msg.source === 'gemini' && (
                                <div style={{
                                    fontSize: '0.75rem',
                                    marginTop: '0.5rem',
                                    opacity: 0.7,
                                    color: 'var(--success)'
                                }}>
                                    ✨ Powered by Gemini AI
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{
                            background: 'var(--bg-card)',
                            padding: '1rem 1.25rem',
                            borderRadius: '16px',
                            borderTopLeftRadius: '4px',
                            border: '1px solid var( --border)'
                        }}>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span className="loading"></span>
                                <span style={{ color: 'var(--text-secondary)' }}>Thinking...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} style={{
                position: 'sticky',
                bottom: 0,
                background: 'var(--bg-dark)',
                paddingTop: '1rem',
                paddingBottom: '1rem'
            }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage(e);
                            }
                        }}
                        placeholder="Ask about cybersecurity, phishing, passwords, or anything else..."
                        rows={1}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '2px solid var(--border)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            resize: 'none',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            minHeight: '50px',
                            maxHeight: '120px'
                        }}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="btn btn-success"
                        style={{
                            padding: '0.875rem 1.5rem',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {loading ? (
                            <>
                                <span className="loading"></span>
                                Sending...
                            </>
                        ) : (
                            <>
                                <span>Send</span>
                                <span>→</span>
                            </>
                        )}
                    </button>
                </div>
                <p style={{
                    fontSize: '0.825rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.5rem',
                    textAlign: 'center'
                }}>
                    Press Enter to send, Shift+Enter for new line
                </p>
            </form>
        </div>
    );
}
