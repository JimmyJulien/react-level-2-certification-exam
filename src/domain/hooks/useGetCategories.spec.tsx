import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { QuizFetchApi } from "../../infrastructure/api/QuizFetchApi";
import { QuizCategoryModel } from "../models/quiz.models";
import useGetCategories from "./useGetCategories";

describe("useGetCategories", () => {
  it("SHOULD get categories", async () => {
    // GIVEN
    const expectedCategories: QuizCategoryModel[] = [
      { label: "n1", value: "1" },
      { label: "n2", value: "2" },
      { label: "n3", value: "3" },
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

    vi.spyOn(QuizFetchApi, "getCategories").mockReturnValueOnce(
      Promise.resolve(expectedCategories),
    );

    // WHEN
    const { result } = renderHook(() => useGetCategories(), { wrapper });

    // THEN
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(expectedCategories);
    });
  });
});
