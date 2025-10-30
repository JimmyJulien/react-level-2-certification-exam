import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import UiLoader from "./ui-loader.component";

describe("UiLoader", () => {
  it("SHOULD render", () => {
    render(<UiLoader />);
  });
});
