import "@maria-ms/components-web/field";
import "@maria-ms/components-web/number-input";
import "@maria-ms/components-web/select";
import "@maria-ms/components-web/text-input";
import "@maria-ms/components-web/textarea";
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

export const SupportedControls = {
  parameters: { controls: { disable: true } },
  render: () => {
    const examples = document.createElement("div");

    examples.style.cssText = "display: grid; gap: 24px;";

    const createField = (label, controlWrapper, control, message) => {
      const component = document.createElement("ds-field");
      const labelElement = document.createElement("label");
      const messageElement = document.createElement("p");

      labelElement.slot = "label";
      labelElement.textContent = label;
      controlWrapper.slot = "control";
      controlWrapper.append(control);
      messageElement.slot = "message";
      messageElement.textContent = message;
      component.append(labelElement, controlWrapper, messageElement);
      return component;
    };

    const textInput = document.createElement("input");

    textInput.type = "email";
    textInput.placeholder = "name@example.com";
    examples.append(
      createField("Email address", document.createElement("ds-text-input"), textInput, "Account updates only."),
    );

    const textarea = document.createElement("textarea");

    textarea.placeholder = "Tell us more";
    examples.append(
      createField("Message", document.createElement("ds-textarea"), textarea, "Maximum 500 characters."),
    );

    const selectWrapper = document.createElement("ds-select");
    const select = document.createElement("select");
    const selectButton = document.createElement("button");
    const selectedContent = document.createElement("selectedcontent");
    const placeholderOption = new Option("Choose a country", "");

    selectWrapper.setAttribute("size", "medium");
    placeholderOption.disabled = true;
    selectButton.append(selectedContent);
    select.append(selectButton, placeholderOption, new Option("Romania", "ro"));
    examples.append(
      createField("Country", selectWrapper, select, "Used for regional settings."),
    );

    const numberInput = document.createElement("input");

    numberInput.type = "number";
    numberInput.min = "1";
    numberInput.value = "1";
    examples.append(
      createField("Quantity", document.createElement("ds-number-input"), numberInput, "Choose at least one."),
    );

    return examples;
  },
};
