import './App.css';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API';
import { useState } from 'react';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [error, setError] = useState(false);

  console.log(questions);

  const startQuiz = async () => {
    try {
      setLoading(true);
      setGameOver(false);
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswer([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Quiz TypeScript</h1>
      </header>
      <main>
        {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
          <button className="start-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        ) : null}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p className="loading">Loading Questions ...</p>}
        {error && 'Ups... something went wrong!'}
        {!loading && !gameOver && (
          <QuestionCard
            questionNo={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswer.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next-btn" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </main>
    </div>
  );
};

export default App;
