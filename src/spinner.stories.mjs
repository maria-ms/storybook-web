import "@maria-ms/components-web/spinner";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022096-53&m=dev";

const spinner = ({ size = "small" } = {}) => {
  const component = document.createElement("ds-spinner");

  component.setAttribute("size", size);
  return component;
};

const group = (items) => {
  const element = document.createElement("div");

  Object.assign(element.style, {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--ds-semantic-spacing-lg)",
  });
  element.append(...items);

  return element;
};

/**
 * A Figma composition fixture, not a ds-button instance or a Button API.
 * It demonstrates the product-owned replacement used while an action is busy.
 */
const loadingAction = ({ label, tone }) => {
  const action = document.createElement("div");
  const content = document.createElement("span");

  content.textContent = label;

  Object.assign(action.style, {
    alignItems: "center",
    background:
      tone === "secondary"
        ? "var(--ds-component-button-color-background-secondary)"
        : "var(--ds-component-button-color-background-default)",
    border: "0",
    borderRadius: "var(--ds-semantic-radius-lg)",
    blockSize: "var(--ds-component-button-height-lg)",
    boxSizing: "border-box",
    color:
      tone === "secondary"
        ? "var(--ds-component-button-color-foreground-primary)"
        : "var(--ds-component-button-color-foreground-default)",
    display: "inline-flex",
    fontFamily: "var(--ds-primitive-font-family-body)",
    fontSize: "var(--ds-primitive-font-size-base)",
    fontWeight:
      "var(--ds-semantic-typography-body-base-font-weight-medium)",
    gap: "var(--ds-semantic-spacing-xs)",
    justifyContent: "center",
    letterSpacing: "var(--ds-semantic-typography-body-base-letter-spacing)",
    lineHeight: "var(--ds-primitive-font-line-height-base)",
    padding: "var(--ds-semantic-spacing-sm) var(--ds-semantic-spacing-md)",
    whiteSpace: "nowrap",
  });

  action.append(spinner({ size: "medium" }), content);

  return action;
};

const figma = { type: "figma", url: figmaUrl };

export default {
  title: "Components/Spinner",
  component: "ds-spinner",
  args: { size: "small" },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
  },
  parameters: { design: figma },
  render: spinner,
};

export const Playground = {};

export const Sizes = {
  render: () => group([spinner({ size: "small" }), spinner({ size: "medium" }), spinner({ size: "large" })]),
  parameters: { controls: { disable: true }, design: figma },
};

export const FigmaExamples = {
  render: () =>
    group([
      loadingAction({ label: "Loading...", tone: "primary" }),
      loadingAction({ label: "Processing payment...", tone: "secondary" }),
    ]),
  parameters: { controls: { disable: true }, design: figma },
};
