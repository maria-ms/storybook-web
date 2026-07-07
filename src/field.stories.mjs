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
  sourceField,
  sourceSubmitForm,
  staticStoryParametersFor,
  storyParameters,
  textSlot,
} from "./story-helpers.mjs";

const options = [
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

const renderNumber = ({ ariaInvalid = false, value = "12" } = {}) => {
  const input = document.createElement("ds-input-number");

  setAttributes(input, {
    "aria-invalid": ariaInvalid && "true",
    "aria-label": "Amount",
    min: "0",
    name: "amount",
    step: "1",
    value,
  });

  return input;
};

const sourceNumber = ({ ariaInvalid = false, value = "12" } = {}) =>
  `<ds-input-number name="amount" value="${escapeHtml(value)}" min="0" step="1" aria-label="Amount"${ariaInvalid ? ' aria-invalid="true"' : ""}></ds-input-number>`;

const renderCompound = ({ ariaInvalid = false } = {}) => {
  const compound = document.createElement("ds-compound-control");
  const select = document.createElement("ds-input-select");
  const amount = document.createElement("ds-input-number");

  setAttributes(compound, { "aria-invalid": ariaInvalid && "true" });
  setAttributes(select, {
    "aria-label": "Currency",
    name: "currency",
    value: "eur",
  });
  setAttributes(amount, {
    "aria-label": "Amount",
    min: "0",
    name: "amount",
    step: "0.01",
    value: "1250",
  });
  select.style.flex = "0 0 96px";
  select.append(...options.map(renderOption));
  compound.append(select, amount);

  return compound;
};

const sourceOptions = options
  .map(
    ({ label, value }) =>
      `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`,
  )
  .join("\n");

const sourceCompound = ({ ariaInvalid = false } = {}) => `<ds-compound-control${ariaInvalid ? ' aria-invalid="true"' : ""}>
  <ds-input-select name="currency" value="eur" aria-label="Currency" style="flex: 0 0 96px;">
${indent(sourceOptions, 4)}
  </ds-input-select>
  <ds-input-number name="amount" value="1250" min="0" step="0.01" aria-label="Amount"></ds-input-number>
</ds-compound-control>`;

const fieldOptions = ({ invalid = false } = {}) => ({
  description: "Enter the amount before tax.",
  error: "Enter a valid amount.",
  invalid,
  label: "Amount",
  width: "276px",
});

const compoundFieldOptions = ({ invalid = false } = {}) => ({
  ...fieldOptions({ invalid }),
  width: "360px",
});

const renderNumberField = ({ invalid = false } = {}) =>
  renderField(renderNumber({ ariaInvalid: invalid }), fieldOptions({ invalid }));

const sourceNumberField = ({ invalid = false } = {}) =>
  sourceField(sourceNumber({ ariaInvalid: invalid }), fieldOptions({ invalid }));

const renderCompoundField = ({ invalid = false } = {}) =>
  renderField(renderCompound({ ariaInvalid: invalid }), compoundFieldOptions({ invalid }));

const sourceCompoundField = ({ invalid = false } = {}) =>
  sourceField(sourceCompound({ ariaInvalid: invalid }), compoundFieldOptions({ invalid }));

const renderFieldOnly = () => {
  const field = document.createElement("ds-field");

  field.style.width = "276px";
  field.append(
    textSlot("label", "Amount"),
    renderNumber(),
    textSlot("description", "Enter the amount before tax."),
    textSlot("error", "Enter a valid amount."),
  );

  return field;
};

const meta = {
  title: "Field",
  component: "ds-field",
  tags: ["autodocs"],
  render: renderFieldOnly,
  args: {
    invalid: false,
  },
  argTypes: {
    invalid: { control: "boolean" },
  },
  parameters: storyParameters(sourceNumberField()),
};

export default meta;

export const WithControl = {
  render: renderNumberField,
  parameters: storyParameters(sourceNumberField()),
};

export const Invalid = {
  args: {
    invalid: true,
  },
  render: renderNumberField,
  parameters: staticStoryParametersFor(sourceNumberField({ invalid: true })),
};

export const WithCompoundControl = {
  render: renderCompoundField,
  parameters: storyParameters(sourceCompoundField()),
};

export const Form = {
  render: () => renderSubmitForm(renderCompoundField(), { width: "360px" }),
  parameters: staticStoryParametersFor(
    sourceSubmitForm(sourceCompoundField(), {
      style: "display: grid; gap: var(--ds-primitive-space-04); width: 360px;",
    }),
  ),
};
