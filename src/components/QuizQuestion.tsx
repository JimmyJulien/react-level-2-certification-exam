import { QuizQuestionModel } from "../models/quiz.models";
import UiContainer from "../ui/UiContainer";
import { QuizUtils } from "../utils/QuizUtils";

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
              backgroundColor: QuizUtils.getAnswerColor(
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
