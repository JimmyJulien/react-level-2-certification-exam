import { PropsWithChildren } from "react";

type UiContainerProps = PropsWithChildren & {
  direction?: "row" | "column";
  gap?: "0.5rem" | "1rem" | "2rem";
  testId?: string;
};

export default function UiContainer({
  children,
  direction = "column",
  gap = "1rem",
  testId = "",
}: UiContainerProps) {
  return (
    <div
      data-testid={testId}
      style={{ display: "flex", flexDirection: direction, gap }}
    >
      {children}
    </div>
  );
}
