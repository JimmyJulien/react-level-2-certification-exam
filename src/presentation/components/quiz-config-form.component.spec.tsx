import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  QuizCategoryModel,
  QuizConfigModel,
  QuizDifficultyModel,
} from "../../domain/models/quiz.models";
import QuizConfigForm, {
  QuizConfigFormProps,
} from "./quiz-config-form.component";

const QUIZ_CATEGORIES: QuizCategoryModel[] = [
  { label: "A", value: "a" },
  { label: "B", value: "b" },
  { label: "C", value: "c" },
];

const QUIZ_DIFFICULTIES: QuizDifficultyModel[] = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

function setup(partialProps?: Partial<QuizConfigFormProps>) {
  const onSubmitSpy = vi.fn();

  const props: QuizConfigFormProps = {
    categories: QUIZ_CATEGORIES,
    difficulties: QUIZ_DIFFICULTIES,
    onSubmit: onSubmitSpy,
    ...partialProps,
  };

  const { findByRole } = render(<QuizConfigForm {...props} />);

  async function getCategorySelect() {
    return findByRole("combobox", {
      name: "Category",
    }) as Promise<HTMLSelectElement>;
  }

  async function selectCategory(category: string) {
    const categorySelect = await getCategorySelect();
    return userEvent.selectOptions(categorySelect, category);
  }

  async function getDifficultySelect() {
    return findByRole("combobox", {
      name: "Difficulty",
    }) as Promise<HTMLSelectElement>;
  }

  async function selectDifficulty(difficulty: string) {
    const categorySelect = await getDifficultySelect();
    return userEvent.selectOptions(categorySelect, difficulty);
  }

  async function getCreateButton() {
    return findByRole("button", {
      name: "Create",
    }) as Promise<HTMLButtonElement>;
  }

  async function clickCreateButton() {
    const createButton = await getCreateButton();
    return userEvent.click(createButton);
  }

  return {
    clickCreateButton,
    getCategorySelect,
    getCreateButton,
    getDifficultySelect,
    onSubmitSpy,
    selectCategory,
    selectDifficulty,
  };
}

describe("QuizConfigForm", () => {
  it("SHOULD init form with initial config", async () => {
    // GIVEN
    const { getCategorySelect, getDifficultySelect } = setup({
      initialConfig: {
        category: QUIZ_CATEGORIES[0],
        difficulty: QUIZ_DIFFICULTIES[0],
      },
    });

    // WHEN / THEN
    const categorySelect = await getCategorySelect();
    const difficultySelect = await getDifficultySelect();

    expect(categorySelect.value).toBe(QUIZ_CATEGORIES[0].value);
    expect(difficultySelect.value).toBe(QUIZ_DIFFICULTIES[0].value);
  });

  it("SHOULD submit quiz config WHEN Create button is clicked", async () => {
    // GIVEN
    const { clickCreateButton, selectCategory, selectDifficulty, onSubmitSpy } =
      setup();

    const expectedConfig: QuizConfigModel = {
      category: { label: "A", value: "a" },
      difficulty: { label: "Easy", value: "easy" },
    };

    // WHEN
    await selectCategory("a");
    await selectDifficulty("easy");
    await clickCreateButton();

    // THEN
    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledExactlyOnceWith(expectedConfig);
    });
  });
});
