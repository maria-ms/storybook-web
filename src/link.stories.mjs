import "@maria-ms/components-web/link";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022819-6&m=dev";

const link = ({
  href = "#accessibility-guide",
  label = "Read the accessibility guide.",
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
  anchor.textContent = label;
  component.append(anchor);

  return component;
};

export default {
  title: "Components/Link",
  component: "ds-link",
  args: {
    href: "#accessibility-guide",
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
    href: {
      control: "text",
      description: "Native anchor href. It is not a ds-link attribute.",
      table: { category: "Native semantics" },
    },
    target: {
      control: "select",
      options: ["_self", "_blank", "_parent", "_top"],
      description: "Native anchor target. It is not a ds-link attribute.",
      table: { category: "Native semantics" },
    },
    rel: {
      control: "text",
      description: "Native anchor rel. It is not a ds-link attribute.",
      table: { category: "Native semantics" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: link,
};

export const Playground = {};
