import "@maria-ms/components-web/checkbox";
import "@maria-ms/components-web/choice-field";
import "@maria-ms/components-web/radio";
import "@maria-ms/components-web/switch";
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
    disabled: false,
    invalid: false,
    required: false,
    size: "medium",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    checked: { control: "boolean", table: { category: "State" } },
    disabled: { control: "boolean", table: { category: "State" } },
    required: { control: "boolean", table: { category: "Native semantics" } },
    invalid: {
      control: "boolean",
      description:
        "Maps to aria-invalid on Checkbox or Switch. Individual Radio errors belong to Radio Group.",
      table: { category: "State" },
    },
  },
  parameters: { actions: { disable: true }, design: { type: "figma", url: figmaUrl } },
  render: choiceField,
};

export const Playground = {};
