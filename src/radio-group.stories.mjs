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
  const showInvalid = invalid && !disabled;
  const component = document.createElement("ds-radio-group");
  const fieldset = document.createElement("fieldset");
  const legendElement = document.createElement("legend");
  const name = "contact-preference";

  legendElement.textContent = legend;
  fieldset.append(legendElement);
  fieldset.disabled = disabled;
  showInvalid
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
    input.checked = !showInvalid && selected === option.value;
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

  const formColumn = document.createElement("div");

  formColumn.dataset.storybookFormColumn = "";
  formColumn.style.display = "block";
  formColumn.style.inlineSize = "480px";
  formColumn.style.maxInlineSize = "100%";
  formColumn.append(component);
  return formColumn;
};

export default {
  title: "Components/Radio Group",
  component: "ds-radio-group",
  args: {
    disabled: false,
    invalid: false,
    required: true,
    selected: "email",
  },
  argTypes: {
    selected: {
      control: "select",
      options: ["email", "phone", "text", "none"],
      description: "Selected native radio value. Invalid clears the selection.",
      table: { category: "State" },
    },
    required: { control: "boolean", table: { category: "Native semantics" } },
    disabled: { control: "boolean", table: { category: "State" } },
    invalid: {
      control: "boolean",
      description: "Maps to fieldset aria-invalid and displays the group error with no selection.",
      table: { category: "State" },
    },
  },
  parameters: { actions: { disable: true }, design: { type: "figma", url: figmaUrl } },
  render: radioGroup,
};

export const Playground = {};
