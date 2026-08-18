import "@maria-ms/components-web/select";
const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022275-59039&m=dev";

const countryOptions = [
  ["", "Select a country", true],
  ["ro", "Romania"],
  ["fr", "France"],
  ["de", "Germany", true],
];

const groupedCountryOptions = [
  ["", "Choose a country", true],
];

const countryOptionGroups = [
  [
    "Europe",
    [
      ["fr", "France"],
      ["de", "Germany"],
    ],
  ],
  [
    "North America",
    [
      ["ca", "Canada"],
      ["us", "United States"],
    ],
  ],
];

const createOption = ([optionValue, label, optionDisabled = false]) => {
  const option = document.createElement("option");

  option.value = optionValue;
  option.textContent = label;
  option.disabled = optionDisabled;

  return option;
};

const select = ({
  invalid = false,
  disabled = false,
  optionGroups = [],
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
  invalid ? control.setAttribute("aria-invalid", "true") : control.removeAttribute("aria-invalid");
  button.append(selectedContent);
  control.append(button);

  for (const option of options) {
    control.append(createOption(option));
  }

  for (const [label, optionsInGroup] of optionGroups) {
    const group = document.createElement("optgroup");

    group.label = label;
    for (const option of optionsInGroup) {
      group.append(createOption(option));
    }
    control.append(group);
  }

  control.value = value;
  component.append(control);

  const formColumn = document.createElement("div");
  formColumn.dataset.storybookFormColumn = "";
  formColumn.style.display = "block";
  formColumn.style.inlineSize = "480px";
  formColumn.style.maxInlineSize = "100%";
  formColumn.append(component);

  return formColumn;
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
    name: { control: "text", table: { category: "Native semantics" } },
    value: {
      control: {
        type: "select",
        labels: {
          "": "No selection",
          ro: "Romania",
          fr: "France",
          de: "Germany (disabled)",
        },
      },
      options: ["", "ro", "fr", "de"],
      description:
        "Native select value; it is not a ds-select attribute.",
      table: { category: "Native semantics" },
    },
    options: { control: false, table: { disable: true } },
    required: { control: "boolean", table: { category: "Native semantics" } },
    disabled: { control: "boolean", table: { category: "State" } },
    invalid: {
      control: "boolean",
      description:
        'Maps to aria-invalid="true" on the native select; it is not a ds-select attribute.',
      table: { category: "State" },
    },
  },
  parameters: {
    actions: { disable: true },
    design: { type: "figma", url: figmaUrl },
  },
  render: select,
};

export const Playground = {};

export const GroupedOptions = {
  name: "Grouped options",
  parameters: {
    controls: { disable: true },
  },
  render: (args) =>
    select({
      ...args,
      options: groupedCountryOptions,
      optionGroups: countryOptionGroups,
      value: "",
    }),
};
