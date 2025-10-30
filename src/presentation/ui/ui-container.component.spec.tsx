import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import UiContainer from "./ui-container.component";

describe("UiContainer", () => {
  it("SHOULD render", () => {
    render(<UiContainer>Test</UiContainer>);
  });
});
