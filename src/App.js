// App.js
import React, { useState } from 'react';
import './App.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';


const questions = [
  "I have felt cheerful and in good spirits?",
  "I have felt calm and relaxed?",
  "I have felt active and vigorous?",
  "I woke up feeling fresh and rested?",
  "My daily life has been filled with things that interest me?"
];

const recommendations = {
  veryPoor: [
    "Seek immediate professional help from a mental health expert.",
    "Reach out to trusted friends or family members for support.",
    "Consider joining a support group for emotional assistance."
  ],
  poor: [
    "Consult with a healthcare professional for personalized advice.",
    "Engage in regular physical exercise.",
    "Practice mindfulness or relaxation techniques.",
    "Establish a regular sleep routine."
  ],
  moderate: [
    "Continue practicing self-care activities such as exercise and relaxation.",
    "Maintain social connections and spend time with loved ones.",
    "Set aside time for hobbies and activities you enjoy.",
    "Consider keeping a journal to reflect on positive experiences."
  ],
  good: [
    "Keep up the good work with your current healthy habits.",
    "Explore new activities or hobbies that interest you.",
    "Share your well-being strategies with friends and family.",
    "Continue to monitor your well-being and adjust as needed."
  ],
  excellent: [
    "Continue your great habits and maintain your current lifestyle.",
    "Consider mentoring others on well-being practices.",
    "Explore further personal growth opportunities.",
    "Stay proactive in monitoring and maintaining your well-being."
  ]
};

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
    if (score <= 20) {
      return {
        message: "Your well-being score indicates very poor well-being!",
        advice: recommendations.veryPoor
      };
    } else if (score <= 50) {
      return {
        message: "Your well-being score indicates poor well-being!",
        advice: recommendations.poor
      };
    } else if (score <= 75) {
      return {
        message: "Your well-being score indicates moderate well-being!",
        advice: recommendations.moderate
      };
    } else if (score <= 95) {
      return {
        message: "Your well-being score indicates good well-being!",
        advice: recommendations.good
      };
    } else {
      return {
        message: "Your well-being score indicates excellent well-being!",
        advice: recommendations.excellent
      };
    }
  };

  const handleSubmit = () => {
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

  const renderRecommendations = (advice) => {
    return advice.map((recommendation, index) => (
      <li key={index} className="recommendation-item">{recommendation}</li>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WHO-5 Well-being Index</h1>
        {!showResult ? (
          <div className="question-container">
            <p className="instruction">Rate Your Well-being Over the Past Two Weeks:</p>
            {questions.map((question, index) => (
              <div key={index} className="question">
                <p className="question-text">{question}</p>
                <div className="answers">
                  {[0, 1, 2, 3, 4, 5].map((value) => (
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
            <div className="explanation">
            <p style={{ color: 'green', fontSize: '150%', fontWeight: 'bolder' }}>
            {getExplanation(calculateScore()).message}
            </p>
               <hr/>
              <p className="recommendation-list">
                {renderRecommendations(getExplanation(calculateScore()).advice)}
              </p>
            </div>
            <button className="restart-button" onClick={restartQuiz}>Restart Quiz</button>
          </div>
        )}
      </header>
      <footer className="footer">
        <p>&copy; 2024 moabmo</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/abiud.mongare" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
          </a>
          <a href="https://www.github.com/moabmo" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
