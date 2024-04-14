import { styleSheet, css } from "./css";

const resolvedStyleSheet = styleSheet();

export const App = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: resolvedStyleSheet }}></style>
    <h1
      style={css({
        display: "flex",
        gap: "18px",
        on: ($) => [$("hover", { backgroundColor: "red" })],
      })}
    >
      Hello world <span>t</span>
    </h1>
  </>
);
