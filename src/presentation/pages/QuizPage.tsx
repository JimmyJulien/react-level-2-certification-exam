import { useNavigate, useSearchParams } from "react-router";
import useQuiz from "../../domain/hooks/useQuiz";
import {
  QuizCategoryModel,
  QuizDifficultyModel,
  QuizQuestionModel,
} from "../../domain/models/quiz.models";
import ROUTES from "../../infrastructure/routing/routes";
import QuizConfigForm from "../components/QuizConfigForm";
import QuizQuestion from "../components/QuizQuestion";
import UiContainer from "../ui/UiContainer";
import { UiPage, UiPageTitle } from "../ui/UiPage";

export default function QuizPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { answerQuizQuestion, quiz } = useQuiz();

  const isQuizComplete: boolean =
    quiz?.questions.every((question) => !!question.userAnswer) ?? false;

  const category: string = searchParams.get("category") ?? "";

  const difficulty: string = searchParams.get("difficulty") ?? "";

  const categories: QuizCategoryModel[] = quiz?.config
    ? [quiz.config.category]
    : [];

  const difficulties: QuizDifficultyModel[] = quiz?.config
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
        categories={categories}
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
