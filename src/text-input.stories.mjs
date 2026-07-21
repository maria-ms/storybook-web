import "@maria-ms/components-web/text-input";
import { fn } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022178-257&m=dev";

const textInput = ({
  ariaInvalid = false,
  disabled = false,
  name = "email",
  onChange,
  onInput,
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
  if (ariaInvalid) control.setAttribute("aria-invalid", "true");
  if (onInput) control.addEventListener("input", onInput);
  if (onChange) control.addEventListener("change", onChange);
  component.append(control);

  return component;
};

export default {
  title: "Components/Text Input",
  component: "ds-text-input",
  args: {
    ariaInvalid: false,
    disabled: false,
    name: "email",
    placeholder: "Input text",
    readOnly: false,
    required: false,
    size: "small",
    type: "text",
    value: "",
    onInput: fn(),
    onChange: fn(),
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
      table: { category: "Native input" },
    },
    name: { control: "text", table: { category: "Native input" } },
    placeholder: {
      control: "text",
      description: "Native input placeholder. This is the Figma Preview text/state mapping, not a ds-text-input attribute.",
      table: { category: "Native input" },
    },
    value: {
      control: "text",
      description: "Native input value. This is the Figma Value preview mapping, not a ds-text-input attribute.",
      table: { category: "Native input" },
    },
    disabled: { control: "boolean", table: { category: "Native state" } },
    readOnly: { control: "boolean", table: { category: "Native state" } },
    required: { control: "boolean", table: { category: "Native validation" } },
    ariaInvalid: {
      control: "boolean",
      description: "Maps to aria-invalid=\"true\" on the native input; it is not a ds-text-input attribute.",
      table: { category: "Native validation" },
    },
    onInput: { action: "input", control: false, table: { category: "Events" } },
    onChange: { action: "change", control: false, table: { category: "Events" } },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: textInput,
};

export const Playground = {};
