import { PropsWithChildren } from "react";

export function UiPage({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        margin: "1rem 8rem",
      }}
    >
      {children}
    </div>
  );
}

export function UiPageTitle({ children }: PropsWithChildren) {
  return <h1 style={{ textAlign: "center" }}>{children}</h1>;
}
