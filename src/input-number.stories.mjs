import "@maria-ms/components-web/button";
import "@maria-ms/components-web/field";
import "@maria-ms/components-web/input-number";
import {
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
  autocomplete: state.autocomplete,
  disabled: state.disabled,
  inputmode: state.inputmode,
  max: state.max,
  min: state.min,
  name: state.name,
  placeholder: state.placeholder,
  readonly: state.readonly,
  required: state.required,
  step: state.step,
  value: state.value,
  "aria-invalid": state.ariaInvalid && "true",
  "aria-label": state.ariaLabel,
});

const renderInput = (state) => {
  const element = document.createElement("ds-input-number");

  setAttributes(element, inputAttributes(state));

  return element;
};

const sourceInput = (state) =>
  `<ds-input-number${sourceAttributes(inputAttributes(state))}></ds-input-number>`;

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
  ariaLabel: "Amount",
  description: "Enter the amount before tax.",
  label: "Amount",
  min: "0",
  name: "amount",
  placeholder: "0",
  step: "1",
  value: "12",
};

const stateItems = [
  { ...baseInput },
  { ...baseInput, disabled: true },
  { ...baseInput, ariaInvalid: true },
];

const meta = {
  title: "Input Number",
  component: "ds-input-number",
  tags: ["autodocs"],
  render: renderInput,
  args: baseInput,
  argTypes: {
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    ariaLabel: { control: "text", name: "aria-label" },
    autocomplete: { control: "text" },
    disabled: { control: "boolean" },
    inputmode: { control: "text" },
    max: { control: "text" },
    min: { control: "text" },
    name: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    step: { control: "text" },
    value: { control: "text" },
    description: { control: false, table: { disable: true } },
    error: { control: false, table: { disable: true } },
    label: { control: false, table: { disable: true } },
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
