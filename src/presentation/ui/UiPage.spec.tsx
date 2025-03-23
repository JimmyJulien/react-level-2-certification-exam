import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { UiForm } from "./UiForm";
import { UiPage, UiPageTitle } from "./UiPage";

describe("UiPage", () => {
  it("SHOULD render", () => {
    render(
      <UiForm>
        <UiPage>
          <UiPageTitle>Test</UiPageTitle>
        </UiPage>
      </UiForm>,
    );
  });
});
