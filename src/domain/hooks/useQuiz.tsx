import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../contexts/QuizContext";
import { QuizConfigModel, QuizQuestionModel } from "../models/quiz.models";
import useGetQuestions from "./useGetQuestions";

export default function useQuiz() {
  const [quiz, setQuiz] = useContext(QuizContext);

  const [quizConfig, setQuizConfig] = useState<QuizConfigModel | null>(null);

  const {
    data: quizQuestions,
    isPending: isQuizLoading,
    isError: isQuizError,
  } = useGetQuestions(quizConfig);

  useEffect(() => {
    if (quizConfig && quizQuestions) {
      setQuiz({
        config: quizConfig,
        questions: quizQuestions,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizQuestions, setQuiz]);

  function resetQuiz() {
    setQuiz(null);
  }

  function answerQuizQuestion(
    quizQuestion: QuizQuestionModel,
    userAnswer: QuizQuestionModel["userAnswer"],
  ) {
    if (!quiz) return;

    const newQuizQuestions: QuizQuestionModel[] = quiz.questions.map(
      (actualQuizQuestion) => {
        if (actualQuizQuestion.question === quizQuestion.question) {
          return { ...actualQuizQuestion, userAnswer };
        }
        return actualQuizQuestion;
      },
    );

    setQuiz({ ...quiz, questions: newQuizQuestions });
  }

  return {
    answerQuizQuestion,
    isQuizError,
    isQuizLoading,
    quiz,
    setQuizConfig,
    resetQuiz,
  };
}
