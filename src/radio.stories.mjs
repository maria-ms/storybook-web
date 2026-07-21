import "@maria-ms/components-web/radio";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022417-55&m=dev";

const radio = ({
  checked = false,
  disabled = false,
  label = "Option",
  name = "preference",
  required = false,
  size = "small",
  value = "option",
} = {}) => {
  const nativeLabel = document.createElement("label");
  const component = document.createElement("ds-radio");
  const control = document.createElement("input");
  const copy = document.createElement("span");

  component.setAttribute("size", size);
  control.type = "radio";
  control.name = name;
  control.value = value;
  control.checked = checked;
  control.disabled = disabled;
  control.required = required;
  component.append(control);

  copy.textContent = label;
  nativeLabel.style.alignItems = "center";
  nativeLabel.style.display = "inline-flex";
  nativeLabel.style.gap = "var(--ds-semantic-spacing-md)";
  nativeLabel.append(component, copy);

  return nativeLabel;
};

export default {
  title: "Components/Radio",
  component: "ds-radio",
  args: {
    checked: false,
    disabled: false,
    label: "Option",
    name: "preference",
    required: false,
    size: "small",
    value: "option",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    checked: {
      control: "boolean",
      description: "Native radio checked state. It is not a ds-radio attribute.",
      table: { category: "Native state" },
    },
    disabled: { control: "boolean", table: { category: "Native state" } },
    name: { control: "text", table: { category: "Native radio" } },
    value: { control: "text", table: { category: "Native radio" } },
    required: { control: "boolean", table: { category: "Native validation" } },
    label: {
      control: "text",
      description: "Fixture-only native label content; it is not a ds-radio property.",
      table: { category: "Story fixture" },
    },
  },
  parameters: {
    actions: { disable: true },
    design: { type: "figma", url: figmaUrl },
  },
  render: radio,
};

export const Playground = {};
