import { QuizQuestionModel } from "../../domain/models/quiz.models";
import UiContainer from "../ui/ui-container.component";

type QuizQuestionProps = {
  isQuizComplete?: boolean;
  onPickAnswer?: (answer: string) => void;
  quizQuestion: QuizQuestionModel;
};

export default function QuizQuestion({
  isQuizComplete = false,
  onPickAnswer,
  quizQuestion,
}: QuizQuestionProps) {
  function getQuizAnswerColor(
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

  // NOTE: dangerouslySetInnerHTML can be safely used here because
  // quiz has been sanitized with DOMPurify
  return (
    <UiContainer gap="0.5rem" testId="question">
      <p
        role="contentinfo"
        dangerouslySetInnerHTML={{ __html: quizQuestion.question }}
        style={{ marginBottom: "0.5rem" }}
      ></p>
      <UiContainer direction="row">
        {quizQuestion.answers.map((answer: string) => (
          <button
            dangerouslySetInnerHTML={{ __html: answer }}
            key={answer}
            onClick={() => {
              if (!isQuizComplete && onPickAnswer) {
                onPickAnswer(answer);
              }
            }}
            style={{
              backgroundColor: getQuizAnswerColor(
                quizQuestion,
                answer,
                isQuizComplete,
              ),
            }}
          ></button>
        ))}
      </UiContainer>
    </UiContainer>
  );
}
