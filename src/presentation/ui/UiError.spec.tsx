import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UiError from "./UiError";

describe("UiError", () => {
  it("SHOULD show the error message", async () => {
    // GIVEN
    const { findByText } = render(<UiError />);

    // THEN
    const error = await findByText(
      "❌ An error occurred, please reload the page",
    );
    expect(error).not.toBe(null);
  });
});
