import "@maria-ms/components-web/checkbox";
import "@maria-ms/components-web/choice-field";
import "@maria-ms/components-web/radio";
import "@maria-ms/components-web/switch";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022879-3&m=dev";

const choiceField = ({
  checked = false,
  control = "checkbox",
  disabled = false,
  invalid = false,
  label = "Receive product updates",
  message = "Get occasional updates about features and offers.",
  name = "updates",
  required = false,
  showMessage = true,
  size = "medium",
  value = "yes",
} = {}) => {
  const component = document.createElement("ds-choice-field");
  const labelElement = document.createElement("label");
  const controlComponent = document.createElement(`ds-${control}`);
  const nativeControl = document.createElement("input");

  labelElement.slot = "label";
  labelElement.textContent = label;
  controlComponent.slot = "control";
  controlComponent.setAttribute("size", size);
  nativeControl.type = control === "radio" ? "radio" : "checkbox";
  nativeControl.name = name;
  nativeControl.value = value;
  nativeControl.checked = checked;
  nativeControl.disabled = disabled;
  nativeControl.required = required;
  nativeControl.toggleAttribute("switch", control === "switch");
  invalid && control !== "radio"
    ? nativeControl.setAttribute("aria-invalid", "true")
    : nativeControl.removeAttribute("aria-invalid");
  controlComponent.append(nativeControl);
  component.append(controlComponent, labelElement);

  if (showMessage) {
    const messageElement = document.createElement("p");

    messageElement.slot = "message";
    messageElement.textContent = message;
    component.append(messageElement);
  }

  return component;
};

export default {
  title: "Components/Choice Field",
  component: "ds-choice-field",
  args: {
    checked: false,
    control: "checkbox",
    disabled: false,
    invalid: false,
    label: "Receive product updates",
    message: "Get occasional updates about features and offers.",
    name: "updates",
    required: false,
    showMessage: true,
    size: "medium",
    value: "yes",
  },
  argTypes: {
    control: {
      control: "select",
      options: ["checkbox", "radio", "switch"],
      description: "One eligible public choice control inserted into Choice Field’s Control slot.",
      table: { category: "Composition" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    label: { control: "text", table: { category: "Content" } },
    message: { control: "text", table: { category: "Content" } },
    showMessage: { control: "boolean", table: { category: "Content" } },
    checked: { control: "boolean", table: { category: "Native behavior" } },
    disabled: { control: "boolean", table: { category: "Native behavior" } },
    required: { control: "boolean", table: { category: "Native behavior" } },
    name: { control: "text", table: { category: "Native behavior" } },
    value: { control: "text", table: { category: "Native behavior" } },
    invalid: {
      control: "boolean",
      description:
        "Maps to aria-invalid on Checkbox or Switch. Individual Radio errors belong to Radio Group.",
      table: { category: "Validation" },
    },
  },
  parameters: { actions: { disable: true }, design: { type: "figma", url: figmaUrl } },
  render: choiceField,
};

export const Playground = {};
