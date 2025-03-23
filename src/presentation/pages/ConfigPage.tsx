import { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router";
import useGetCategories from "../../domain/hooks/useGetCategories";
import useGetDifficulties from "../../domain/hooks/useGetDifficulties";
import useQuiz from "../../domain/hooks/useQuiz";
import { QuizConfigModel } from "../../domain/models/quiz.models";
import ROUTES from "../../infrastructure/routing/routes";
import QuizConfigForm from "../components/QuizConfigForm";
import UiError from "../ui/UiError";
import UiLoader from "../ui/UiLoader";
import { UiPage, UiPageTitle } from "../ui/UiPage";

export default function ConfigPage() {
  const navigate = useNavigate();

  const { isQuizError, quiz, setQuizConfig } = useQuiz();

  useEffect(() => {
    if (quiz?.config) {
      navigate({
        pathname: `/${ROUTES.QUIZ}`,
        search: createSearchParams({
          category: quiz.config.category.value,
          difficulty: quiz.config.difficulty.value,
        }).toString(),
      });
    }
  }, [navigate, quiz]);

  const {
    data: categories,
    isError: isCategoriesError,
    isPending: isCategoriesLoading,
  } = useGetCategories();

  const { data: difficulties } = useGetDifficulties();

  function handleSubmit(config: QuizConfigModel) {
    setQuizConfig(config);
  }

  function getContent() {
    if (isCategoriesError || isQuizError) {
      return <UiError />;
    }

    if (isCategoriesLoading) {
      return <UiLoader />;
    }

    return (
      <QuizConfigForm
        categories={categories ?? []}
        difficulties={difficulties ?? []}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <UiPage>
      <UiPageTitle>QUIZ MAKER</UiPageTitle>
      {getContent()}
    </UiPage>
  );
}
