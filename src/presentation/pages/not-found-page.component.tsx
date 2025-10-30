import { Link } from "react-router";
import UiContainer from "../ui/ui-container.component";

export default function NotFoundPage() {
  return (
    <UiContainer>
      <p style={{ fontSize: "2rem", textAlign: "center" }}>❌ Page Not found</p>

      <Link style={{ fontSize: "1.5rem", textAlign: "center" }} to={"/"}>
        🏠 Back to home page
      </Link>
    </UiContainer>
  );
}
