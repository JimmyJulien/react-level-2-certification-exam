import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it } from "vitest";
import NotFoundPage from "./not-found-page.component";

describe("NotFoundPage", () => {
  it("SHOULD render", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
  });
});
