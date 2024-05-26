// App.js
import React, { useState } from 'react';
import './App.css';

const questions = [
  "I have felt cheerful and in good spirits.",
  "I have felt calm and relaxed.",
  "I have felt active and vigorous.",
  "I woke up feeling fresh and rested.",
  "My daily life has been filled with things that interest me."
];

function App() {
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const sum = answers.reduce((acc, curr) => acc + curr, 0);
    return sum * 4;
  };

  const getExplanation = (score) => {
    if (score <= 50) {
      return "Your well-being score indicates poor well-being. We recommend consulting with a healthcare professional for personalized advice and support.";
    } else if (score <= 75) {
      return "Your well-being score indicates moderate well-being. Focus on self-care activities such as exercise, relaxation techniques, and social connections.";
    } else {
      return "Your well-being score indicates good well-being. Keep up the good work and continue practicing healthy habits for maintaining well-being.";
    }
  };

  const handleSubmit = () => {
    // Check if all answers are filled
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setAnswers(Array(5).fill(null));
    setShowResult(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WHO-5 Well-being Index</h1>
        {!showResult ? (
          <div className="question-container">
            <p className="instruction">Please select an answer for each question:</p>
            {questions.map((question, index) => (
              <div key={index} className="question">
                <p className="question-text">{question}</p>
                <div className="answers">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      className={`answer-button ${answers[index] === value ? 'selected' : ''}`}
                      onClick={() => handleAnswer(index, value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button className="submit-button" onClick={handleSubmit}>Check my mental health</button>
          </div>
        ) : (
          <div className="result-container">
            <p className="result-text">Your well-being score is:</p>
            <p className="score">{calculateScore()}</p>
            <p className="explanation">{getExplanation(calculateScore())}</p>
            <button className="restart-button" onClick={restartQuiz}>Restart Quiz</button>
          </div>
        )}
      </header>
      <footer className="footer">
        <p>&copy; 2024 moabmo</p>
      </footer>
    </div>
  );
}

export default App;
