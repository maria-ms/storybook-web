import "@maria-ms/components-web/select";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022275-59039&m=dev";

const countryOptions = [
  ["", "Select a country", true],
  ["ro", "Romania"],
  ["fr", "France"],
  ["de", "Germany", true],
];

const select = ({
  invalid = false,
  disabled = false,
  name = "country",
  options = countryOptions,
  required = false,
  size = "medium",
  value = "",
} = {}) => {
  const component = document.createElement("ds-select");
  const control = document.createElement("select");
  const button = document.createElement("button");
  const selectedContent = document.createElement("selectedcontent");

  component.setAttribute("size", size);
  control.name = name;
  control.disabled = disabled;
  control.required = required;
  control.toggleAttribute("aria-invalid", invalid);
  button.append(selectedContent);
  control.append(button);

  for (const [optionValue, label, optionDisabled = false] of options) {
    const option = document.createElement("option");

    option.value = optionValue;
    option.textContent = label;
    option.disabled = optionDisabled;
    control.append(option);
  }

  control.value = value;
  component.append(control);

  return component;
};

export default {
  title: "Components/Select",
  component: "ds-select",
  args: {
    invalid: false,
    disabled: false,
    name: "country",
    required: false,
    size: "medium",
    value: "ro",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    name: { control: "text", table: { category: "Native behavior" } },
    value: {
      control: "text",
      description:
        "Native select value; it is not a ds-select attribute.",
      table: { category: "Content" },
    },
    options: { control: false, table: { disable: true } },
    required: { control: "boolean", table: { category: "Native behavior" } },
    disabled: { control: "boolean", table: { category: "Native behavior" } },
    invalid: {
      control: "boolean",
      description:
        'Maps to aria-invalid="true" on the native select; it is not a ds-select attribute.',
      table: { category: "Validation" },
    },
  },
  parameters: {
    actions: { disable: true },
    design: { type: "figma", url: figmaUrl },
  },
  render: select,
};

export const Playground = {};
