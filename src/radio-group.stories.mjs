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
  description = "Choose one way we can contact you.",
  disabled = false,
  error = "Select one option.",
  invalid = false,
  legend = "Contact preference",
  required = true,
  selected = "email",
  showDescription = true,
} = {}) => {
  const component = document.createElement("ds-radio-group");
  const fieldset = document.createElement("fieldset");
  const legendElement = document.createElement("legend");
  const name = "contact-preference";

  legendElement.textContent = legend;
  fieldset.append(legendElement);
  fieldset.disabled = disabled;
  invalid
    ? fieldset.setAttribute("aria-invalid", "true")
    : fieldset.removeAttribute("aria-invalid");

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
    input.checked = !invalid && selected === option.value;
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
  component.append(fieldset);
  return component;
};

export default {
  title: "Components/Radio Group",
  component: "ds-radio-group",
  args: {
    description: "Choose one way we can contact you.",
    disabled: false,
    error: "Select one option.",
    invalid: false,
    legend: "Contact preference",
    required: true,
    selected: "email",
    showDescription: true,
  },
  argTypes: {
    legend: {
      control: "text",
      description: "Native fieldset legend.",
      table: { category: "Content" },
    },
    description: {
      control: "text",
      description: "Group description associated with the native fieldset.",
      table: { category: "Content" },
    },
    error: {
      control: "text",
      description: "Error copy displayed for a missing selection.",
      table: { category: "Content" },
    },
    showDescription: {
      control: "boolean",
      description: "Adds or omits the group description.",
      table: { category: "Content" },
    },
    selected: {
      control: "select",
      options: ["email", "phone", "text", "none"],
      description: "Selected native radio value. Invalid clears the selection.",
      table: { category: "Native behavior" },
    },
    required: { control: "boolean", table: { category: "Native behavior" } },
    disabled: { control: "boolean", table: { category: "Native behavior" } },
    invalid: {
      control: "boolean",
      description: "Maps to fieldset aria-invalid and displays the group error with no selection.",
      table: { category: "Validation" },
    },
  },
  parameters: { actions: { disable: true }, design: { type: "figma", url: figmaUrl } },
  render: radioGroup,
};

export const Playground = {};
