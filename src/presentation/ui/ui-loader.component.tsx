export default function UiLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        alignItems: "center",
        display: "flex",
        fontSize: "1.5rem",
        justifyContent: "center",
        minHeight: "4rem",
      }}
    >
      ⌛ Loading...
    </div>
  );
}
