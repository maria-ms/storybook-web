import "@maria-ms/components-web/number-input";
import { expect } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022324-53&m=dev";

const numberInput = ({
  invalid = false,
  disabled = false,
  max = "",
  min = "",
  name = "quantity",
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
  invalid ? control.setAttribute("aria-invalid", "true") : control.removeAttribute("aria-invalid");
  component.append(control);

  const formColumn = document.createElement("div");
  formColumn.dataset.storybookFormColumn = "";
  formColumn.style.display = "block";
  formColumn.style.inlineSize = "min(100%, 480px)";
  formColumn.append(component);

  return formColumn;
};

export default {
  title: "Components/Number Input",
  component: "ds-number-input",
  args: {
    invalid: false,
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
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    name: { control: "text", table: { category: "Native behavior" } },
    placeholder: {
      control: "text",
      description: "Native number-input placeholder; it is not a ds-number-input attribute.",
      table: { category: "Content" },
    },
    value: {
      control: "text",
      description: "Native number-input value; it is not a ds-number-input attribute.",
      table: { category: "Content" },
    },
    min: { control: "text", table: { category: "Native behavior" } },
    max: { control: "text", table: { category: "Native behavior" } },
    step: { control: "text", table: { category: "Native behavior" } },
    disabled: { control: "boolean", table: { category: "Native behavior" } },
    readOnly: { control: "boolean", table: { category: "Native behavior" } },
    required: { control: "boolean", table: { category: "Native behavior" } },
    invalid: {
      control: "boolean",
      description: "Maps to aria-invalid=\"true\" on the native input; it is not a ds-number-input attribute.",
      table: { category: "Validation" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: numberInput,
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const formColumn = canvasElement.querySelector("[data-storybook-form-column]");
    const component = formColumn.querySelector("ds-number-input");
    const control = component.querySelector('input[type="number"]');

    await expect(component.offsetWidth).toBe(formColumn.offsetWidth);
    await expect(control.offsetWidth).toBe(component.offsetWidth);
  },
};
