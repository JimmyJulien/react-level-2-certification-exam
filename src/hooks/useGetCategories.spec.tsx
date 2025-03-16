import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { CategoriesApi } from "../api/CategoriesApi";
import { ApiCategoriesModel } from "../models/api.models";
import { SelectOptionModel } from "../models/select.models";
import useGetCategories from "./useGetCategories";

describe("useGetCategories", () => {
  it("SHOULD get categories", async () => {
    // GIVEN
    const apiCategories: ApiCategoriesModel = {
      trivia_categories: [
        { id: 1, name: "n1" },
        { id: 2, name: "n2" },
        { id: 3, name: "n3" },
      ],
    };

    const expectedCategories: SelectOptionModel[] = [
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

    vi.spyOn(CategoriesApi, "getCategories").mockReturnValueOnce(
      Promise.resolve(apiCategories),
    );

    // WHEN
    const { result } = renderHook(() => useGetCategories(), { wrapper });

    // THEN
    await waitFor(() => {
      expect(result.current.data).toStrictEqual(expectedCategories);
    });
  });
});
