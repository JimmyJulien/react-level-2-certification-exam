import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuizConfigModel } from "../models/quiz.models";
import { SelectOptionModel } from "../models/select.models";
import QuizConfigForm from "./QuizConfigForm";

function setup() {
  const mockedOnSubmit = vi.fn();

  const props = {
    categories: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
      { label: "C", value: "c" },
    ] satisfies SelectOptionModel[],
    difficulties: [
      { label: "A", value: "1" },
      { label: "B", value: "2" },
      { label: "C", value: "3" },
    ] satisfies SelectOptionModel[],
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
      difficulty: { label: "A", value: "1" },
    };

    // WHEN
    await selectCategory("a");
    await selectDifficulty("1");
    await clickCreateButton();

    // THEN
    await waitFor(() => {
      expect(mockedOnSubmit).toHaveBeenCalledExactlyOnceWith(expectedConfig);
    });
  });
});
