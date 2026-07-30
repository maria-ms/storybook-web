import "@maria-ms/components-web/checkbox";
import "@maria-ms/components-web/choice-field";
import "@maria-ms/components-web/radio";
import "@maria-ms/components-web/switch";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022879-3&m=dev";

const choiceField = ({
  ariaInvalid = false,
  checked = false,
  control = "checkbox",
  disabled = false,
  label = "Receive product updates",
  message = "Get occasional updates about features and offers.",
  name = "updates",
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
  if (control === "switch") nativeControl.setAttribute("switch", "");
  if (ariaInvalid) nativeControl.setAttribute("aria-invalid", "true");
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
    ariaInvalid: false,
    checked: false,
    control: "checkbox",
    disabled: false,
    label: "Receive product updates",
    message: "Get occasional updates about features and offers.",
    name: "updates",
    showMessage: true,
    size: "medium",
    value: "yes",
  },
  argTypes: {
    control: {
      control: "select",
      options: ["checkbox", "radio", "switch"],
      description: "Story fixture selecting one eligible public choice control.",
      table: { category: "Story fixture" },
    },
    label: {
      control: "text",
      description: "Slotted native label; not a ds-choice-field attribute.",
      table: { category: "Story fixture" },
    },
    message: {
      control: "text",
      description: "Visible supporting or error message; not a ds-choice-field attribute.",
      table: { category: "Story fixture" },
    },
    showMessage: {
      control: "boolean",
      description: "Adds or omits the Message slot; not a ds-choice-field attribute.",
      table: { category: "Story fixture" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Nested native control" },
    },
    checked: {
      control: "boolean",
      description: "Native checked state on the nested control.",
      table: { category: "Native state" },
    },
    disabled: {
      control: "boolean",
      description: "Native disabled state on the nested control.",
      table: { category: "Native state" },
    },
    ariaInvalid: {
      control: "boolean",
      description: "Maps to aria-invalid on the nested control after the owner chooses to show validation.",
      table: { category: "Native validation" },
    },
    name: { control: "text", table: { category: "Native control" } },
    value: { control: "text", table: { category: "Native control" } },
  },
  parameters: {
    actions: { disable: true },
    design: { type: "figma", url: figmaUrl },
  },
  render: choiceField,
};

export const Playground = {};
