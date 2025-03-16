import { UseQueryResult } from "@tanstack/react-query";
import "@testing-library/dom";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SelectOptionModel } from "../models/select.models";
import ConfigPage from "./ConfigPage";
const mockedNavigate = vi.fn();

vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock(import("../hooks/useGetCategories"), () => {
  return {
    __esModule: true,
    default: () =>
      ({
        data: [
          { label: "category 1", value: "value1" },
          { label: "category 2", value: "value2" },
          { label: "category 3", value: "value3" },
        ],
      }) as UseQueryResult<SelectOptionModel[]>,
  };
});

vi.mock(import("../hooks/useGetDifficulties"), () => {
  return {
    __esModule: true,
    default: () => ({
      data: [
        { label: "difficulty1", value: "value1" },
        { label: "difficulty2", value: "value2" },
        { label: "difficulty3", value: "value3" },
      ] as SelectOptionModel[],
    }),
  };
});

vi.mock(import("../hooks/useQuiz"), () => {
  return {
    __esModule: true,
    default: () => ({
      answerQuizQuestion: vi.fn(),
      isQuizError: false,
      isQuizLoading: false,
      quiz: null,
      setQuizConfig: vi.fn(),
      resetQuiz: vi.fn(),
    }),
  };
});

function setup() {
  const { findByRole } = render(<ConfigPage />);

  async function getTitle() {
    return findByRole("heading", { level: 1 });
  }

  return { getTitle };
}

describe("ConfigPage", () => {
  it("SHOULD have QUIZ MAKER as main title", async () => {
    // GIVEN / WHEN
    const { getTitle } = setup();

    // THEN
    const title = await getTitle();
    expect(title.textContent).toBe("QUIZ MAKER");
  });
});
