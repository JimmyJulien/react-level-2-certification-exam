import { useResultPage } from "../../domain/hooks/use-result-page.hook";
import QuizQuestion from "../components/quiz-question.component";
import UiContainer from "../ui/ui-container.component";
import { UiPage, UiPageTitle } from "../ui/ui-page.component";

export default function ResultPage() {
  const { getQuizScoreColor, state, resetQuiz, score } = useResultPage();

  return (
    <UiPage>
      <UiPageTitle>RESULTS</UiPageTitle>
      <UiContainer gap="0.5rem" data-testid="question">
        {state.quizQuestions.map((quizQuestion) => (
          <QuizQuestion
            isQuizComplete
            key={quizQuestion.question}
            quizQuestion={quizQuestion}
          />
        ))}

        <p
          role="presentation"
          style={{
            backgroundColor: getQuizScoreColor(score),
            textAlign: "center",
          }}
        >
          You scored {score} out of {state.quizQuestions.length}
        </p>

        <button onClick={resetQuiz}>Create a new quiz</button>
      </UiContainer>
    </UiPage>
  );
}
