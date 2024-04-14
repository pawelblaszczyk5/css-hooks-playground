import { createHooks } from "@css-hooks/react";

const { styleSheet, css } = createHooks({
  hooks: {
    "&:active": "&:active",
  },
  debug: import.meta.env.DEV,
});

const resolvedStyleSheet = styleSheet();

export const App = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: resolvedStyleSheet }}></style>
    <h1 style={css({ display: "flex" })}>Hello world</h1>
  </>
);
