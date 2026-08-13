import "@maria-ms/components-web/field";
import "@maria-ms/components-web/number-input";
import "@maria-ms/components-web/select";
import "@maria-ms/components-web/text-input";
import "@maria-ms/components-web/textarea";
import { expect } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022216-56&m=dev";

const controlDefaults = {
  "text-input": {
    error: "Enter a valid email address.",
    label: "Email address",
    message: "We’ll only use this for account updates.",
    name: "email",
    placeholder: "name@example.com",
    type: "email",
    value: "",
  },
  textarea: {
    error: "Add a message before continuing.",
    label: "Message",
    message: "Share any details that will help us respond.",
    name: "message",
    placeholder: "Type your message…",
    type: "text",
    value: "",
  },
  select: {
    error: "Choose a country.",
    label: "Country",
    message: "Choose the country you live in.",
    name: "country",
    placeholder: "Select a country",
    type: "text",
    value: "",
  },
  "number-input": {
    error: "Enter a quantity.",
    label: "Quantity",
    message: "Enter the number of items.",
    name: "quantity",
    placeholder: "0",
    type: "number",
    value: "",
  },
};

const createControl = ({
  control = "text-input",
  disabled,
  invalid,
  name,
  placeholder,
  required,
  size,
  type,
  value,
}) => {
  const wrapper = document.createElement(`ds-${control}`);

  wrapper.slot = "control";
  if (control !== "textarea") wrapper.setAttribute("size", size);

  if (control === "textarea") {
    const nativeControl = document.createElement("textarea");

    nativeControl.name = name;
    nativeControl.placeholder = placeholder;
    nativeControl.value = value;
    nativeControl.disabled = disabled;
    nativeControl.required = required;
    invalid
      ? nativeControl.setAttribute("aria-invalid", "true")
      : nativeControl.removeAttribute("aria-invalid");
    wrapper.append(nativeControl);
    return wrapper;
  }

  if (control === "select") {
    const nativeControl = document.createElement("select");
    const button = document.createElement("button");
    const selectedContent = document.createElement("selectedcontent");
    const placeholderOption = new Option(placeholder, "");

    placeholderOption.disabled = true;
    placeholderOption.selected = value === "";
    button.append(selectedContent);
    nativeControl.append(
      button,
      placeholderOption,
      new Option("Romania", "ro"),
      new Option("France", "fr"),
    );
    nativeControl.name = name;
    nativeControl.value = value;
    nativeControl.disabled = disabled;
    nativeControl.required = required;
    invalid
      ? nativeControl.setAttribute("aria-invalid", "true")
      : nativeControl.removeAttribute("aria-invalid");
    wrapper.append(nativeControl);
    return wrapper;
  }

  const nativeControl = document.createElement("input");

  nativeControl.type = control === "number-input" ? "number" : type;
  nativeControl.name = name;
  nativeControl.placeholder = placeholder;
  nativeControl.value = value;
  nativeControl.disabled = disabled;
  nativeControl.required = required;
  invalid
    ? nativeControl.setAttribute("aria-invalid", "true")
    : nativeControl.removeAttribute("aria-invalid");
  wrapper.append(nativeControl);
  return wrapper;
};

const field = ({
  control = "text-input",
  disabled = false,
  invalid = false,
  label,
  message,
  name,
  placeholder,
  required = true,
  showMessage = true,
  size = "medium",
  type,
  value,
} = {}) => {
  const defaults = controlDefaults[control];
  const component = document.createElement("ds-field");
  const labelElement = document.createElement("label");

  labelElement.slot = "label";
  labelElement.textContent = label ?? defaults.label;
  component.append(
    labelElement,
    createControl({
      control,
      disabled,
      invalid,
      name: name ?? defaults.name,
      placeholder: placeholder ?? defaults.placeholder,
      required,
      size,
      type: type ?? defaults.type,
      value: value ?? defaults.value,
    }),
  );

  if (showMessage) {
    const messageElement = document.createElement("p");

    messageElement.slot = "message";
    messageElement.textContent = message ?? (invalid ? defaults.error : defaults.message);
    component.append(messageElement);
  }

  const formColumn = document.createElement("div");

  formColumn.dataset.storybookFormColumn = "";
  formColumn.style.display = "block";
  formColumn.style.inlineSize = "480px";
  formColumn.style.maxInlineSize = "100%";
  formColumn.append(component);
  return formColumn;
};

export default {
  title: "Components/Field",
  component: "ds-field",
  args: {
    control: "text-input",
    disabled: false,
    invalid: false,
    required: true,
    showMessage: true,
    size: "medium",
  },
  argTypes: {
    control: {
      control: {
        type: "select",
        labels: {
          "text-input": "Email input",
          textarea: "Message textarea",
          select: "Country select",
          "number-input": "Quantity input",
        },
      },
      options: ["text-input", "textarea", "select", "number-input"],
      description: "One fixed, meaningful public control composition inserted into Field’s Control slot.",
      table: { category: "Composition" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      if: { arg: "control", neq: "textarea" },
      description: "Applied to the selected child. Textarea has no Size property.",
      table: { category: "Appearance" },
    },
    label: {
      control: "text",
      description: "Overrides the selected control’s example label.",
      table: { category: "Content" },
    },
    message: {
      control: "text",
      description: "Overrides the selected control’s example supporting text.",
      table: { category: "Content" },
    },
    showMessage: { control: "boolean", table: { category: "Content" } },
    disabled: { control: "boolean", table: { category: "Native behavior" } },
    required: { control: "boolean", table: { category: "Native behavior" } },
    invalid: {
      control: "boolean",
      description: "Maps to aria-invalid on the nested native control.",
      table: { category: "Validation" },
    },
  },
  parameters: { actions: { disable: true }, design: { type: "figma", url: figmaUrl } },
  render: field,
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const formColumn = canvasElement.querySelector("[data-storybook-form-column]");
    const component = formColumn.querySelector("ds-field");
    const controlPart = component.querySelector('[slot="control"]');
    const nativeControl = controlPart.querySelector("input, select, textarea");

    await expect(formColumn.offsetWidth).toBe(480);
    await expect(component.offsetWidth).toBe(formColumn.offsetWidth);
    await expect(controlPart.offsetWidth).toBe(component.offsetWidth);
    await expect(nativeControl.offsetWidth).toBe(controlPart.offsetWidth);
  },
};
