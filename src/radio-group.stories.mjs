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
  error = "Select one option.",
  legend = "Contact preference",
  selected = "email",
  showDescription = true,
  state = "default",
} = {}) => {
  const component = document.createElement("ds-radio-group");
  const fieldset = document.createElement("fieldset");
  const legendElement = document.createElement("legend");
  const isDisabled = state === "disabled";
  const isError = state === "error";
  const name = "contact-preference";

  legendElement.textContent = legend;
  fieldset.append(legendElement);
  fieldset.disabled = isDisabled;

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
    input.required = index === 0;
    input.checked = !isError && selected === option.value;
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
  if (isError) fieldset.setAttribute("aria-invalid", "true");
  component.append(fieldset);
  return component;
};

export default {
  title: "Components/Radio Group",
  component: "ds-radio-group",
  args: {
    description: "Choose one way we can contact you.",
    error: "Select one option.",
    legend: "Contact preference",
    selected: "email",
    showDescription: true,
    state: "default",
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "error", "disabled"],
      description:
        "Story fixture: Error maps to fieldset aria-invalid with no selection; Disabled maps to fieldset disabled.",
      table: { category: "Preview" },
    },
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
      description: "Checked native radio value. Error always clears the selection.",
      table: { category: "Story fixture" },
    },
  },
  parameters: {
    actions: { disable: true },
    design: { type: "figma", url: figmaUrl },
  },
  render: radioGroup,
};

export const Playground = {};
