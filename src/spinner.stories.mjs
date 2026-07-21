import "@maria-ms/components-web/spinner";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022096-52&m=dev";

const spinner = ({ size = "small" } = {}) => {
  const component = document.createElement("ds-spinner");

  component.setAttribute("size", size);
  return component;
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
