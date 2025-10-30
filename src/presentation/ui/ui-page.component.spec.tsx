import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { UiForm } from "./ui-form.component";
import { UiPage, UiPageTitle } from "./ui-page.component";

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
