import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { QuizFetchApi } from "../../infrastructure/api/quiz-fetch.api";
import { QuizContext } from "../../presentation/contexts/quiz.context";
import ROUTES from "../../presentation/routing/routes";
import {
  QuizCategoryModel,
  QuizConfigModel,
  QuizDifficultyModel,
  QuizQuestionModel,
} from "../models/quiz.models";
import { useQuery } from "./use-query.hook";

export type ConfigPageStateModel = {
  categories: QuizCategoryModel[];
  areCategoriesPending: boolean;
  categoriesError: unknown;
  difficulties: QuizDifficultyModel[];
  areDifficultiesPending: boolean;
  difficultiesError: unknown;
  quizConfig: QuizConfigModel | null;
  quizQuestions: QuizQuestionModel[];
  areQuizQuestionsPending: boolean;
  quizQuestionsError: unknown;
};

export function useConfigPage() {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dispatch] = useContext(QuizContext);

  const [quizConfig, setQuizConfig] = useState<QuizConfigModel | null>(null);

  const {
    data: categories,
    error: categoriesError,
    pending: areCategoriesPending,
  } = useQuery<QuizCategoryModel[]>({
    queryFn: QuizFetchApi.getCategories,
  });

  const {
    data: difficulties,
    error: difficultiesError,
    pending: areDifficultiesPending,
  } = useQuery<QuizDifficultyModel[]>({
    queryFn: QuizFetchApi.getDifficulties,
  });

  const {
    data: quizQuestions,
    error: quizQuestionsError,
    pending: areQuizQuestionsPending,
  } = useQuery<QuizQuestionModel[]>({
    queryFn: () => QuizFetchApi.getQuestions(quizConfig!),
    queryParams: quizConfig,
    enabled: !!quizConfig,
  });

  const state: ConfigPageStateModel = {
    categories: categories ?? [],
    categoriesError,
    areCategoriesPending,
    difficulties: difficulties ?? [],
    difficultiesError,
    areDifficultiesPending,
    quizConfig: quizConfig,
    quizQuestions: quizQuestions ?? [],
    quizQuestionsError,
    areQuizQuestionsPending,
  };

  useEffect(() => {
    if (quizQuestions && quizQuestions.length > 0) {
      dispatch({ type: "QUIZ_QUESTIONS_DEFINED", payload: quizQuestions });
      navigate(`/${ROUTES.QUIZ}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizQuestions]);

  useEffect(() => {
    if (quizConfig) {
      dispatch({ type: "QUIZ_CONFIG_DEFINED", payload: quizConfig });
    }
  }, [dispatch, quizConfig]);

  function defineConfig(config: QuizConfigModel) {
    setQuizConfig(config);
  }

  return {
    defineConfig,
    dispatch,
    state,
  };
}
