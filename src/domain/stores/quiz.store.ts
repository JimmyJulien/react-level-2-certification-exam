import { QuizConfigModel, QuizQuestionModel } from "../models/quiz.models";

export type QuizStateModel = {
  quizConfig: QuizConfigModel | null;
  quizQuestions: QuizQuestionModel[];
};

type QuizConfigDefinedEvent = {
  type: "QUIZ_CONFIG_DEFINED";
  payload: QuizConfigModel;
};

type QuizQuestionsDefinedEvent = {
  type: "QUIZ_QUESTIONS_DEFINED";
  payload: QuizQuestionModel[];
};

type QuizQuestionAnsweredEvent = {
  type: "QUIZ_QUESTION_ANSWERED";
  payload: {
    quizQuestion: QuizQuestionModel;
    userAnswer: QuizQuestionModel["correctAnswer"];
  };
};

type QuizResetEvent = {
  type: "QUIZ_RESET";
};

export type QuizStateEvent =
  | QuizConfigDefinedEvent
  | QuizQuestionAnsweredEvent
  | QuizQuestionsDefinedEvent
  | QuizResetEvent;

const INITIAL_QUIZ_STATE: QuizStateModel = {
  quizConfig: null,
  quizQuestions: [],
};

function quizStateReducer(
  state: QuizStateModel,
  event: QuizStateEvent,
): QuizStateModel {
  if (event.type === "QUIZ_CONFIG_DEFINED") {
    return {
      ...state,
      quizConfig: event.payload,
    };
  }

  if (event.type === "QUIZ_QUESTIONS_DEFINED") {
    return {
      ...state,
      quizQuestions: event.payload,
    };
  }

  if (event.type === "QUIZ_QUESTION_ANSWERED") {
    const newQuizQuestions: QuizQuestionModel[] = state.quizQuestions.map(
      (actualQuizQuestion) => {
        if (
          actualQuizQuestion.question === event.payload.quizQuestion.question
        ) {
          return {
            ...actualQuizQuestion,
            userAnswer: event.payload.userAnswer,
          };
        }
        return actualQuizQuestion;
      },
    );

    return {
      ...state,
      quizQuestions: newQuizQuestions,
    };
  }

  if (event.type === "QUIZ_RESET") {
    return {
      ...state,
      quizConfig: null,
      quizQuestions: [],
    };
  }

  return state;
}

export const QuizStore = Object.freeze({
  INITIAL_QUIZ_STATE,
  quizStateReducer,
});
