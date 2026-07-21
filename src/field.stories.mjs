import "@maria-ms/components-web/field";
import "@maria-ms/components-web/text-input";
import { fn } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022216-56&m=dev";

const field = ({
  disabled = false,
  label = "Email address",
  message = "We’ll only use this for account updates.",
  name = "email",
  onChange,
  onInput,
  placeholder = "name@example.com",
  required = true,
  showMessage = true,
  type = "email",
  value = "name@example.com",
} = {}) => {
  const component = document.createElement("ds-field");
  const labelElement = document.createElement("label");
  const textInput = document.createElement("ds-text-input");
  const control = document.createElement("input");

  labelElement.slot = "label";
  labelElement.textContent = label;
  textInput.slot = "control";
  textInput.setAttribute("size", "medium");
  control.type = type;
  control.name = name;
  control.placeholder = placeholder;
  control.value = value;
  control.disabled = disabled;
  control.required = required;
  if (onInput) control.addEventListener("input", onInput);
  if (onChange) control.addEventListener("change", onChange);
  textInput.append(control);
  component.append(labelElement, textInput);

  if (showMessage) {
    const messageElement = document.createElement("p");

    messageElement.slot = "message";
    messageElement.textContent = message;
    component.append(messageElement);
  }

  return component;
};

export default {
  title: "Components/Field",
  component: "ds-field",
  args: {
    disabled: false,
    label: "Email address",
    message: "We’ll only use this for account updates.",
    name: "email",
    placeholder: "name@example.com",
    required: true,
    showMessage: true,
    type: "email",
    value: "name@example.com",
    onInput: fn(),
    onChange: fn(),
  },
  argTypes: {
    label: {
      control: "text",
      description: "Story fixture mapped to the native Label slot; not a ds-field attribute.",
      table: { category: "Story fixture" },
    },
    message: {
      control: "text",
      description: "Story fixture mapped to the one plain-text Message slot; not a ds-field attribute.",
      table: { category: "Story fixture" },
    },
    showMessage: {
      control: "boolean",
      description: "Story fixture that adds or omits the Message slot; not a ds-field attribute.",
      table: { category: "Story fixture" },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "tel", "url"],
      table: { category: "Native Text Input" },
    },
    name: { control: "text", table: { category: "Native Text Input" } },
    placeholder: { control: "text", table: { category: "Native Text Input" } },
    value: { control: "text", table: { category: "Native Text Input" } },
    required: { control: "boolean", table: { category: "Native validation" } },
    disabled: { control: "boolean", table: { category: "Native state" } },
    onInput: { action: "input", control: false, table: { category: "Events" } },
    onChange: { action: "change", control: false, table: { category: "Events" } },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: field,
};

export const Playground = {};
