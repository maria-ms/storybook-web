import "@maria-ms/components-web/button";
import "@maria-ms/components-web/input-search";
import { icon } from "./icons.mjs";
import {
  docsSource,
  escapeHtml,
  figmaNodeUrl,
  indent,
  setAttributes,
  sourceAttributes,
  staticStoryParameters,
  textSlot,
} from "./story-helpers.mjs";

const inputAttributes = (state) => ({
  autocomplete: state.autocomplete,
  disabled: state.disabled,
  name: state.name,
  placeholder: state.placeholder,
  readonly: state.readonly,
  required: state.required,
  size: state.size,
  value: state.value,
  "aria-invalid": state.ariaInvalid && "true",
  "aria-label": state.ariaLabel,
});

const renderInput = (state) => {
  const element = document.createElement("ds-input-search");

  setAttributes(element, inputAttributes(state));
  if (state.label) element.append(textSlot("label", state.label));
  if (state.description) element.append(textSlot("description", state.description));
  if (state.prefixIcon) element.append(icon("prefix", state.prefixIcon));
  if (state.suffixIcon) element.append(icon("suffix", state.suffixIcon));

  return element;
};

const sourceInput = (state) => {
  const children = [
    state.label && `<span slot="label">${escapeHtml(state.label)}</span>`,
    state.description &&
      `<span slot="description">${escapeHtml(state.description)}</span>`,
    state.prefixIcon &&
      `<svg slot="prefix" aria-hidden="true"><!-- ${state.prefixIcon} icon --></svg>`,
    state.suffixIcon &&
      `<svg slot="suffix" aria-hidden="true"><!-- ${state.suffixIcon} icon --></svg>`,
  ].filter(Boolean);

  return children.length
    ? `<ds-input-search${sourceAttributes(inputAttributes(state))}>\n${indent(
        children.join("\n"),
      )}\n</ds-input-search>`
    : `<ds-input-search${sourceAttributes(inputAttributes(state))}></ds-input-search>`;
};

const inputParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceInput(args)),
});

const renderGroup = ({ items }) => {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.alignItems = "flex-start";
  container.style.flexWrap = "wrap";
  container.style.gap = "var(--ds-primitive-space-06)";
  container.append(...items.map(renderInput));

  return container;
};

const groupParameters = (items, design) => ({
  ...staticStoryParameters,
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(`<div>\n${indent(items.map(sourceInput).join("\n"))}\n</div>`),
});

const renderForm = (state) => {
  const form = document.createElement("form");
  const button = document.createElement("ds-button");
  const output = document.createElement("output");

  button.type = "submit";
  button.textContent = "Submit";
  output.setAttribute("aria-live", "polite");
  form.style.display = "grid";
  form.style.gap = "var(--ds-primitive-space-04)";
  form.append(renderInput(state), button, output);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    output.value = new URLSearchParams(new FormData(form)).toString();
  });

  return form;
};

const sourceForm = (state) => `
<form>
${indent(sourceInput(state))}
  <ds-button type="submit">Submit</ds-button>
  <output></output>
</form>
`;

const baseInput = {
  ariaLabel: "Search",
  name: "search",
  placeholder: "Search",
};

const stateItems = [
  { ...baseInput },
  { ...baseInput, value: "Settings" },
  { ...baseInput, disabled: true, value: "Settings" },
];

const meta = {
  title: "Input Search",
  component: "ds-input-search",
  tags: ["autodocs"],
  render: renderInput,
  args: baseInput,
  argTypes: {
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    ariaLabel: { control: "text", name: "aria-label" },
    autocomplete: { control: "text" },
    disabled: { control: "boolean" },
    name: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "select", options: ["", "small"] },
    value: { control: "text" },
    description: { control: false, table: { disable: true } },
    label: { control: false, table: { disable: true } },
    prefixIcon: { control: false, table: { disable: true } },
    suffixIcon: { control: false, table: { disable: true } },
  },
  parameters: inputParameters(baseInput, "40008734:168"),
};

export default meta;

export const Default = {
  args: baseInput,
  parameters: inputParameters(baseInput, "40008734:168"),
};

export const WithSuffix = {
  args: { ...baseInput, suffixIcon: "settings", value: "Settings" },
  parameters: inputParameters(
    { ...baseInput, suffixIcon: "settings", value: "Settings" },
    "40008734:168",
  ),
};

export const States = {
  args: { items: stateItems },
  render: renderGroup,
  parameters: groupParameters(stateItems, "40008734:168"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const Form = {
  args: { ...baseInput, required: true },
  render: renderForm,
  parameters: {
    docs: docsSource(sourceForm({ ...baseInput, required: true })),
  },
};
