import { useNavigate } from "react-router";
import useQuiz from "../../domain/hooks/useQuiz";
import { QuizQuestionModel } from "../../domain/models/quiz.models";
import { QuizUtils } from "../../domain/utils/QuizUtils";
import ROUTES from "../../infrastructure/routing/routes";
import QuizQuestion from "../components/QuizQuestion";
import UiContainer from "../ui/UiContainer";
import { UiPage, UiPageTitle } from "../ui/UiPage";

export default function ResultPage() {
  const navigate = useNavigate();

  const { quiz, resetQuiz } = useQuiz();

  const score: number =
    quiz?.questions.filter(
      (question) => question.correctAnswer === question.userAnswer,
    ).length ?? 0;

  function handleCreateNewQuiz() {
    navigate(`/${ROUTES.CONFIG}`);
    resetQuiz();
  }

  return (
    <UiPage>
      <UiPageTitle>RESULTS</UiPageTitle>
      <UiContainer gap="0.5rem" data-testid="question">
        {quiz?.questions.map((quizQuestion: QuizQuestionModel) => (
          <QuizQuestion
            isQuizComplete
            key={quizQuestion.question}
            quizQuestion={quizQuestion}
          />
        ))}

        <p
          role="presentation"
          style={{
            backgroundColor: QuizUtils.getScoreColor(score),
            textAlign: "center",
          }}
        >
          You scored {score} out of {quiz?.questions.length}
        </p>

        <button onClick={handleCreateNewQuiz}>Create a new quiz</button>
      </UiContainer>
    </UiPage>
  );
}
