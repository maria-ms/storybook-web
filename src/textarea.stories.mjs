import "@maria-ms/components-web/textarea";
import { expect } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022294-52&m=dev";

const textarea = ({
  invalid = false,
  disabled = false,
  name = "message",
  placeholder = "Type your message…",
  readOnly = false,
  required = false,
  rows = 3,
  value = "Type your message…",
} = {}) => {
  const component = document.createElement("ds-textarea");
  const control = document.createElement("textarea");

  control.name = name;
  control.placeholder = placeholder;
  control.value = value;
  control.rows = rows;
  control.disabled = disabled;
  control.readOnly = readOnly;
  control.required = required;
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
  title: "Components/Textarea",
  component: "ds-textarea",
  args: {
    invalid: false,
    disabled: false,
    name: "message",
    placeholder: "Type your message…",
    readOnly: false,
    required: false,
    rows: 3,
    value: "Type your message…",
  },
  argTypes: {
    name: { control: "text", table: { category: "Native semantics" } },
    placeholder: {
      control: "text",
      description: "Native textarea placeholder; it is not a ds-textarea attribute.",
      table: { category: "Native semantics" },
    },
    value: {
      control: "text",
      description: "Native textarea value; it is not a ds-textarea attribute.",
      table: { category: "Native semantics" },
    },
    rows: {
      control: { type: "number", min: 1, step: 1 },
      description: "Native textarea rows. The component's token-backed minimum height still applies.",
      table: { category: "Native semantics" },
    },
    disabled: { control: "boolean", table: { category: "State" } },
    readOnly: { control: "boolean", table: { category: "State" } },
    required: { control: "boolean", table: { category: "Native semantics" } },
    invalid: {
      control: "boolean",
      description: "Maps to aria-invalid=\"true\" on the native textarea; it is not a ds-textarea attribute.",
      table: { category: "State" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: textarea,
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const formColumn = canvasElement.querySelector("[data-storybook-form-column]");
    const component = formColumn.querySelector("ds-textarea");
    const control = component.querySelector("textarea");

    await expect(component.offsetWidth).toBe(formColumn.offsetWidth);
    await expect(control.offsetWidth).toBe(component.offsetWidth);
  },
};
