'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatPage() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content:
                "👋 Hello! I'm CyberGuardian AI, your personal cybersecurity assistant. I can help you with phishing detection, security advice, incident response, and more. What would you like to know?",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Voice Mode State
    const [voiceMode, setVoiceMode] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [avatarMode, setAvatarMode] = useState(false); // Dedicated avatar conversation mode
    const recognitionRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    async function sendMessage(e) {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');

        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    context: messages.slice(-6),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: data.response,
                        source: data.source,
                    },
                ]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content:
                        "Sorry, I'm having trouble connecting right now. Please try again or use our other tools directly.",
                    error: true,
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    const quickPrompts = [
        'How do I identify a phishing email?',
        'What makes a strong password?',
        'What should I do if I clicked a suspicious link?',
        'How to enable two-factor authentication?',
        'What is ransomware?',
    ];

    function handleQuickPrompt(prompt) {
        setInput(prompt);
    }

    // Voice Recognition Functions
    const startListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);

            // Auto-send like Gemini Voice Assistant
            setTimeout(() => {
                const fakeEvent = { preventDefault: () => { } };
                sendMessage(fakeEvent);
            }, 500);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            if (event.error === 'no-speech') {
                alert('No speech detected. Please try again.');
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    // Text-to-Speech Functions
    const speakText = (text) => {
        if (isMuted || !voiceMode) return;

        // Stop any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95; // Slightly slower for clarity
        utterance.pitch = 1.0; // Neutral pitch
        utterance.volume = 0.85; // Comfortable volume
        utterance.lang = 'en-US';

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const toggleVoiceMode = () => {
        const newMode = !voiceMode;
        setVoiceMode(newMode);

        if (!newMode) {
            stopListening();
            stopSpeaking();
            setAvatarMode(false); // Exit avatar mode when voice mode is turned off
        } else {
            // Welcome message when voice mode is activated
            setTimeout(() => {
                speakText("Voice mode activated. You can now talk to me. Click the microphone to start speaking.");
            }, 500);
        }
    };

    const toggleAvatarMode = () => {
        const newMode = !avatarMode;
        setAvatarMode(newMode);

        if (newMode && !voiceMode) {
            // Automatically enable voice mode when avatar mode is activated
            setVoiceMode(true);
            setTimeout(() => {
                speakText("Hello! I'm your cyber security guardian. Let's talk about keeping you safe online.");
            }, 800);
        } else if (!newMode) {
            // Keep voice mode on but exit avatar view
            speakText("Returning to normal chat.");
        }
    };

    // Auto-play TTS for AI responses when voice mode is active
    useEffect(() => {
        if (voiceMode && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'assistant' && !loading) {
                speakText(lastMessage.content);
            }
        }
    }, [messages, voiceMode]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopListening();
            stopSpeaking();
        };
    }, []);

    return (
        <div
            className="container"
            style={{
                maxWidth: '1400px',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '1.5rem',
            }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💬</div>
                <h1 style={{ marginBottom: '0.5rem' }}>AI Security Assistant</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Ask me anything about cybersecurity
                </p>

                {/* Voice Mode Toggle Button */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={toggleVoiceMode}
                        className="btn"
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: voiceMode ? 'var(--success)' : 'var(--primary)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {voiceMode ? '🎤' : '💬'} {voiceMode ? 'Voice Mode Active' : 'Enable Voice Mode'}
                    </button>

                    {/* Talk to AI Avatar Button */}
                    <button
                        onClick={toggleAvatarMode}
                        className="btn"
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: avatarMode
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                : 'linear-gradient(135deg, #4285f4 0%, #1a73e8 100%)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            boxShadow: avatarMode
                                ? '0 4px 20px rgba(102, 126, 234, 0.4)'
                                : '0 4px 12px rgba(66, 133, 244, 0.3)'
                        }}
                    >
                        🛡️ {avatarMode ? 'Avatar Mode Active' : 'Talk to AI Avatar'}
                    </button>
                </div>
            </div>

            {/* Immersive Avatar Conversation Interface - Full Screen */}
            {avatarMode && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 15, 30, 0.98)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}>
                    {/* Avatar Container */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2rem'
                    }}>
                        {/* Large Animated Avatar */}
                        <div
                            style={{
                                width: '250px',
                                height: '250px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10rem',
                                boxShadow: isSpeaking
                                    ? '0 0 60px rgba(102, 126, 234, 0.9), 0 0 120px rgba(102, 126, 234, 0.6), 0 0 180px rgba(102, 126, 234, 0.3)'
                                    : isListening
                                        ? '0 0 40px rgba(66, 133, 244, 0.8), 0 0 80px rgba(66, 133, 244, 0.4)'
                                        : '0 20px 60px rgba(0, 0, 0, 0.5)',
                                animation: isSpeaking ? 'avatarPulse 1.2s ease-in-out infinite' : 'none',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: '6px solid rgba(255, 255, 255, 0.3)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Animated Background Gradient */}
                            <div style={{
                                position: 'absolute',
                                top: '-50%',
                                left: '-50%',
                                width: '200%',
                                height: '200%',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                                animation: isSpeaking ? 'rotate 8s linear infinite' : 'none'
                            }} />
                            <span style={{ position: 'relative', zIndex: 1 }}>🛡️</span>
                        </div>

                        {/* Status Display */}
                        <div style={{
                            textAlign: 'center',
                            minHeight: '100px'
                        }}>
                            <h2 style={{
                                fontSize: '2rem',
                                marginBottom: '1rem',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: '700'
                            }}>
                                CyberGuardian AI
                            </h2>
                            <p style={{
                                fontSize: '1.5rem',
                                color: isSpeaking ? 'var(--success)' : isListening ? 'var(--primary)' : 'var(--text-secondary)',
                                fontWeight: '600',
                                minHeight: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem'
                            }}>
                                {isSpeaking && (
                                    <>
                                        <span style={{ fontSize: '1.75rem' }}>🔊</span>
                                        <span>Speaking...</span>
                                    </>
                                )}
                                {isListening && !isSpeaking && (
                                    <>
                                        <span style={{ fontSize: '1.75rem' }}>🎤</span>
                                        <span>Listening...</span>
                                    </>
                                )}
                                {!isSpeaking && !isListening && (
                                    <>
                                        <span style={{ fontSize: '1.75rem' }}>✨</span>
                                        <span>Ready to help you stay safe</span>
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Avatar Mode Controls */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginTop: '2rem'
                        }}>
                            <button
                                onClick={isListening ? stopListening : startListening}
                                disabled={loading}
                                className="btn"
                                style={{
                                    padding: '1.25rem 2.5rem',
                                    fontSize: '1.25rem',
                                    background: isListening ? 'var(--danger)' : 'linear-gradient(135deg, #34a853 0%, #188038 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                                    minWidth: '200px',
                                    justifyContent: 'center'
                                }}
                            >
                                {isListening ? (
                                    <>
                                        <span style={{ fontSize: '2rem' }}>⏹️</span>
                                        <span>Stop</span>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '2rem' }}>🎤</span>
                                        <span>Start Talking</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={stopSpeaking}
                                disabled={!isSpeaking}
                                className="btn"
                                style={{
                                    padding: '1.25rem 2.5rem',
                                    fontSize: '1.25rem',
                                    opacity: isSpeaking ? 1 : 0.5,
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                <span style={{ fontSize: '2rem' }}>🔇</span> Stop Speaking
                            </button>

                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="btn"
                                style={{
                                    padding: '1.25rem 2.5rem',
                                    fontSize: '1.25rem',
                                    background: isMuted ? 'var(--warning)' : 'var(--primary)',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                <span style={{ fontSize: '2rem' }}>{isMuted ? '🔇' : '🔊'}</span>
                                {isMuted ? 'Unmute' : 'Mute'}
                            </button>
                        </div>

                        {/* Exit Avatar Mode Button */}
                        <button
                            onClick={toggleAvatarMode}
                            className="btn"
                            style={{
                                padding: '1rem 2rem',
                                marginTop: '2rem',
                                background: 'rgba(26, 26, 46, 0.8)',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            💬 Switch to Text Chat
                        </button>

                        {/* Instruction Text */}
                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--text-secondary)',
                            marginTop: '2rem',
                            textAlign: 'center',
                            maxWidth: '500px',
                            lineHeight: '1.6'
                        }}>
                            Click "Start Talking", then speak your question. I'll respond with both voice and text to help you stay safe online.
                        </p>
                    </div>
                </div>
            )}

            {/* Original Small Avatar - Only shown in voice mode when avatar mode is OFF */}
            {voiceMode && !avatarMode && (
                <div style={{
                    position: 'fixed',
                    top: '120px',
                    right: '2rem',
                    zIndex: 999
                }}>
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3.5rem',
                            boxShadow: isSpeaking
                                ? '0 0 30px rgba(102, 126, 234, 0.8), 0 0 60px rgba(102, 126, 234, 0.4)'
                                : '0 8px 24px rgba(0, 0, 0, 0.3)',
                            animation: isSpeaking ? 'avatarPulse 1.5s ease-in-out infinite' : 'none',
                            transition: 'all 0.3s ease',
                            border: '3px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        🛡️
                    </div>
                    <div style={{
                        textAlign: 'center',
                        marginTop: '0.5rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        fontWeight: '600'
                    }}>
                        {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready'}
                    </div>
                </div>
            )}

            {/* Voice Controls Panel - Only shown when voice mode is active AND avatar mode is OFF */}
            {voiceMode && !avatarMode && (
                <div style={{
                    background: 'rgba(26, 26, 46, 0.9)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    padding: '1rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginBottom: '1rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={isListening ? stopListening : startListening}
                        disabled={loading}
                        className="btn"
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: isListening ? 'var(--danger)' : 'var(--success)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {isListening ? '⏹️ Stop' : '🎤 Talk'}
                    </button>

                    <button
                        onClick={stopSpeaking}
                        disabled={!isSpeaking}
                        className="btn"
                        style={{
                            padding: '0.75rem 1.5rem',
                            opacity: isSpeaking ? 1 : 0.5
                        }}
                    >
                        🔇 Stop Speaking
                    </button>

                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="btn"
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: isMuted ? 'var(--warning)' : 'var(--primary)'
                        }}
                    >
                        {isMuted ? '🔇 Unmute' : '🔊 Mute'}
                    </button>

                    <button
                        onClick={toggleVoiceMode}
                        className="btn"
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)'
                        }}
                    >
                        💬 Switch to Text
                    </button>
                </div>
            )}

            {/* Quick Prompts */}
            {messages.length === 1 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4
                        style={{
                            fontSize: '0.95rem',
                            marginBottom: '0.75rem',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        Try asking:
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {quickPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => handleQuickPrompt(prompt)}
                                className="badge badge-info"
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.5rem 0.75rem',
                                    fontSize: '0.875rem',
                                }}
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Messages */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    paddingBottom: '140px',
                    scrollBehavior: 'smooth',
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent:
                                msg.role === 'user' ? 'flex-end' : 'flex-start',
                            animation: 'fadeIn 0.3s ease',
                        }}
                    >
                        <div
                            style={{
                                maxWidth: '90%',
                                background:
                                    msg.role === 'user'
                                        ? 'var(--primary)'
                                        : msg.error
                                            ? 'rgba(234, 67, 53, 0.1)'
                                            : 'var(--bg-card)',
                                color:
                                    msg.role === 'user'
                                        ? 'white'
                                        : 'var(--text-primary)',
                                padding: '1.25rem 1.5rem',
                                borderRadius: '16px',
                                borderTopRightRadius:
                                    msg.role === 'user' ? '4px' : '16px',
                                borderTopLeftRadius:
                                    msg.role === 'assistant' ? '4px' : '16px',
                                border: msg.error
                                    ? '1px solid var(--danger)'
                                    : '1px solid var(--border)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                whiteSpace: 'pre-wrap',
                                fontSize: '1.05rem',
                                lineHeight: '1.7',
                            }}
                        >
                            {msg.role === 'assistant' && (
                                <div
                                    style={{
                                        fontSize: '1.25rem',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    🤖
                                </div>
                            )}
                            <div>{msg.content}</div>

                            {msg.source === 'gemini' && (
                                <div
                                    style={{
                                        fontSize: '0.75rem',
                                        marginTop: '0.5rem',
                                        opacity: 0.7,
                                        color: 'var(--success)',
                                    }}
                                >
                                    ✨ Powered by Gemini AI
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div
                            style={{
                                background: 'var(--bg-card)',
                                padding: '1rem 1.25rem',
                                borderRadius: '16px',
                                borderTopLeftRadius: '4px',
                                border: '1px solid var(--border)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    alignItems: 'center',
                                }}
                            >
                                <span className="loading"></span>
                                <span style={{ color: 'var(--text-secondary)' }}>
                                    Thinking...
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={sendMessage}
                style={{
                    position: 'sticky',
                    bottom: 0,
                    background: 'var(--bg-dark)',
                    padding: '1rem',
                    borderTop: '1px solid var(--border)',
                    zIndex: 10,
                }}
            >
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
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
                            minHeight: '50px',
                            maxHeight: '120px',
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
                            gap: '0.5rem',
                        }}
                    >
                        {loading ? (
                            <>
                                <span className="loading"></span>
                                Sending...
                            </>
                        ) : (
                            <>
                                Send <span>→</span>
                            </>
                        )}
                    </button>
                </div>

                <p
                    style={{
                        fontSize: '0.825rem',
                        color: 'var(--text-secondary)',
                        marginTop: '0.5rem',
                        textAlign: 'center',
                    }}
                >
                    Press Enter to send, Shift+Enter for new line
                </p>
            </form>
        </div>
    );
}
