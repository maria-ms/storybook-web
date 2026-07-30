import "@maria-ms/components-web/choice-field";
import "@maria-ms/components-web/radio";
import "@maria-ms/components-web/radio-group";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022923-3&m=dev";

const options = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "text", label: "Text message", message: "Standard messaging rates may apply." },
];

const radioGroup = ({
  ariaInvalid = false,
  disabled = false,
  description = "Choose one way we can contact you.",
  error = "Select one option.",
  legend = "Contact preference",
  name = "contact-preference",
  required = true,
  selected = "email",
  showDescription = true,
} = {}) => {
  const component = document.createElement("ds-radio-group");
  const fieldset = document.createElement("fieldset");
  const legendElement = document.createElement("legend");

  legendElement.textContent = legend;
  fieldset.append(legendElement);
  fieldset.disabled = disabled;

  if (showDescription) {
    const descriptionElement = document.createElement("p");

    descriptionElement.dataset.description = "";
    descriptionElement.textContent = description;
    fieldset.append(descriptionElement);
  }

  options.forEach((option, index) => {
    const choiceField = document.createElement("ds-choice-field");
    const radio = document.createElement("ds-radio");
    const input = document.createElement("input");
    const label = document.createElement("label");

    radio.slot = "control";
    radio.setAttribute("size", "medium");
    input.type = "radio";
    input.name = name;
    input.value = option.value;
    input.required = required && index === 0;
    input.checked = selected === option.value;
    radio.append(input);
    label.slot = "label";
    label.textContent = option.label;
    choiceField.append(radio, label);

    if (option.message) {
      const message = document.createElement("p");

      message.slot = "message";
      message.textContent = option.message;
      choiceField.append(message);
    }

    fieldset.append(choiceField);
  });

  const errorElement = document.createElement("p");

  errorElement.dataset.error = "";
  errorElement.hidden = true;
  errorElement.textContent = error;
  fieldset.append(errorElement);
  if (ariaInvalid) fieldset.setAttribute("aria-invalid", "true");
  component.append(fieldset);
  return component;
};

export default {
  title: "Components/Radio Group",
  component: "ds-radio-group",
  args: {
    ariaInvalid: false,
    disabled: false,
    description: "Choose one way we can contact you.",
    error: "Select one option.",
    legend: "Contact preference",
    name: "contact-preference",
    required: true,
    selected: "email",
    showDescription: true,
  },
  argTypes: {
    legend: {
      control: "text",
      description: "Native fieldset legend; not a ds-radio-group attribute.",
      table: { category: "Story fixture" },
    },
    description: {
      control: "text",
      description: "Visible group description; not a ds-radio-group attribute.",
      table: { category: "Story fixture" },
    },
    error: {
      control: "text",
      description: "Group error copy; not a ds-radio-group attribute.",
      table: { category: "Story fixture" },
    },
    showDescription: {
      control: "boolean",
      description: "Adds or omits the group description; not a ds-radio-group attribute.",
      table: { category: "Story fixture" },
    },
    selected: {
      control: "select",
      options: ["email", "phone", "text", "none"],
      description: "Story fixture for the checked native radio value.",
      table: { category: "Story fixture" },
    },
    name: { control: "text", table: { category: "Native radios" } },
    required: { control: "boolean", table: { category: "Native validation" } },
    ariaInvalid: {
      control: "boolean",
      description: "Maps to aria-invalid on the native fieldset after the owner chooses to show a group error.",
      table: { category: "Native validation" },
    },
    disabled: {
      control: "boolean",
      description: "Native fieldset disabled state; not a ds-radio-group attribute.",
      table: { category: "Native state" },
    },
  },
  parameters: {
    actions: { disable: true },
    design: { type: "figma", url: figmaUrl },
  },
  render: radioGroup,
};

export const Playground = {};
