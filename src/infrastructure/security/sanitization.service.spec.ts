import { describe, expect, it } from "vitest";
import { QuizQuestionModel } from "../../domain/models/quiz.models";
import { SanitizationService } from "./sanitization.service";

// vi.mock("dompurify", () => {
//   return {
//     __esModule: true,
//     default: {
//       sanitize: vi.fn(() => "ok"),
//     },
//   };
// });

describe("SanitizationService", () => {
  describe("sanitize", () => {
    it("SHOULD sanitize the given string", () => {
      // GIVEN
      const stringToSanitize: string =
        "&quot;a&quot;<script>alert('pwned')</script>";

      // WHEN
      const sanitizedString: string =
        SanitizationService.sanitize(stringToSanitize);

      // THEN
      expect(sanitizedString).toBe('"a"');
    });

    it("SHOULD sanitize the given string array", () => {
      // GIVEN
      const stringArrayToSanitize: string[] = [
        "&quot;a&quot;<script>alert('pwned')</script>",
        "&quot;b&quot;<script>alert('pwned')</script>",
        "&quot;c&quot;<script>alert('pwned')</script>",
        "&quot;d&quot;<script>alert('pwned')</script>",
      ];

      // WHEN
      const sanitizedStringArray: string[] = SanitizationService.sanitize(
        stringArrayToSanitize,
      );

      // THEN
      expect(sanitizedStringArray).toStrictEqual(['"a"', '"b"', '"c"', '"d"']);
    });

    it("SHOULD sanitize the given object", () => {
      // GIVEN
      const objectToSanitize: QuizQuestionModel = {
        answers: [
          "&#039;a&#039;<script>alert('pwned')</script>",
          "&#039;b&#039;<script>alert('pwned')</script>",
          "&#039;c&#039;<script>alert('pwned')</script>",
          "&#039;d&#039;<script>alert('pwned')</script>",
        ],
        question: "&#039;q&#039;<script>alert('pwned')</script>",
        correctAnswer: "&#039;a&#039;<script>alert('pwned')</script>",
      };

      // WHEN
      const sanitizedObject: QuizQuestionModel =
        SanitizationService.sanitize(objectToSanitize);

      // THEN
      expect(sanitizedObject).toStrictEqual({
        answers: ["'a'", "'b'", "'c'", "'d'"],
        question: "'q'",
        correctAnswer: "'a'",
      });
    });

    it("SHOULD sanitize the given array of object", () => {
      // GIVEN
      const quizToSanitize: QuizQuestionModel[] = [
        {
          answers: [
            "&#039;a&#039;<script>alert('pwned')</script>",
            "&#039;b&#039;<script>alert('pwned')</script>",
            "&#039;c&#039;<script>alert('pwned')</script>",
            "&#039;d&#039;<script>alert('pwned')</script>",
          ],
          question: "&#039;q1&#039;<script>alert('pwned')</script>",
          correctAnswer: "&#039;a&#039;<script>alert('pwned')</script>",
        },
        {
          answers: [
            "&#039;e&#039;<script>alert('pwned')</script>",
            "&#039;f&#039;<script>alert('pwned')</script>",
            "&#039;g&#039;<script>alert('pwned')</script>",
            "&#039;h&#039;<script>alert('pwned')</script>",
          ],
          question: "&#039;q2&#039;<script>alert('pwned')</script>",
          correctAnswer: "&#039;e&#039;<script>alert('pwned')</script>",
        },
      ];

      const expectedSanitizedQuiz: QuizQuestionModel[] = [
        {
          answers: ["'a'", "'b'", "'c'", "'d'"],
          question: "'q1'",
          correctAnswer: "'a'",
        },
        {
          answers: ["'e'", "'f'", "'g'", "'h'"],
          question: "'q2'",
          correctAnswer: "'e'",
        },
      ];

      // WHEN
      const sanitizedQuiz: QuizQuestionModel[] =
        SanitizationService.sanitize(quizToSanitize);

      // THEN
      expect(sanitizedQuiz).toStrictEqual(expectedSanitizedQuiz);
    });

    it("SHOULD not sanitize null", () => {
      // GIVEN
      const stringToSanitize = null;

      // WHEN
      const sanitizedString = SanitizationService.sanitize(stringToSanitize);

      // THEN
      expect(sanitizedString).toBe(null);
    });

    it("SHOULD not sanitize undefined", () => {
      // GIVEN
      const stringToSanitize = undefined;

      // WHEN
      const sanitizedString = SanitizationService.sanitize(stringToSanitize);

      // THEN
      expect(sanitizedString).toBe(undefined);
    });
  });
});
