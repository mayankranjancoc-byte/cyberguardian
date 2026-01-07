'use client';
import { useState } from 'react';
import questions from '../../data/quiz-questions.json';

export default function CyberAwareness() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);

    const currentQuestion = questions[currentIndex];

    function handleAnswer(optionIndex) {
        if (showExplanation) return;

        setSelectedAnswer(optionIndex);
        setShowExplanation(true);

        if (optionIndex === currentQuestion.correct) {
            setScore(score + 1);
        }
    }

    function nextQuestion() {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizComplete(true);
        }
    }

    function restartQuiz() {
        setCurrentIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setQuizComplete(false);
    }

    if (quizComplete) {
        const percentage = Math.round((score / questions.length) * 100);
        let level, message, badgeEmoji;

        if (percentage >= 90) {
            level = "Cyber Security Expert";
            message = "Outstanding! You have excellent cybersecurity knowledge!";
            badgeEmoji = "🏆";
        } else if (percentage >= 70) {
            level = "Security Conscious";
            message = "Great job! You have solid cybersecurity awareness.";
            badgeEmoji = "⭐";
        } else if (percentage >= 50) {
            level = "Learning Progress";
            message = "Good effort! Keep learning to improve your security knowledge.";
            badgeEmoji = "📚";
        } else {
            level = "Beginner";
            message = "Keep practicing! Cybersecurity is an important skill to develop.";
            badgeEmoji = "🌱";
        }

        return (
            <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'fadeIn 0.8s ease' }}>
                    {badgeEmoji}
                </div>
                <h1>Quiz Complete!</h1>

                <div className="card" style={{
                    marginTop: '2rem',
                    background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, rgba(52, 168, 83, 0.1) 100%)',
                    borderColor: 'var(--success)'
                }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        {score}/{questions.length}
                    </div>
                    <p style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        {percentage}% Correct
                    </p>
                    <div className="badge badge-info" style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}>
                        {level}
                    </div>
                    <p style={{ fontSize: '1.1rem', marginTop: '1.5rem', color: 'var(--text-primary)' }}>
                        {message}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={restartQuiz} className="btn btn-success">
                        🔄 Retake Quiz
                    </button>
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <button className="btn">
                            🏠 Back to Home
                        </button>
                    </a>
                </div>

                {/* Achievements */}
                <div className="card" style={{ marginTop: '2rem', textAlign: 'left' }}>
                    <h3 style={{ marginBottom: '1rem' }}>🏅 Achievements Unlocked:</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <span className="badge badge-info">Quiz Completed</span>
                        {score >= 5 && <span className="badge badge-low">5+ Correct</span>}
                        {score >= 8 && <span className="badge badge-high">Security Expert</span>}
                        {percentage === 100 && <span className="badge badge-critical">Perfect Score!</span>}
                        {currentQuestion.difficulty === 'advanced' && <span className="badge badge-medium">Advanced Learner</span>}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>📚</div>
                <h1>Cyber Awareness Quiz</h1>
                <p style={{ fontSize: '1.1rem' }}>
                    Test your cybersecurity knowledge and learn essential security concepts
                </p>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    color: 'var(--text-secondary)'
                }}>
                    <span>Question {currentIndex + 1} of {questions.length}</span>
                    <span>Score: {score}/{currentIndex + (showExplanation ? 1 : 0)}</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="card" style={{ animation: 'fadeIn 0.5s ease' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <span className="badge badge-info" style={{ marginBottom: '1rem' }}>
                        {currentQuestion.difficulty.toUpperCase()}
                    </span>
                    <h2 style={{ marginTop: '1rem' }}>{currentQuestion.question}</h2>
                </div>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {currentQuestion.options.map((option, index) => {
                        let buttonStyle = {
                            width: '100%',
                            textAlign: 'left',
                            padding: '1.25rem',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            border: '2px solid transparent'
                        };

                        if (showExplanation) {
                            if (index === currentQuestion.correct) {
                                buttonStyle.background = 'var(--success)';
                                buttonStyle.borderColor = 'var(--success-dark)';
                                buttonStyle.color = 'white';
                            } else if (index === selectedAnswer) {
                                buttonStyle.background = 'var(--danger)';
                                buttonStyle.borderColor = 'var(--danger-dark)';
                                buttonStyle.color = 'white';
                            } else {
                                buttonStyle.opacity = '0.5';
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                disabled={showExplanation}
                                className="btn"
                                style={buttonStyle}
                            >
                                <span style={{ marginRight: '0.75rem', fontWeight: '700' }}>
                                    {String.fromCharCode(65 + index)}.
                                </span>
                                {option}
                                {showExplanation && index === currentQuestion.correct && (
                                    <span style={{ marginLeft: '0.5rem' }}>✓</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {showExplanation && (
                    <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.5s ease' }}>
                        <div className="card" style={{
                            background: selectedAnswer === currentQuestion.correct
                                ? 'rgba(52, 168, 83, 0.1)'
                                : 'rgba(234, 67, 53, 0.1)',
                            borderColor: selectedAnswer === currentQuestion.correct
                                ? 'var(--success)'
                                : 'var(--danger)'
                        }}>
                            <h4 style={{ marginBottom: '0.75rem' }}>
                                {selectedAnswer === currentQuestion.correct ? '✅ Correct!' : '❌ Incorrect'}
                            </h4>
                            <p style={{ margin: 0, color: 'var(--text-primary)' }}>
                                {currentQuestion.explanation}
                            </p>
                        </div>

                        <button
                            onClick={nextQuestion}
                            className="btn btn-success"
                            style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }}
                        >
                            {currentIndex < questions.length - 1 ? '→ Next Question' : '🏆 See Results'}
                        </button>
                    </div>
                )}
            </div>

            {/* Hint Section */}
            {!showExplanation && (
                <div className="card" style={{ marginTop: '1.5rem', background: 'rgba(66, 133, 244, 0.05)' }}>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>
                        💡 <strong>Tip:</strong> Take your time to read each option carefully. There's no time limit!
                    </p>
                </div>
            )}
        </div>
    );
}
