import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import UiLoader from "./UiLoader";

describe("UiLoader", () => {
  it("SHOULD render", () => {
    render(<UiLoader />);
  });
});
