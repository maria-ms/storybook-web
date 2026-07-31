import "@maria-ms/components-web/textarea";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022294-52&m=dev";

const textarea = ({
  invalid = false,
  disabled = false,
  name = "message",
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
  invalid ? control.setAttribute("aria-invalid", "true") : control.removeAttribute("aria-invalid");
  component.append(control);

  return component;
};

export default {
  title: "Components/Textarea",
  component: "ds-textarea",
  args: {
    invalid: false,
    disabled: false,
    name: "message",
    placeholder: "Type your message…",
    readOnly: false,
    required: false,
    rows: 3,
    value: "Type your message…",
  },
  argTypes: {
    name: { control: "text", table: { category: "Native behavior" } },
    placeholder: {
      control: "text",
      description: "Native textarea placeholder; it is not a ds-textarea attribute.",
      table: { category: "Content" },
    },
    value: {
      control: "text",
      description: "Native textarea value; it is not a ds-textarea attribute.",
      table: { category: "Content" },
    },
    rows: {
      control: { type: "number", min: 1, step: 1 },
      description: "Native textarea rows. The component's token-backed minimum height still applies.",
      table: { category: "Native behavior" },
    },
    disabled: { control: "boolean", table: { category: "Native behavior" } },
    readOnly: { control: "boolean", table: { category: "Native behavior" } },
    required: { control: "boolean", table: { category: "Native behavior" } },
    invalid: {
      control: "boolean",
      description: "Maps to aria-invalid=\"true\" on the native textarea; it is not a ds-textarea attribute.",
      table: { category: "Validation" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: textarea,
};

export const Playground = {};
