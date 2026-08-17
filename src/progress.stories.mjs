import "@maria-ms/components-web/progress";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40024532-2&m=dev";

const progress = ({
  accessibleName = "Profile completion",
  max = 100,
  size = "small",
  value = 50,
} = {}) => {
  const formColumn = document.createElement("div");
  const component = document.createElement("ds-progress");
  const control = document.createElement("progress");

  formColumn.dataset.progressStory = "";
  formColumn.style.display = "block";
  formColumn.style.inlineSize = "480px";
  formColumn.style.maxInlineSize = "100%";

  component.setAttribute("size", size);
  control.max = Number(max);
  control.value = Number(value);
  control.setAttribute("aria-label", accessibleName);
  component.append(control);
  formColumn.append(component);

  return formColumn;
};

export default {
  title: "Components/Progress",
  component: "ds-progress",
  args: {
    accessibleName: "Profile completion",
    max: 100,
    size: "small",
    value: 50,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    value: {
      control: { type: "number", min: 0, step: 1 },
      description: "Native progress value. It is not a ds-progress attribute.",
      table: { category: "Native semantics" },
    },
    max: {
      control: { type: "number", min: 1, step: 1 },
      description: "Native progress maximum. It is not a ds-progress attribute.",
      table: { category: "Native semantics" },
    },
    accessibleName: {
      control: "text",
      description: "Mapped to aria-label on the native progress element.",
      table: { category: "Accessibility" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: progress,
};

export const Playground = {};
