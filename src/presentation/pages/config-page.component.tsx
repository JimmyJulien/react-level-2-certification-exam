import { useConfigPage } from "../../domain/hooks/use-config-page.hook";
import QuizConfigForm from "../components/quiz-config-form.component";
import UiError from "../ui/ui-error.component";
import UiLoader from "../ui/ui-loader.component";
import { UiPage, UiPageTitle } from "../ui/ui-page.component";

export default function ConfigPage() {
  const { state, defineConfig } = useConfigPage();

  function getContent() {
    if (
      state.categoriesError ||
      state.difficultiesError ||
      state.quizQuestionsError
    ) {
      return <UiError />;
    }

    if (state.areCategoriesPending || state.areDifficultiesPending) {
      return <UiLoader />;
    }

    return (
      <QuizConfigForm
        categories={state.categories}
        difficulties={state.difficulties}
        disabled={
          state.areCategoriesPending ||
          state.areDifficultiesPending ||
          state.areQuizQuestionsPending
        }
        onSubmit={defineConfig}
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
