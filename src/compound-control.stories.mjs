import "@maria-ms/components-web/button";
import "@maria-ms/components-web/compound-control";
import "@maria-ms/components-web/field";
import "@maria-ms/components-web/input-number";
import "@maria-ms/components-web/input-select";
import {
  escapeHtml,
  indent,
  renderField,
  renderSubmitForm,
  setAttributes,
  sourceAttributes,
  sourceField,
  sourceSubmitForm,
  staticStoryParametersFor,
  storyParameters,
} from "./story-helpers.mjs";

const currencyOptions = [
  { label: "EUR", value: "eur" },
  { label: "USD", value: "usd" },
  { label: "GBP", value: "gbp" },
];

const renderOption = ({ label, value }) => {
  const option = document.createElement("option");

  option.value = value;
  option.textContent = label;

  return option;
};

const renderCompound = (state) => {
  const compound = document.createElement("ds-compound-control");
  const select = document.createElement("ds-input-select");
  const number = document.createElement("ds-input-number");

  setAttributes(compound, {
    "aria-invalid": state.ariaInvalid && "true",
  });
  setAttributes(select, {
    "aria-label": "Currency",
    name: state.currencyName,
    value: state.currency,
  });
  setAttributes(number, {
    "aria-label": "Amount",
    min: "0",
    name: state.amountName,
    step: "0.01",
    value: state.amount,
  });
  select.style.flex = "0 0 96px";
  select.append(...currencyOptions.map(renderOption));
  compound.append(select, number);

  return compound;
};

const sourceOptions = () =>
  currencyOptions
    .map(
      ({ label, value }) =>
        `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`,
    )
    .join("\n");

const sourceCompound = (state) => `<ds-compound-control${sourceAttributes({
  "aria-invalid": state.ariaInvalid && "true",
})}>
  <ds-input-select
    name="${escapeHtml(state.currencyName)}"
    value="${escapeHtml(state.currency)}"
    aria-label="Currency"
    style="flex: 0 0 96px;"
  >
${indent(sourceOptions(), 4)}
  </ds-input-select>
  <ds-input-number
    name="${escapeHtml(state.amountName)}"
    value="${escapeHtml(state.amount)}"
    min="0"
    step="0.01"
    aria-label="Amount"
  ></ds-input-number>
</ds-compound-control>`;

const fieldOptions = (state) => ({
  description: state.description,
  error: state.error,
  invalid: state.ariaInvalid,
  label: state.label,
  width: "360px",
});

const renderCompoundField = (state) =>
  renderField(renderCompound(state), fieldOptions(state));

const sourceCompoundField = (state) =>
  sourceField(sourceCompound(state), fieldOptions(state));

const baseInput = {
  amount: "1250",
  amountName: "amount",
  currency: "eur",
  currencyName: "currency",
  description: "Enter the amount before tax.",
  error: "Enter a valid amount.",
  label: "Amount",
};

const meta = {
  title: "Compound Control",
  component: "ds-compound-control",
  tags: ["autodocs"],
  render: renderCompound,
  args: baseInput,
  argTypes: {
    amount: { control: "text" },
    currency: {
      control: "select",
      options: currencyOptions.map((option) => option.value),
    },
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    amountName: { control: false, table: { disable: true } },
    currencyName: { control: false, table: { disable: true } },
    description: { control: false, table: { disable: true } },
    error: { control: false, table: { disable: true } },
    label: { control: false, table: { disable: true } },
  },
  parameters: storyParameters(sourceCompound(baseInput)),
};

export default meta;

export const Standalone = {
  args: baseInput,
  parameters: storyParameters(sourceCompound(baseInput)),
};

export const WithField = {
  args: baseInput,
  render: renderCompoundField,
  parameters: storyParameters(sourceCompoundField(baseInput)),
};

export const Invalid = {
  args: { ...baseInput, ariaInvalid: true },
  render: renderCompoundField,
  parameters: storyParameters(sourceCompoundField({ ...baseInput, ariaInvalid: true })),
};

export const Form = {
  args: baseInput,
  render: (args) => renderSubmitForm(renderCompoundField(args), { width: "360px" }),
  parameters: staticStoryParametersFor(
    sourceSubmitForm(sourceCompoundField(baseInput), {
      style: "display: grid; gap: var(--ds-primitive-space-04); width: 360px;",
    }),
  ),
};
