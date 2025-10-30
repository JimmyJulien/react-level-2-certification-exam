import { useQuizPage } from "../../domain/hooks/use-quiz-page.hook";
import QuizConfigForm from "../components/quiz-config-form.component";
import QuizQuestion from "../components/quiz-question.component";
import UiContainer from "../ui/ui-container.component";
import { UiPage, UiPageTitle } from "../ui/ui-page.component";

export default function QuizPage() {
  const {
    answerQuestion,
    categories,
    difficulties,
    isQuizComplete,
    showResults,
    state,
  } = useQuizPage();

  return (
    <UiPage>
      <UiPageTitle>QUIZ MAKER</UiPageTitle>

      <QuizConfigForm
        categories={categories}
        difficulties={difficulties}
        disabled
        initialConfig={state.quizConfig}
      />

      <UiContainer>
        {state.quizQuestions.map((quizQuestion) => (
          <QuizQuestion
            key={quizQuestion.question}
            onPickAnswer={(answer) => answerQuestion(quizQuestion, answer)}
            quizQuestion={quizQuestion}
          />
        ))}
      </UiContainer>

      {isQuizComplete && (
        <UiContainer>
          <button style={{ marginTop: "1.5rem" }} onClick={showResults}>
            Submit
          </button>
        </UiContainer>
      )}
    </UiPage>
  );
}
