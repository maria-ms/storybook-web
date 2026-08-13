import "@maria-ms/components-web/checkbox";
import "@maria-ms/components-web/choice-field";
import "@maria-ms/components-web/radio";
import "@maria-ms/components-web/switch";
import { expect } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022879-3&m=dev";

const controlDefaults = {
  checkbox: {
    error: "Choose whether to receive product updates.",
    label: "Receive product updates",
    message: "Get occasional updates about features and offers.",
    name: "product-updates",
    value: "yes",
  },
  radio: {
    label: "Text message",
    message: "Standard message rates may apply.",
    name: "contact-preference",
    value: "text-message",
  },
  switch: {
    error: "Choose whether to receive product updates.",
    label: "Product updates",
    message: "Get occasional updates about features and offers.",
    name: "product-updates",
    value: "yes",
  },
};

const choiceField = ({
  checked = false,
  control = "checkbox",
  disabled = false,
  invalid = false,
  label,
  message,
  required = false,
  showMessage = true,
  size = "medium",
} = {}) => {
  const defaults = controlDefaults[control];
  const showInvalid = invalid && control !== "radio";
  const component = document.createElement("ds-choice-field");
  const labelElement = document.createElement("label");
  const controlComponent = document.createElement(`ds-${control}`);
  const nativeControl = document.createElement("input");

  labelElement.slot = "label";
  labelElement.textContent = label ?? defaults.label;
  controlComponent.slot = "control";
  controlComponent.setAttribute("size", size);
  nativeControl.type = control === "radio" ? "radio" : "checkbox";
  nativeControl.name = defaults.name;
  nativeControl.value = defaults.value;
  nativeControl.checked = checked;
  nativeControl.disabled = disabled;
  nativeControl.required = required;
  nativeControl.toggleAttribute("switch", control === "switch");
  showInvalid
    ? nativeControl.setAttribute("aria-invalid", "true")
    : nativeControl.removeAttribute("aria-invalid");
  controlComponent.append(nativeControl);
  component.append(controlComponent, labelElement);

  if (showMessage) {
    const messageElement = document.createElement("p");

    messageElement.slot = "message";
    messageElement.textContent = message ?? (showInvalid ? defaults.error : defaults.message);
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
  title: "Components/Choice Field",
  component: "ds-choice-field",
  args: {
    checked: false,
    control: "checkbox",
    disabled: false,
    invalid: false,
    required: false,
    showMessage: true,
    size: "medium",
  },
  argTypes: {
    control: {
      control: {
        type: "select",
        labels: {
          checkbox: "Checkbox",
          radio: "Radio option",
          switch: "Switch",
        },
      },
      options: ["checkbox", "radio", "switch"],
      description: "One fixed, meaningful public choice control composition.",
      table: { category: "Composition" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    label: {
      control: "text",
      description: "Overrides the selected composition’s visible label.",
      table: { category: "Content" },
    },
    message: {
      control: "text",
      description: "Overrides the selected composition’s supporting or error message.",
      table: { category: "Content" },
    },
    showMessage: { control: "boolean", table: { category: "Content" } },
    checked: { control: "boolean", table: { category: "Native behavior" } },
    disabled: { control: "boolean", table: { category: "Native behavior" } },
    required: { control: "boolean", table: { category: "Native behavior" } },
    invalid: {
      control: "boolean",
      if: { arg: "control", neq: "radio" },
      description:
        "Maps to aria-invalid on Checkbox or Switch. Individual Radio errors belong to Radio Group.",
      table: { category: "Validation" },
    },
  },
  parameters: { actions: { disable: true }, design: { type: "figma", url: figmaUrl } },
  render: choiceField,
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const formColumn = canvasElement.querySelector("[data-storybook-form-column]");
    const component = formColumn.querySelector("ds-choice-field");
    const choiceControl = component.querySelector('[slot="control"]');
    const label = component.querySelector('[slot="label"]');
    const message = component.querySelector('[slot="message"]');

    await expect(formColumn.offsetWidth).toBe(480);
    await expect(component.offsetWidth).toBe(formColumn.offsetWidth);
    await expect(choiceControl.offsetWidth).toBeGreaterThan(0);
    await expect(choiceControl.offsetWidth).toBeLessThan(component.offsetWidth);
    await expect(label.offsetWidth).toBeGreaterThan(choiceControl.offsetWidth);
    if (message) await expect(message.offsetWidth).toBe(label.offsetWidth);
  },
};
