import { SelectOptionModel } from "../models/select.models";

export default function useGetDifficulties() {
  const difficulties: SelectOptionModel[] = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  return { data: difficulties };
}
