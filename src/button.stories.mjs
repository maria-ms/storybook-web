import "@maria-ms/components-web/button";
import { fn } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022001-53&m=dev";

const icon = (path) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("fill", "none");
  svg.setAttribute("height", "var(--ds-button-icon-size)");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "var(--ds-button-icon-size)");
  svg.innerHTML = path;

  return svg;
};

const searchIcon = () =>
  icon('<circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" />');

const arrowRightIcon = () => icon('<path d="M5 12h14M13 6l6 6-6 6" />');

const button = ({
  disabled = false,
  label = "Save changes",
  leadingIcon = false,
  onClick,
  size = "medium",
  trailingIcon = false,
  variant = "primary",
} = {}) => {
  const component = document.createElement("ds-button");
  const control = document.createElement("button");

  component.setAttribute("size", size);
  component.setAttribute("variant", variant);
  control.disabled = disabled;
  control.type = "button";
  if (onClick) control.addEventListener("click", onClick);
  if (leadingIcon) control.append(searchIcon());

  const content = document.createElement("span");
  content.textContent = label;
  control.append(content);

  if (trailingIcon) control.append(arrowRightIcon());
  component.append(control);

  return component;
};

const group = (items) => {
  const element = document.createElement("div");

  Object.assign(element.style, {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--ds-semantic-spacing-md)",
  });
  element.append(...items.map(button));

  return element;
};

const figma = { type: "figma", url: figmaUrl };

export default {
  title: "Components/Button",
  component: "ds-button",
  args: {
    disabled: false,
    label: "Save changes",
    leadingIcon: false,
    size: "medium",
    trailingIcon: false,
    variant: "primary",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      table: { category: "Appearance" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    disabled: { control: "boolean", table: { category: "Native state" } },
    label: { control: "text", table: { category: "Content" } },
    leadingIcon: { control: "boolean", table: { category: "Content" } },
    trailingIcon: { control: "boolean", table: { category: "Content" } },
    onClick: { action: "click", control: false, table: { category: "Events" } },
  },
  parameters: { design: figma },
  render: button,
};

export const Playground = {};

export const Variants = {
  render: () =>
    group([
      { variant: "primary" },
      { variant: "secondary" },
      { variant: "outline" },
      { variant: "ghost" },
      { variant: "destructive" },
    ]),
  parameters: { controls: { disable: true }, design: figma },
};

export const FigmaExamples = {
  render: () =>
    group([
      { label: "Save changes", variant: "primary" },
      { label: "Delete", variant: "destructive" },
      { label: "Search", leadingIcon: true, variant: "outline" },
      { label: "Continue", trailingIcon: true, variant: "primary" },
      {
        label: "Send report to all selected team members",
        variant: "secondary",
      },
    ]),
  parameters: { controls: { disable: true }, design: figma },
};

export const Disabled = {
  args: { disabled: true },
};
