import "@testing-library/dom";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfigPageStateModel } from "../../domain/hooks/use-config-page.hook";
import ConfigPage from "./config-page.component";

async function setup(partialState?: Partial<ConfigPageStateModel>) {
  const state: ConfigPageStateModel = {
    areCategoriesPending: false,
    areDifficultiesPending: false,
    areQuizQuestionsPending: false,
    categories: [],
    categoriesError: null,
    difficulties: [],
    difficultiesError: null,
    quizConfig: null,
    quizQuestions: [],
    quizQuestionsError: null,
    ...partialState,
  };

  const defineConfigSpy = vi.fn();

  vi.spyOn(
    await import("../../domain/hooks/use-config-page.hook"),
    "useConfigPage",
  ).mockReturnValue({
    defineConfig: defineConfigSpy,
    dispatch: vi.fn(),
    state,
  });

  const { findByRole } = render(<ConfigPage />);

  async function getTitle() {
    return findByRole("heading", { level: 1 });
  }

  async function getError() {
    return findByRole("alert");
  }

  async function getLoader() {
    return findByRole("status");
  }

  return { defineConfigSpy, getError, getLoader, getTitle };
}

describe("ConfigPage", () => {
  it("SHOULD have QUIZ MAKER as main title", async () => {
    // GIVEN / WHEN
    const { getTitle } = await setup();

    // THEN
    const title = await getTitle();
    expect(title.textContent).toBe("QUIZ MAKER");
  });

  it("SHOULD show an error WHEN categories can't be retrieved", async () => {
    // GIVEN / WHEN
    const { getError } = await setup({ categoriesError: new Error("error") });

    // THEN
    const error = await getError();
    expect(error.textContent).toMatch(/an error occurred/i);
  });

  it("SHOULD show an error WHEN difficulties can't be retrieved", async () => {
    // GIVEN / WHEN
    const { getError } = await setup({ difficultiesError: new Error("error") });

    // THEN
    const error = await getError();
    expect(error.textContent).toMatch(/an error occurred/i);
  });

  it("SHOULD show an error WHEN quiz can't be retrieved", async () => {
    // GIVEN / WHEN
    const { getError } = await setup({
      quizQuestionsError: new Error("error"),
    });

    // THEN
    const error = await getError();
    expect(error.textContent).toMatch(/an error occurred/i);
  });

  it("SHOULD show a loader WHEN categories retrieving is pending", async () => {
    // GIVEN / WHEN
    const { getLoader } = await setup({ areCategoriesPending: true });

    // THEN
    const loader = await getLoader();
    expect(loader.textContent).toMatch(/loading/i);
  });

  it("SHOULD show a loader WHEN difficulties retrieving is pending", async () => {
    // GIVEN / WHEN
    const { getLoader } = await setup({ areDifficultiesPending: true });

    // THEN
    const loader = await getLoader();
    expect(loader.textContent).toMatch(/loading/i);
  });
});
