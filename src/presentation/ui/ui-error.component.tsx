export default function UiError() {
  return (
    <div
      role="alert"
      style={{
        alignItems: "center",
        display: "flex",
        fontSize: "1.5rem",
        justifyContent: "center",
        minHeight: "4rem",
      }}
    >
      ❌ An error occurred, please reload the page
    </div>
  );
}
