import { ChangeEvent, MouseEvent, useState } from "react";
import { QuizConfigModel } from "../models/quiz.models";
import { SelectOptionModel } from "../models/select.models";
import { UiForm, UiFormField } from "../ui/UiForm";

type QuizConfigFormProps = {
  categories: SelectOptionModel[];
  difficulties: SelectOptionModel[];
  disabled?: boolean;
  initialCategory?: string;
  initialDifficulty?: string;
  onSubmit?: (quizConfig: QuizConfigModel) => void;
};

export default function QuizConfigForm({
  categories,
  difficulties,
  disabled = false,
  initialCategory = "",
  initialDifficulty = "",
  onSubmit,
}: QuizConfigFormProps) {
  const [categoryId, setCategoryId] =
    useState<SelectOptionModel["value"]>(initialCategory);

  const [difficultyId, setDifficultyId] =
    useState<SelectOptionModel["value"]>(initialDifficulty);

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryId(event.currentTarget.value);
  }

  function handleDifficultyChange(event: ChangeEvent<HTMLSelectElement>) {
    setDifficultyId(event.currentTarget.value);
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // Avoid form submission
    event.preventDefault();

    if (!disabled && onSubmit) {
      const category: SelectOptionModel = categories.find(
        (category) => category.value === categoryId,
      )!;

      const difficulty: SelectOptionModel = difficulties.find(
        (difficulty) => difficulty.value === difficultyId,
      )!;

      onSubmit({ category, difficulty });
    }
  }

  return (
    <UiForm>
      <UiFormField>
        <label htmlFor="categorySelect">Category</label>
        <select
          disabled={disabled}
          id="categorySelect"
          name="category"
          onChange={handleCategoryChange}
          value={categoryId}
        >
          <option value={""}>Select a category</option>
          {categories.map((category: SelectOptionModel) => (
            <option key={category.label} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </UiFormField>
      <UiFormField>
        <label htmlFor="difficultySelect">Difficulty</label>
        <select
          disabled={disabled}
          id="difficultySelect"
          name="difficulty"
          onChange={handleDifficultyChange}
          value={difficultyId}
        >
          <option value={""}>Select a difficulty</option>
          {difficulties.map((difficulty: SelectOptionModel) => (
            <option key={difficulty.label} value={difficulty.value}>
              {difficulty.label}
            </option>
          ))}
        </select>
      </UiFormField>
      <button
        disabled={disabled || !categoryId || !difficultyId}
        id="createBtn"
        onClick={handleClick}
      >
        Create
      </button>
    </UiForm>
  );
}
