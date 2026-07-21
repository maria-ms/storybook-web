import "@maria-ms/components-web/button";
import { fn } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022001-52&m=dev";

const icon = (path, strokeWidth = "2") => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("fill", "none");
  svg.setAttribute("height", "var(--ds-button-icon-size)");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("stroke-width", strokeWidth);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "var(--ds-button-icon-size)");
  svg.innerHTML = path;

  return svg;
};

const searchIcon = () =>
  icon(
    '<path d="M21 21L16.7 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />',
    "1.5",
  );

const arrowUpRightIcon = () =>
  icon('<path d="M17 17V7H7M17 7L7 17" />', "1.5");

const button = ({
  disabled = false,
  label = "Button",
  leadingIcon = false,
  onClick,
  size = "small",
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

  if (trailingIcon) control.append(arrowUpRightIcon());
  component.append(control);

  return component;
};

const figma = { type: "figma", url: figmaUrl };

export default {
  title: "Components/Button",
  component: "ds-button",
  args: {
    disabled: false,
    label: "Button",
    leadingIcon: false,
    size: "small",
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
    label: {
      control: "text",
      description: "Story fixture mapped to text inside the inner native button; not a ds-button attribute.",
      table: { category: "Story fixture" },
    },
    leadingIcon: {
      control: "boolean",
      description: "Story fixture mapped to the first decorative child of the inner native button; not a ds-button attribute.",
      table: { category: "Story fixture" },
    },
    trailingIcon: {
      control: "boolean",
      description: "Story fixture mapped to the last decorative child of the inner native button; not a ds-button attribute.",
      table: { category: "Story fixture" },
    },
    onClick: { action: "click", control: false, table: { category: "Events" } },
  },
  parameters: { design: figma },
  render: button,
};

export const Playground = {};
