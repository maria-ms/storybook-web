import "@maria-ms/components-web/switch";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022854-2&m=dev";

const switchControl = ({
  checked = false,
  disabled = false,
  label = "Email notifications",
  name = "notifications",
  required = false,
  size = "small",
  value = "enabled",
} = {}) => {
  const nativeLabel = document.createElement("label");
  const component = document.createElement("ds-switch");
  const control = document.createElement("input");
  const copy = document.createElement("span");

  component.setAttribute("size", size);
  control.type = "checkbox";
  control.setAttribute("switch", "");
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
  title: "Components/Switch",
  component: "ds-switch",
  args: {
    checked: false,
    disabled: false,
    label: "Email notifications",
    name: "notifications",
    required: false,
    size: "small",
    value: "enabled",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    checked: {
      control: "boolean",
      description:
        "Native checkbox checked state. It is not a ds-switch attribute.",
      table: { category: "Native state" },
    },
    disabled: {
      control: "boolean",
      description:
        "Native checkbox disabled state. It is not a ds-switch attribute.",
      table: { category: "Native state" },
    },
    name: { control: "text", table: { category: "Native checkbox" } },
    value: { control: "text", table: { category: "Native checkbox" } },
    required: { control: "boolean", table: { category: "Native validation" } },
    label: {
      control: "text",
      description:
        "Fixture-only native label content. It is not a ds-switch property.",
      table: { category: "Story fixture" },
    },
  },
  parameters: {
    design: { type: "figma", url: figmaUrl },
  },
  render: switchControl,
};

export const Playground = {};
