import "@maria-ms/components-web/button";
import "@maria-ms/components-web/field";
import "@maria-ms/components-web/input-select";
import { icon } from "./icons.mjs";
import {
  escapeHtml,
  indent,
  renderField,
  renderStoryGroup,
  renderSubmitForm,
  setAttributes,
  sourceAttributes,
  sourceField,
  sourceStoryGroup,
  sourceSubmitForm,
  staticStoryParametersFor,
  storyParameters,
} from "./story-helpers.mjs";

const inputAttributes = (state) => ({
  disabled: state.disabled,
  name: state.name,
  required: state.required,
  size: state.size,
  value: state.value,
  "aria-invalid": state.ariaInvalid && "true",
  "aria-label": state.ariaLabel,
});

const renderOption = (option) => {
  const element = document.createElement("option");

  element.value = option.value;
  element.disabled = Boolean(option.disabled);

  if (option.icon) {
    const label = document.createElement("span");

    label.className = "option-label";
    label.textContent = option.label;
    element.append(icon("", option.icon), label);
  } else {
    element.textContent = option.label;
  }

  return element;
};

const renderOptgroup = (group) => {
  const element = document.createElement("optgroup");
  const legend = document.createElement("legend");

  element.label = group.label;
  legend.textContent = group.label;
  element.append(legend, ...group.options.map(renderOption));

  return element;
};

const optionNodes = (state) =>
  state.groups?.length
    ? state.groups.map(renderOptgroup)
    : state.options.map(renderOption);

const renderInput = (state) => {
  const element = document.createElement("ds-input-select");

  setAttributes(element, inputAttributes(state));
  if (state.prefixIcon) element.append(icon("prefix", state.prefixIcon));
  element.append(...optionNodes(state));

  return element;
};

const sourceOptionContent = (option) =>
  option.icon
    ? `<svg aria-hidden="true"><!-- ${option.icon} icon --></svg>
<span class="option-label">${escapeHtml(option.label)}</span>`
    : escapeHtml(option.label);

const sourceOption = (option) => {
  const content = sourceOptionContent(option);
  const attributes = sourceAttributes({
    disabled: option.disabled,
    value: option.value,
  });

  return option.icon
    ? `<option${attributes}>\n${indent(content)}\n</option>`
    : `<option${attributes}>${content}</option>`;
};

const sourceOptgroup = (group) => `<optgroup label="${escapeHtml(group.label)}">
${indent(`<legend>${escapeHtml(group.label)}</legend>`)}
${indent(group.options.map(sourceOption).join("\n"))}
</optgroup>`;

const sourceOptions = (state) =>
  state.groups?.length
    ? state.groups.map(sourceOptgroup)
    : state.options.map(sourceOption);

const sourceInput = (state) => {
  const children = [
    state.prefixIcon &&
      `<svg slot="prefix" aria-hidden="true"><!-- ${state.prefixIcon} icon --></svg>`,
    ...sourceOptions(state),
  ].filter(Boolean);

  return `<ds-input-select${sourceAttributes(inputAttributes(state))}>\n${indent(
    children.join("\n"),
  )}\n</ds-input-select>`;
};

const fieldOptions = (state) => ({
  description: state.description,
  error: state.error,
  invalid: state.ariaInvalid,
  label: state.label,
  width: state.fieldWidth ?? "276px",
});

const renderFieldInput = (state) =>
  renderField(renderInput(state), fieldOptions(state));

const sourceFieldInput = (state) =>
  sourceField(sourceInput(state), fieldOptions(state));

const inputParameters = (args, design) => ({
  ...storyParameters(sourceFieldInput(args), design),
});

const renderGroup = ({ items }) => renderStoryGroup(items, renderFieldInput);

const groupParameters = (items, design) => ({
  ...staticStoryParametersFor(sourceStoryGroup(items, sourceFieldInput), design),
});

const renderForm = (state) => renderSubmitForm(renderFieldInput(state));

const sourceForm = (state) => sourceSubmitForm(sourceFieldInput(state));

const options = [
  { label: "Romania", value: "ro" },
  { label: "United Kingdom", value: "gb" },
  { label: "United States", value: "us" },
];

const richOptions = [
  { icon: "building", label: "Operations", value: "operations" },
  { icon: "users", label: "People", value: "people" },
  { disabled: true, icon: "settings", label: "Settings", value: "settings" },
];

const groupedOptions = [
  {
    label: "Europe",
    options: [
      { label: "Romania", value: "ro" },
      { label: "United Kingdom", value: "gb" },
    ],
  },
  {
    label: "North America",
    options: [
      { label: "United States", value: "us" },
      { label: "Canada", value: "ca" },
    ],
  },
];

const baseInput = {
  label: "Country",
  description: "Select a country",
  name: "country",
  groups: [],
  options,
  value: "ro",
};

const richInput = {
  ...baseInput,
  description: "Options can contain non-interactive markup.",
  name: "team",
  options: richOptions,
  value: "operations",
};

const groupedInput = {
  ...baseInput,
  groups: groupedOptions,
  options: [],
  value: "gb",
};

const optionValues = (items) => items.map((option) => option.value);
const groupValues = (groups) =>
  groups.flatMap((group) => optionValues(group.options));
const valueArgType = (values) => ({
  value: { control: "select", options: values },
});

const stateItems = [
  { ...baseInput },
  { ...baseInput, disabled: true },
  { ...baseInput, ariaInvalid: true },
];

const meta = {
  title: "Input Select",
  component: "ds-input-select",
  tags: ["autodocs"],
  render: renderFieldInput,
  args: baseInput,
  argTypes: {
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    ariaLabel: { control: "text", name: "aria-label" },
    description: { control: false, table: { disable: true } },
    disabled: { control: "boolean" },
    label: { control: false, table: { disable: true } },
    name: { control: "text" },
    required: { control: "boolean" },
    size: { control: "select", options: ["", "small"] },
    ...valueArgType(optionValues(options)),
    fieldWidth: { control: false, table: { disable: true } },
    groups: { control: false, table: { disable: true } },
    options: { control: false, table: { disable: true } },
    prefixIcon: { control: false, table: { disable: true } },
  },
  parameters: inputParameters(baseInput, "40020640:9290"),
};

export default meta;

export const Default = {
  args: baseInput,
  parameters: inputParameters(baseInput, "40020640:9290"),
};

export const WithPrefix = {
  args: { ...baseInput, prefixIcon: "building" },
  parameters: inputParameters(
    { ...baseInput, prefixIcon: "building" },
    "40020646:2326",
  ),
};

export const RichOptions = {
  args: richInput,
  argTypes: valueArgType(optionValues(richOptions)),
  parameters: inputParameters(richInput),
};

export const GroupedOptions = {
  args: groupedInput,
  argTypes: valueArgType(groupValues(groupedOptions)),
  parameters: inputParameters(groupedInput),
};

export const States = {
  args: { items: stateItems },
  render: renderGroup,
  parameters: groupParameters(stateItems, "40020640:9290"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const Form = {
  args: { ...baseInput, required: true },
  render: renderForm,
  parameters: {
    ...storyParameters(sourceForm({ ...baseInput, required: true })),
  },
};
