import { describe, expect, it, vi } from "vitest";
import { QuizQuestionModel } from "../models/quiz.models";
import { QuizUtils } from "./QuizUtils";

vi.mock("dompurify", () => {
  return {
    __esModule: true,
    default: {
      sanitize: vi.fn(() => "ok"),
    },
  };
});

describe("QuizUtils", () => {
  describe("sanitize", () => {
    it("SHOULD sanitize the given quiz", () => {
      // GIVEN
      const quizToSanitize: QuizQuestionModel[] = [
        {
          answers: ["a", "b", "c"],
          correctAnswer: "a",
          question: "question 1 ?",
        },
        {
          answers: ["d", "e", "f"],
          correctAnswer: "f",
          question: "question 2 ?",
        },
      ];

      const expectedSanitizedQuiz: QuizQuestionModel[] = [
        { answers: ["ok", "ok", "ok"], correctAnswer: "ok", question: "ok" },
        { answers: ["ok", "ok", "ok"], correctAnswer: "ok", question: "ok" },
      ];

      // WHEN
      const sanitizedQuiz: QuizQuestionModel[] =
        QuizUtils.sanitizeQuiz(quizToSanitize);

      // THEN
      expect(sanitizedQuiz).toStrictEqual(expectedSanitizedQuiz);
    });
  });

  describe("getAnswerColor", () => {
    it("SHOULD return lightgreen WHEN quiz not completed and answer is user answer", () => {
      // GIVEN
      const quizQuestion: QuizQuestionModel = {
        answers: ["a", "b", "c", "d"],
        correctAnswer: "a",
        question: "q",
        userAnswer: "b",
      };
      const answer: string = "b";
      const isQuizCompleted: boolean = false;

      // WHEN
      const color = QuizUtils.getAnswerColor(
        quizQuestion,
        answer,
        isQuizCompleted,
      );

      // THEN
      expect(color).toBe("lightgreen");
    });

    it("SHOULD return lightgreen WHEN quiz completed, answer is user answer and answer is the correct one", () => {
      // GIVEN
      const quizQuestion: QuizQuestionModel = {
        answers: ["a", "b", "c", "d"],
        correctAnswer: "b",
        question: "q",
        userAnswer: "b",
      };
      const answer: string = "b";
      const isQuizCompleted: boolean = true;

      // WHEN
      const color = QuizUtils.getAnswerColor(
        quizQuestion,
        answer,
        isQuizCompleted,
      );

      // THEN
      expect(color).toBe("lightgreen");
    });

    it("SHOULD return red WHEN quiz completed, answer is user answer and answer is not the correct one", () => {
      // GIVEN
      const quizQuestion: QuizQuestionModel = {
        answers: ["a", "b", "c", "d"],
        correctAnswer: "d",
        question: "q",
        userAnswer: "b",
      };
      const answer: string = "d";
      const isQuizCompleted: boolean = true;

      // WHEN
      const color = QuizUtils.getAnswerColor(
        quizQuestion,
        answer,
        isQuizCompleted,
      );

      // THEN
      expect(color).toBe("red");
    });

    it("SHOULD return buttonface WHEN quiz not completed and answer is not user answer", () => {
      // GIVEN
      const quizQuestion: QuizQuestionModel = {
        answers: ["a", "b", "c", "d"],
        correctAnswer: "d",
        question: "q",
        userAnswer: "b",
      };
      const answer: string = "a";
      const isQuizCompleted: boolean = false;

      // WHEN
      const color = QuizUtils.getAnswerColor(
        quizQuestion,
        answer,
        isQuizCompleted,
      );

      // THEN
      expect(color).toBe("buttonface");
    });

    it("SHOULD return buttonface WHEN quiz is completed and answer is not the correct one", () => {
      // GIVEN
      const quizQuestion: QuizQuestionModel = {
        answers: ["a", "b", "c", "d"],
        correctAnswer: "d",
        question: "q",
        userAnswer: "b",
      };
      const answer: string = "a";
      const isQuizCompleted: boolean = true;

      // WHEN
      const color = QuizUtils.getAnswerColor(
        quizQuestion,
        answer,
        isQuizCompleted,
      );

      // THEN
      expect(color).toBe("buttonface");
    });
  });

  describe("getScoreColor", () => {
    it("SHOULD return lightgreen WHEN 5 correct answers", () => {
      // GIVEN
      const nbOfCorrectAnswers: number = 5;

      // WHEN
      const color = QuizUtils.getScoreColor(nbOfCorrectAnswers);

      // THEN
      expect(color).toBe("lightgreen");
    });

    it("SHOULD return lightgreen WHEN 4 correct answers", () => {
      // GIVEN
      const nbOfCorrectAnswers: number = 4;

      // WHEN
      const color = QuizUtils.getScoreColor(nbOfCorrectAnswers);

      // THEN
      expect(color).toBe("lightgreen");
    });

    it("SHOULD return yellow WHEN 3 correct answers", () => {
      // GIVEN
      const nbOfCorrectAnswers: number = 3;

      // WHEN
      const color = QuizUtils.getScoreColor(nbOfCorrectAnswers);

      // THEN
      expect(color).toBe("yellow");
    });

    it("SHOULD return yellow WHEN 2 correct answers", () => {
      // GIVEN
      const nbOfCorrectAnswers: number = 2;

      // WHEN
      const color = QuizUtils.getScoreColor(nbOfCorrectAnswers);

      // THEN
      expect(color).toBe("yellow");
    });

    it("SHOULD return red WHEN 1 correct answer", () => {
      // GIVEN
      const nbOfCorrectAnswers: number = 1;

      // WHEN
      const color = QuizUtils.getScoreColor(nbOfCorrectAnswers);

      // THEN
      expect(color).toBe("red");
    });

    it("SHOULD return red WHEN 0 correct answer", () => {
      // GIVEN
      const nbOfCorrectAnswers: number = 0;

      // WHEN
      const color = QuizUtils.getScoreColor(nbOfCorrectAnswers);

      // THEN
      expect(color).toBe("red");
    });

    it("SHOULD return transparent WHEN 42 correct answers", () => {
      // GIVEN
      const nbOfCorrectAnswers: number = 42;

      // WHEN
      const color = QuizUtils.getScoreColor(nbOfCorrectAnswers);

      // THEN
      expect(color).toBe("transparent");
    });
  });
});
