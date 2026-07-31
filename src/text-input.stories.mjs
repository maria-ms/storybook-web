import "@maria-ms/components-web/text-input";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022178-257&m=dev";

const textInput = ({
  invalid = false,
  disabled = false,
  name = "email",
  placeholder = "Input text",
  readOnly = false,
  required = false,
  size = "small",
  type = "text",
  value = "",
} = {}) => {
  const component = document.createElement("ds-text-input");
  const control = document.createElement("input");

  component.setAttribute("size", size);
  control.type = type;
  control.name = name;
  control.placeholder = placeholder;
  control.value = value;
  control.disabled = disabled;
  control.readOnly = readOnly;
  control.required = required;
  control.toggleAttribute("aria-invalid", invalid);
  component.append(control);

  return component;
};

export default {
  title: "Components/Text Input",
  component: "ds-text-input",
  args: {
    invalid: false,
    disabled: false,
    name: "email",
    placeholder: "Input text",
    readOnly: false,
    required: false,
    size: "small",
    type: "text",
    value: "",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "tel", "url"],
      table: { category: "Native behavior" },
    },
    name: { control: "text", table: { category: "Native behavior" } },
    placeholder: {
      control: "text",
      description: "Native input placeholder; it is not a ds-text-input attribute.",
      table: { category: "Content" },
    },
    value: {
      control: "text",
      description: "Native input value; it is not a ds-text-input attribute.",
      table: { category: "Content" },
    },
    disabled: { control: "boolean", table: { category: "Native behavior" } },
    readOnly: { control: "boolean", table: { category: "Native behavior" } },
    required: { control: "boolean", table: { category: "Native behavior" } },
    invalid: {
      control: "boolean",
      description: "Maps to aria-invalid=\"true\" on the native input; it is not a ds-text-input attribute.",
      table: { category: "Validation" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: textInput,
};

export const Playground = {};
