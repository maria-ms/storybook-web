import "@maria-ms/components-web/textarea";
import { fn } from "storybook/test";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022294-52&m=dev";

const textarea = ({
  ariaInvalid = false,
  disabled = false,
  name = "message",
  onChange,
  onInput,
  placeholder = "Type your message…",
  readOnly = false,
  required = false,
  rows = 3,
  value = "Type your message…",
} = {}) => {
  const component = document.createElement("ds-textarea");
  const control = document.createElement("textarea");

  control.name = name;
  control.placeholder = placeholder;
  control.value = value;
  control.rows = rows;
  control.disabled = disabled;
  control.readOnly = readOnly;
  control.required = required;
  if (ariaInvalid) control.setAttribute("aria-invalid", "true");
  if (onInput) control.addEventListener("input", onInput);
  if (onChange) control.addEventListener("change", onChange);
  component.append(control);

  return component;
};

export default {
  title: "Components/Textarea",
  component: "ds-textarea",
  args: {
    ariaInvalid: false,
    disabled: false,
    name: "message",
    placeholder: "Type your message…",
    readOnly: false,
    required: false,
    rows: 3,
    value: "Type your message…",
    onInput: fn(),
    onChange: fn(),
  },
  argTypes: {
    name: { control: "text", table: { category: "Native textarea" } },
    placeholder: {
      control: "text",
      description: "Native textarea placeholder. This is the Figma Preview text mapping, not a ds-textarea attribute.",
      table: { category: "Native textarea" },
    },
    value: {
      control: "text",
      description: "Native textarea value. This is the Figma Value preview mapping, not a ds-textarea attribute.",
      table: { category: "Native textarea" },
    },
    rows: {
      control: { type: "number", min: 1, step: 1 },
      description: "Native textarea rows. The component's token-backed minimum height still applies.",
      table: { category: "Native textarea" },
    },
    disabled: { control: "boolean", table: { category: "Native state" } },
    readOnly: { control: "boolean", table: { category: "Native state" } },
    required: { control: "boolean", table: { category: "Native validation" } },
    ariaInvalid: {
      control: "boolean",
      description: "Maps to aria-invalid=\"true\" on the native textarea; it is not a ds-textarea attribute.",
      table: { category: "Native validation" },
    },
    onInput: { action: "input", control: false, table: { category: "Events" } },
    onChange: { action: "change", control: false, table: { category: "Events" } },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: textarea,
};

export const Playground = {};
