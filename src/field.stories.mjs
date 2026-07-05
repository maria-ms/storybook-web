import "@maria-ms/components-web/button";
import "@maria-ms/components-web/field";
import "@maria-ms/components-web/input-number";
import "@maria-ms/components-web/input-select";
import "@maria-ms/components-web/input-text";
import {
  escapeHtml,
  indent,
  sourceAttributes,
  sourceStyle,
  sourceSubmitForm,
  staticStoryParametersFor,
  storyParameters,
  textSlot,
} from "./story-helpers.mjs";

const sourceOptions = `
<option value="eur">EUR</option>
<option value="usd">USD</option>
<option value="gbp">GBP</option>
`;

const field = ({
  control,
  description = "This is an input description.",
  error = "This field needs your attention.",
  invalid = false,
  label = "Label",
  width = "276px",
} = {}) => {
  const element = document.createElement("ds-field");

  element.invalid = invalid;
  element.style.width = width;
  element.append(textSlot("label", label), control);
  if (description) element.append(textSlot("description", description));
  if (error) element.append(textSlot("error", error));

  return element;
};

const textInput = ({
  ariaInvalid = false,
  name = "email",
  required = false,
  type = "email",
  value = "",
} = {}) => {
  const element = document.createElement("ds-input-text");

  element.name = name;
  element.type = type;
  element.value = value;
  element.required = required;
  if (ariaInvalid) element.setAttribute("aria-invalid", "true");

  return element;
};

const fieldSource = ({
  control = '<ds-input-text name="email" type="email"></ds-input-text>',
  description = "This is an input description.",
  error = "This field needs your attention.",
  invalid = false,
  label = "Label",
  width = "276px",
} = {}) => `<ds-field${sourceAttributes({
  invalid,
  style: sourceStyle({ width }),
})}>
  <span slot="label">${escapeHtml(label)}</span>
${indent(control)}
  <span slot="description">${escapeHtml(description)}</span>
  <span slot="error">${escapeHtml(error)}</span>
</ds-field>`;

const group = ({ invalid = false } = {}) => {
  const element = document.createElement("ds-field-group");
  const select = document.createElement("ds-input-select");
  const amount = document.createElement("ds-input-number");

  element.invalid = invalid;
  element.style.width = "276px";
  element.style.setProperty("--ds-field-group-direction", "row");
  element.style.setProperty("--ds-field-group-align-items", "flex-start");
  select.name = "currency";
  select.value = "eur";
  select.style.width = "96px";
  select.style.flex = "0 0 96px";
  select.setAttribute("aria-label", "Currency");
  ["eur", "usd", "gbp"].forEach((value) => {
    const option = document.createElement("option");

    option.value = value;
    option.textContent = value.toUpperCase();
    select.append(option);
  });
  amount.name = "amount";
  amount.value = "1250";
  amount.min = "0";
  amount.step = "0.01";
  amount.style.flex = "1 1 auto";
  amount.style.width = "auto";
  amount.setAttribute("aria-label", "Amount");
  amount.setAttribute("controls", "none");

  element.append(
    textSlot("label", "Amount"),
    select,
    amount,
    textSlot("description", "Enter the amount before tax."),
    textSlot("error", "Enter a valid amount."),
  );

  return element;
};

const groupSource = ({ invalid = false } = {}) => `<ds-field-group${sourceAttributes({
  invalid,
  style: sourceStyle({
    width: "276px",
    "--ds-field-group-direction": "row",
    "--ds-field-group-align-items": "flex-start",
  }),
})}>
  <span slot="label">Amount</span>
  <ds-input-select
    name="currency"
    value="eur"
    aria-label="Currency"
    style="width: 96px; flex: 0 0 96px;"
  >
${indent(sourceOptions, 4)}
  </ds-input-select>
  <ds-input-number
    name="amount"
    value="1250"
    min="0"
    step="0.01"
    controls="none"
    aria-label="Amount"
    style="width: auto; flex: 1 1 auto;"
  ></ds-input-number>
  <span slot="description">Enter the amount before tax.</span>
  <span slot="error">Enter a valid amount.</span>
</ds-field-group>`;

const renderForm = () => {
  const form = document.createElement("form");
  const submit = document.createElement("ds-button");
  const output = document.createElement("output");

  submit.type = "submit";
  submit.textContent = "Submit";
  output.setAttribute("aria-live", "polite");
  form.style.display = "grid";
  form.style.gap = "var(--ds-primitive-space-04)";
  form.style.width = "min(100%, 320px)";
  form.append(
    field({
      control: textInput({ name: "email", required: true, type: "email" }),
      description: "Use your work email.",
      error: "Enter a valid email address.",
      label: "Email",
    }),
    submit,
    output,
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    output.value = new URLSearchParams(new FormData(form)).toString();
  });

  return form;
};

const formSource = sourceSubmitForm(
  fieldSource({
    control: '<ds-input-text name="email" type="email" required></ds-input-text>',
    description: "Use your work email.",
    error: "Enter a valid email address.",
    label: "Email",
  }),
  {
    style:
      "display: grid; gap: var(--ds-primitive-space-04); width: min(100%, 320px);",
  },
);

const meta = {
  title: "Field",
  component: "ds-field",
  tags: ["autodocs"],
  argTypes: {
    invalid: { control: "boolean" },
  },
  args: {
    invalid: false,
  },
};

export default meta;

export const Default = {
  render: ({ invalid }) =>
    field({
      control: textInput({ ariaInvalid: invalid, value: "isabel@example.com" }),
      invalid,
    }),
  parameters: storyParameters(
    fieldSource({
      control:
        '<ds-input-text name="email" type="email" value="isabel@example.com"></ds-input-text>',
    }),
  ),
};

export const Invalid = {
  args: {
    invalid: true,
  },
  render: () =>
    field({
      control: textInput({ ariaInvalid: true, required: true }),
      invalid: true,
    }),
  parameters: staticStoryParametersFor(
    fieldSource({
      control:
        '<ds-input-text name="email" type="email" required aria-invalid="true"></ds-input-text>',
      invalid: true,
    }),
  ),
};

export const FieldGroup = {
  render: ({ invalid }) => group({ invalid }),
  parameters: storyParameters(groupSource()),
};

export const Form = {
  render: renderForm,
  parameters: staticStoryParametersFor(formSource),
};
