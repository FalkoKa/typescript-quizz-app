import './App.css';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions, Difficulty } from './API';
import { useState } from 'react';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, stLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {};
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
  const nextQuestion = () => {};

  return (
    <div className="App">
      <header>
        <h1>Quiz TypeScript</h1>
      </header>
      <main>
        <button className="start-btn" onClick={startQuiz}>
          Start Quiz
        </button>
        <p className="score">Score:</p>
        <p className="loading">Loading Questions ...</p>
        {/* <QuestionCard
          questionNo={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        /> */}
        <button className="next-btn" onClick={nextQuestion}>
          Next Question
        </button>
        <button
          onClick={() =>
            fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY).then((res) => {
              console.log(res);
            })
          }
        >
          click
        </button>
      </main>
    </div>
  );
};

export default App;
