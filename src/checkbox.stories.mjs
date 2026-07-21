import "@maria-ms/components-web/checkbox";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022386-52&m=dev";

const checkbox = ({
  ariaInvalid = false,
  checked = false,
  disabled = false,
  indeterminate = false,
  name = "terms",
  required = false,
  size = "small",
  value = "accepted",
} = {}) => {
  const component = document.createElement("ds-checkbox");
  const control = document.createElement("input");

  component.setAttribute("size", size);
  control.type = "checkbox";
  control.name = name;
  control.value = value;
  control.checked = checked;
  control.indeterminate = indeterminate;
  control.disabled = disabled;
  control.required = required;
  if (ariaInvalid) control.setAttribute("aria-invalid", "true");
  component.append(control);

  return component;
};

export default {
  title: "Components/Checkbox",
  component: "ds-checkbox",
  args: {
    ariaInvalid: false,
    checked: false,
    disabled: false,
    indeterminate: false,
    name: "terms",
    required: false,
    size: "small",
    value: "accepted",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    checked: {
      control: "boolean",
      description: "Native checkbox checked state. It is not a ds-checkbox attribute.",
      table: { category: "Native state" },
    },
    indeterminate: {
      control: "boolean",
      description: "Maps to input.indeterminate. It is a native property, not an HTML or ds-checkbox attribute.",
      table: { category: "Native state" },
    },
    disabled: { control: "boolean", table: { category: "Native state" } },
    name: { control: "text", table: { category: "Native checkbox" } },
    value: { control: "text", table: { category: "Native checkbox" } },
    required: { control: "boolean", table: { category: "Native validation" } },
    ariaInvalid: {
      control: "boolean",
      description: "Maps to aria-invalid=\"true\" on the native checkbox after the owner chooses to show validation.",
      table: { category: "Native validation" },
    },
  },
  parameters: {
    actions: { disable: true },
    design: { type: "figma", url: figmaUrl },
  },
  render: checkbox,
};

export const Playground = {};
