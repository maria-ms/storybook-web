import "@maria-ms/components-web/button";
import "@maria-ms/components-web/field";
import "@maria-ms/components-web/input-select";
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

const options = [
  { label: "Romania", value: "ro" },
  { label: "United Kingdom", value: "gb" },
  { label: "United States", value: "us" },
];

const inputAttributes = (state) => ({
  disabled: state.disabled,
  name: state.name,
  required: state.required,
  value: state.value,
  "aria-invalid": state.ariaInvalid && "true",
  "aria-label": state.ariaLabel,
});

const renderOption = ({ label, value }) => {
  const option = document.createElement("option");

  option.value = value;
  option.textContent = label;

  return option;
};

const renderInput = (state) => {
  const element = document.createElement("ds-input-select");

  setAttributes(element, inputAttributes(state));
  element.append(...state.options.map(renderOption));

  return element;
};

const sourceOption = ({ label, value }) =>
  `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;

const sourceInput = (state) => `<ds-input-select${sourceAttributes(inputAttributes(state))}>
${indent(state.options.map(sourceOption).join("\n"))}
</ds-input-select>`;

const fieldOptions = (state) => ({
  description: state.description,
  error: state.error,
  invalid: state.ariaInvalid,
  label: state.label,
  width: "276px",
});

const renderFieldInput = (state) =>
  renderField(renderInput(state), fieldOptions(state));

const sourceFieldInput = (state) =>
  sourceField(sourceInput(state), fieldOptions(state));

const baseInput = {
  ariaLabel: "Country",
  description: "Select a country.",
  label: "Country",
  name: "country",
  options,
  value: "ro",
};

const stateItems = [
  { ...baseInput },
  { ...baseInput, disabled: true },
  { ...baseInput, ariaInvalid: true },
];

const meta = {
  title: "Input Select",
  component: "ds-input-select",
  tags: ["autodocs"],
  render: renderInput,
  args: baseInput,
  argTypes: {
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    ariaLabel: { control: "text", name: "aria-label" },
    disabled: { control: "boolean" },
    name: { control: "text" },
    required: { control: "boolean" },
    value: { control: "select", options: options.map((option) => option.value) },
    description: { control: false, table: { disable: true } },
    error: { control: false, table: { disable: true } },
    label: { control: false, table: { disable: true } },
    options: { control: false, table: { disable: true } },
  },
  parameters: storyParameters(sourceInput(baseInput)),
};

export default meta;

export const Standalone = {
  args: baseInput,
  parameters: storyParameters(sourceInput(baseInput)),
};

export const WithField = {
  args: baseInput,
  render: renderFieldInput,
  parameters: storyParameters(sourceFieldInput(baseInput)),
};

export const States = {
  args: { items: stateItems },
  render: ({ items }) => renderStoryGroup(items, renderInput),
  parameters: staticStoryParametersFor(sourceStoryGroup(stateItems, sourceInput)),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const Form = {
  args: { ...baseInput, required: true },
  render: (args) => renderSubmitForm(renderFieldInput(args), { width: "276px" }),
  parameters: staticStoryParametersFor(
    sourceSubmitForm(sourceFieldInput({ ...baseInput, required: true }), {
      style: "display: grid; gap: var(--ds-primitive-space-04); width: 276px;",
    }),
  ),
};
