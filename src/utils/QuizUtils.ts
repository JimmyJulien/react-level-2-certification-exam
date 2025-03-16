import DOMPurify from "dompurify";
import { QuizQuestionModel } from "../models/quiz.models";

function sanitizeQuiz(quiz: QuizQuestionModel[]): QuizQuestionModel[] {
  return quiz.map((quizQuestion) => {
    const sanitizedAnswers: QuizQuestionModel["answers"] =
      quizQuestion.answers.map((answer) => DOMPurify.sanitize(answer));

    const sanitizedCorrectAnswer: QuizQuestionModel["correctAnswer"] =
      DOMPurify.sanitize(quizQuestion.correctAnswer);

    const sanitizedQuestion: QuizQuestionModel["question"] = DOMPurify.sanitize(
      quizQuestion.question,
    );

    return {
      answers: sanitizedAnswers,
      correctAnswer: sanitizedCorrectAnswer,
      question: sanitizedQuestion,
    };
  });
}

function getAnswerColor(
  quizQuestion: QuizQuestionModel,
  answer: string,
  isQuizCompleted: boolean,
): "buttonface" | "lightgreen" | "red" {
  const isUserAnswer = !isQuizCompleted && answer === quizQuestion.userAnswer;

  if (isUserAnswer) {
    return "lightgreen";
  }

  const isUserCorrect =
    isQuizCompleted &&
    answer === quizQuestion.correctAnswer &&
    answer === quizQuestion.userAnswer;

  if (isUserCorrect) {
    return "lightgreen";
  }

  const isUserIncorrect =
    isQuizCompleted &&
    answer === quizQuestion.correctAnswer &&
    answer !== quizQuestion.userAnswer;

  if (isUserIncorrect) {
    return "red";
  }

  return "buttonface";
}

function getScoreColor(
  score: number,
): "lightgreen" | "red" | "transparent" | "yellow" {
  if (score === 0 || score === 1) {
    return "red";
  }

  if (score === 2 || score === 3) {
    return "yellow";
  }

  if (score === 4 || score === 5) {
    return "lightgreen";
  }

  return "transparent";
}

export const QuizUtils = Object.freeze({
  getAnswerColor,
  getScoreColor,
  sanitizeQuiz,
});
