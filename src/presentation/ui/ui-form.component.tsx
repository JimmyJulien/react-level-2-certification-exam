import { HTMLAttributes } from "react";

export function UiForm(props: Omit<HTMLAttributes<HTMLFormElement>, "style">) {
  return (
    <form
      {...props}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      {props.children}
    </form>
  );
}

export function UiFormField(
  props: Omit<HTMLAttributes<HTMLDivElement>, "style">,
) {
  return (
    <div
      {...props}
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      {props.children}
    </div>
  );
}
