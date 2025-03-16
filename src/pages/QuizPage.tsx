import { useNavigate, useSearchParams } from "react-router";
import QuizConfigForm from "../components/QuizConfigForm";
import QuizQuestion from "../components/QuizQuestion";
import useQuiz from "../hooks/useQuiz";
import { QuizQuestionModel } from "../models/quiz.models";
import { SelectOptionModel } from "../models/select.models";
import ROUTES from "../routing/routes";
import UiContainer from "../ui/UiContainer";
import { UiPage, UiPageTitle } from "../ui/UiPage";

export default function QuizPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { answerQuizQuestion, quiz } = useQuiz();

  const isQuizComplete: boolean =
    quiz?.questions.every(
      (question: QuizQuestionModel) => !!question.userAnswer,
    ) ?? false;

  const category: string = searchParams.get("category") ?? "";

  const difficulty: string = searchParams.get("difficulty") ?? "";

  const categories: SelectOptionModel[] = quiz?.config
    ? [quiz.config.category]
    : [];

  const difficulties: SelectOptionModel[] = quiz?.config
    ? [quiz.config.difficulty]
    : [];

  function handleUserAnswerClick(
    quizQuestion: QuizQuestionModel,
    answer: string,
  ) {
    answerQuizQuestion(quizQuestion, answer);
  }

  function handleSubmit() {
    navigate(`/${ROUTES.RESULT}`);
  }

  return (
    <UiPage>
      <UiPageTitle>QUIZ MAKER</UiPageTitle>
      <QuizConfigForm
        categories={categories ?? []}
        difficulties={difficulties}
        disabled
        initialCategory={category}
        initialDifficulty={difficulty}
      />

      <UiContainer>
        {quiz?.questions?.map((quizQuestion) => (
          <QuizQuestion
            key={quizQuestion.question}
            onPickAnswer={(answer) =>
              handleUserAnswerClick(quizQuestion, answer)
            }
            quizQuestion={quizQuestion}
          />
        ))}
      </UiContainer>

      {isQuizComplete && (
        <UiContainer>
          <button style={{ marginTop: "1.5rem" }} onClick={handleSubmit}>
            Submit
          </button>
        </UiContainer>
      )}
    </UiPage>
  );
}
