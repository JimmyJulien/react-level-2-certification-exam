import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { UiForm, UiFormField } from "./ui-form.component";

describe("UiForm", () => {
  it("SHOULD render", () => {
    render(
      <UiForm>
        <UiFormField>Test</UiFormField>
      </UiForm>,
    );
  });
});
