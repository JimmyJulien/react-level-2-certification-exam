import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  QuizCategoryModel,
  QuizConfigModel,
  QuizDifficultyModel,
} from "../../domain/models/quiz.models";
import QuizConfigForm from "./QuizConfigForm";

function setup() {
  const mockedOnSubmit = vi.fn();

  const props = {
    categories: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
      { label: "C", value: "c" },
    ] satisfies QuizCategoryModel[],
    difficulties: [
      { label: "A", value: "easy" },
      { label: "B", value: "medium" },
      { label: "C", value: "hard" },
    ] satisfies QuizDifficultyModel[],
    onSubmit: mockedOnSubmit,
  };

  const { findByRole } = render(<QuizConfigForm {...props} />);

  async function getCategorySelect() {
    return findByRole("combobox", { name: "Category" });
  }

  async function selectCategory(category: string) {
    const categorySelect = await getCategorySelect();
    return userEvent.selectOptions(categorySelect, category);
  }

  async function getDifficultySelect() {
    return findByRole("combobox", { name: "Difficulty" });
  }

  async function selectDifficulty(difficulty: string) {
    const categorySelect = await getDifficultySelect();
    return userEvent.selectOptions(categorySelect, difficulty);
  }

  async function getCreateButton() {
    return findByRole("button", { name: "Create" });
  }

  async function clickCreateButton() {
    const createButton = await getCreateButton();
    return userEvent.click(createButton);
  }

  return {
    clickCreateButton,
    mockedOnSubmit,
    selectCategory,
    selectDifficulty,
  };
}

describe("QuizConfigForm", () => {
  it("SHOULD submit quiz config WHEN Create button is clicked", async () => {
    // GIVEN
    const {
      clickCreateButton,
      selectCategory,
      selectDifficulty,
      mockedOnSubmit,
    } = setup();

    const expectedConfig: QuizConfigModel = {
      category: { label: "A", value: "a" },
      difficulty: { label: "A", value: "easy" },
    };

    // WHEN
    await selectCategory("a");
    await selectDifficulty("easy");
    await clickCreateButton();

    // THEN
    await waitFor(() => {
      expect(mockedOnSubmit).toHaveBeenCalledExactlyOnceWith(expectedConfig);
    });
  });
});
