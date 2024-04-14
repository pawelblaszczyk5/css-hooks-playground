import { buildHooksSystem, Rule, CssFn } from "@css-hooks/core";
import { CSSProperties } from "react";

const unitlessNumbers = new Set([
  "animationIterationCount",
  "aspectRatio",
  "borderImageOutset",
  "borderImageSlice",
  "borderImageWidth",
  "boxFlex",
  "boxFlexGroup",
  "boxOrdinalGroup",
  "columnCount",
  "columns",
  "flex",
  "flexGrow",
  "flexPositive",
  "flexShrink",
  "flexNegative",
  "flexOrder",
  "gridArea",
  "gridRow",
  "gridRowEnd",
  "gridRowSpan",
  "gridRowStart",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnSpan",
  "gridColumnStart",
  "fontWeight",
  "lineClamp",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "scale",
  "tabSize",
  "widows",
  "zIndex",
  "zoom",
  "fillOpacity", // SVG-related properties
  "floodOpacity",
  "stopOpacity",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "MozAnimationIterationCount", // Known Prefixed Properties
  "MozBoxFlex", // TODO: Remove these since they shouldn't be used in modern code
  "MozBoxFlexGroup",
  "MozLineClamp",
  "msAnimationIterationCount",
  "msFlex",
  "msZoom",
  "msFlexGrow",
  "msFlexNegative",
  "msFlexOrder",
  "msFlexPositive",
  "msFlexShrink",
  "msGridColumn",
  "msGridColumnSpan",
  "msGridRow",
  "msGridRowSpan",
  "WebkitAnimationIterationCount",
  "WebkitBoxFlex",
  "WebKitBoxFlexGroup",
  "WebkitBoxOrdinalGroup",
  "WebkitColumnCount",
  "WebkitColumns",
  "WebkitFlex",
  "WebkitFlexGrow",
  "WebkitFlexPositive",
  "WebkitFlexShrink",
  "WebkitLineClamp",
]);

const isUnitlessNumber = (name: string) => unitlessNumbers.has(name);

const stringifyDefaultProperties = (propertyName: string, value: unknown) => {
  switch (typeof value) {
    case "string":
      return value;
    case "number":
      return `${value}${isUnitlessNumber(propertyName) ? "" : "px"}`;
    default:
      return null;
  }
};

const stringifyValue = (propertyName: string, value: unknown) => {
  switch (propertyName) {
    case "backgroundColor":
      return "blue";
    default:
      return stringifyDefaultProperties(propertyName, value);
  }
};

interface CustomCSSProperties {
  display?: CSSProperties["display"];
  gap?: CSSProperties["display"];
  color?: "red" | "yellowgreen" | undefined;
  backgroundColor?: "red" | "yellowgreen" | undefined;
}

const createHooks = buildHooksSystem<CustomCSSProperties>(stringifyValue);

export const { styleSheet, css } = createHooks({
  hooks: {
    hover: "&:hover",
  },
  debug: true,
  hookNameToId: (value) => value,
});

type HookName = typeof css extends CssFn<infer T, any> ? T : never;

type Styles<Keys extends keyof CustomCSSProperties> = Rule<
  HookName,
  Pick<CustomCSSProperties, Keys>
>;
type StylesWithout<Keys extends keyof CustomCSSProperties> = Rule<
  HookName,
  Omit<CustomCSSProperties, Keys>
>;

const x: StylesWithout<"color"> = {
  backgroundColor: "red",
};

const y: Styles<"color"> = {
  color: "yellowgreen",
  on: ($) => [$("hover", {})],
};
