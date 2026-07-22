import "@maria-ms/components-web/number-input";
import { fn } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022324-53&m=dev";

const numberInput = ({
  ariaInvalid = false,
  disabled = false,
  max = "",
  min = "",
  name = "quantity",
  onChange,
  onInput,
  placeholder = "0",
  readOnly = false,
  required = false,
  size = "small",
  step = "1",
  value = "",
} = {}) => {
  const component = document.createElement("ds-number-input");
  const control = document.createElement("input");

  component.setAttribute("size", size);
  control.type = "number";
  control.name = name;
  control.placeholder = placeholder;
  control.value = value;
  control.disabled = disabled;
  control.readOnly = readOnly;
  control.required = required;
  if (min !== "") control.min = min;
  if (max !== "") control.max = max;
  if (step !== "") control.step = step;
  if (ariaInvalid) control.setAttribute("aria-invalid", "true");
  if (onInput) control.addEventListener("input", onInput);
  if (onChange) control.addEventListener("change", onChange);
  component.append(control);

  return component;
};

export default {
  title: "Components/Number Input",
  component: "ds-number-input",
  args: {
    ariaInvalid: false,
    disabled: false,
    max: "",
    min: "",
    name: "quantity",
    placeholder: "0",
    readOnly: false,
    required: false,
    size: "small",
    step: "1",
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
    name: { control: "text", table: { category: "Native number input" } },
    placeholder: {
      control: "text",
      description: "Native number-input placeholder. This is the Figma Preview value/state mapping, not a ds-number-input attribute.",
      table: { category: "Native number input" },
    },
    value: {
      control: "text",
      description: "Native number-input value. This is the Figma Preview value/state mapping, not a ds-number-input attribute.",
      table: { category: "Native number input" },
    },
    min: { control: "text", table: { category: "Native number input" } },
    max: { control: "text", table: { category: "Native number input" } },
    step: { control: "text", table: { category: "Native number input" } },
    disabled: { control: "boolean", table: { category: "Native state" } },
    readOnly: { control: "boolean", table: { category: "Native state" } },
    required: { control: "boolean", table: { category: "Native validation" } },
    ariaInvalid: {
      control: "boolean",
      description: "Maps to aria-invalid=\"true\" on the native input; it is not a ds-number-input attribute.",
      table: { category: "Native validation" },
    },
    onInput: { action: "input", control: false, table: { category: "Events" } },
    onChange: { action: "change", control: false, table: { category: "Events" } },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: numberInput,
};

export const Playground = {};
