import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { QuizFetchApi } from "../../infrastructure/api/QuizFetchApi";
import { QuizDifficultyModel } from "../models/quiz.models";
import useGetDifficulties from "./useGetDifficulties";

describe("useGetDifficulties", () => {
  it("SHOULD get difficulties", async () => {
    // GIVEN
    const expectedDifficulties: QuizDifficultyModel[] = [
      { label: "n1", value: "easy" },
      { label: "n2", value: "medium" },
      { label: "n3", value: "hard" },
    ];

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    vi.spyOn(QuizFetchApi, "getDifficulties").mockReturnValueOnce(
      Promise.resolve(expectedDifficulties),
    );

    // WHEN
    const { result } = renderHook(() => useGetDifficulties(), { wrapper });

    // THEN
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(expectedDifficulties);
    });
  });
});
