import "@maria-ms/components-web/button";
import { fn } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022001-52&m=dev";

const searchIcon = () => {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("fill", "none");
  icon.setAttribute("height", "var(--ds-button-icon-size)");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.setAttribute("stroke-width", "1.5");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("width", "var(--ds-button-icon-size)");
  icon.innerHTML =
    '<path d="M21 21L16.7 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />';

  return icon;
};

const iconButton = ({
  accessibleName = "Search",
  disabled = false,
  onClick,
  size = "small",
  variant = "primary",
} = {}) => {
  const component = document.createElement("ds-icon-button");
  const control = document.createElement("button");

  component.setAttribute("size", size);
  component.setAttribute("variant", variant);
  control.setAttribute("aria-label", accessibleName);
  control.disabled = disabled;
  control.type = "button";
  if (onClick) control.addEventListener("click", onClick);
  control.append(searchIcon());
  component.append(control);

  return component;
};

export default {
  title: "Components/Icon Button",
  component: "ds-icon-button",
  args: {
    accessibleName: "Search",
    disabled: false,
    size: "small",
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
    accessibleName: {
      control: "text",
      description: "Story fixture mapped to the inner native button's aria-label.",
      table: { category: "Story fixture" },
    },
    onClick: { action: "click", control: false, table: { category: "Events" } },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: iconButton,
};

export const Playground = {};
