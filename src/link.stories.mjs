import "@maria-ms/components-web/link";
import { fn } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022819-6&m=dev";

const link = ({
  href = "#accessibility-guide",
  label = "Read the accessibility guide.",
  onClick,
  rel = "",
  size = "x-small",
  target = "_self",
  tone = "primary",
} = {}) => {
  const component = document.createElement("ds-link");
  const anchor = document.createElement("a");

  component.setAttribute("size", size);
  component.setAttribute("tone", tone);
  anchor.href = href;
  anchor.target = target;
  if (rel) anchor.rel = rel;
  if (onClick) anchor.addEventListener("click", onClick);
  anchor.textContent = label;
  component.append(anchor);

  return component;
};

export default {
  title: "Components/Link",
  component: "ds-link",
  args: {
    href: "#accessibility-guide",
    label: "Read the accessibility guide.",
    onClick: fn(),
    rel: "",
    size: "x-small",
    target: "_self",
    tone: "primary",
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "muted"],
      table: { category: "Appearance" },
    },
    size: {
      control: "select",
      options: ["x-small", "small", "medium", "large"],
      table: { category: "Appearance" },
    },
    label: {
      control: "text",
      description: "Story fixture mapped to real anchor text and its accessible name; not a ds-link attribute.",
      table: { category: "Story fixture" },
    },
    href: {
      control: "text",
      description: "Native anchor href. It is not a ds-link attribute.",
      table: { category: "Native anchor" },
    },
    target: {
      control: "select",
      options: ["_self", "_blank", "_parent", "_top"],
      description: "Native anchor target. It is not a ds-link attribute.",
      table: { category: "Native anchor" },
    },
    rel: {
      control: "text",
      description: "Native anchor rel. It is not a ds-link attribute.",
      table: { category: "Native anchor" },
    },
    onClick: { action: "click", control: false, table: { category: "Events" } },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: link,
};

export const Playground = {};
