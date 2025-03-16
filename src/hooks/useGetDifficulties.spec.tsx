import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useGetDifficulties from "./useGetDifficulties";

describe("useGetDifficulties", () => {
  it("SHOULD get difficulties", () => {
    // GIVEN
    const expectedDifficulties = {
      data: [
        { label: "Easy", value: "easy" },
        { label: "Medium", value: "medium" },
        { label: "Hard", value: "hard" },
      ],
    };

    // WHEN
    const { result } = renderHook(() => useGetDifficulties());

    // THEN
    expect(result.current).toStrictEqual(expectedDifficulties);
  });
});
