import { PropsWithChildren } from "react";

export function UiForm({ children }: PropsWithChildren) {
  return (
    <form style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
      {children}
    </form>
  );
}

export function UiFormField({ children }: PropsWithChildren) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {children}
    </div>
  );
}
