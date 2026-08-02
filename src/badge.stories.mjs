import "@maria-ms/components-web/badge";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40023969-20&m=dev";

const badge = ({ color = "neutral", size = "small", text = "Badge" } = {}) => {
  const component = document.createElement("ds-badge");

  component.setAttribute("color", color);
  component.setAttribute("size", size);
  component.textContent = text;
  return component;
};

export default {
  title: "Components/Badge",
  component: "ds-badge",
  args: { color: "neutral", size: "small", text: "Badge" },
  argTypes: {
    color: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "destructive", "blue"],
      table: { category: "Appearance" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    text: {
      control: "text",
      description: "Required badge text. An optional decorative SVG may precede it in product markup.",
      table: { category: "Content" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: badge,
};

export const Playground = {};
