import { describe, expect, it, vi } from "vitest";
import { ListUtils } from "./ListUtils";

describe("ListUtils", () => {
  it("SHOULD shuffle the given list", () => {
    // GIVEN
    const listToShuffle: string[] = ["a", "b", "c"];

    let factor = 3;

    vi.spyOn(Math, "random").mockImplementation(() => {
      factor--;
      return 0.1 * factor;
    });

    // WHEN
    const shuffledList = ListUtils.shuffle(listToShuffle);

    // THEN
    expect(shuffledList.length).toBe(listToShuffle.length);
    expect(shuffledList[0]).toBe("c");
    expect(shuffledList[1]).toBe("b");
    expect(shuffledList[2]).toBe("a");
  });
});
