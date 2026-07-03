import "@maria-ms/components-web/avatar";
import "@maria-ms/components-web/dropdown";
import { icon } from "./icons.mjs";
import {
  docsSource,
  escapeHtml,
  figmaNodeUrl,
  indent,
  setAttributes,
  sourceAttributes,
  sourceStyle,
  setStyles,
  textSlot,
} from "./story-helpers.mjs";

const chevronPaths = {
  down: "M4 6L8 10L12 6",
  up: "M4 10L8 6L12 10",
};

const contentParts = (state) => (Array.isArray(state.content) ? state.content : []);

const groupItems = (group) => (Array.isArray(group.items) ? group.items : []);

const dropdownStyles = (state) => ({
  ...(state.width ? { "--dropdown-menu-width": state.width } : {}),
});

const storyStyles = () => {
  const element = document.createElement("style");

  element.textContent = `
    .dropdown-story-trigger {
      box-sizing: border-box;
      display: inline-flex;
      min-height: 28px;
      align-items: center;
      justify-content: center;
      gap: var(--ds-primitive-space-02);
      border: 1px solid var(--ds-component-button-color-border-primary);
      border-radius: var(--ds-primitive-radius-04);
      padding: var(--ds-primitive-space-02) var(--ds-primitive-space-03);
      appearance: none;
      background: var(--ds-component-button-color-background-tertiary);
      color: var(--ds-component-button-color-foreground-primary);
      font: inherit;
      font-size: var(--ds-primitive-font-size-small);
      font-weight: var(--ds-primitive-font-weight-semibold);
      line-height: var(--ds-primitive-font-line-height-small);
      letter-spacing: 0;
      text-decoration: none;
      cursor: pointer;
    }

    .dropdown-story-trigger--avatar {
      min-height: 40px;
      border: 0;
      border-radius: var(--ds-primitive-radius-full);
      padding: 0;
      background: transparent;
    }

    .dropdown-story-trigger:focus-visible,
    drop-down[open] > .dropdown-story-trigger {
      outline: 0;
      box-shadow:
        var(--ds-semantic-shadow-xs-offset-x)
          var(--ds-semantic-shadow-xs-offset-y)
          var(--ds-semantic-shadow-xs-blur)
          var(--ds-semantic-shadow-xs-spread)
          var(--ds-semantic-shadow-xs-color),
        var(--ds-semantic-shadow-focused-4px-offset-x)
          var(--ds-semantic-shadow-focused-4px-offset-y)
          var(--ds-semantic-shadow-focused-4px-blur)
          var(--ds-semantic-shadow-focused-4px-spread)
          var(--ds-semantic-shadow-focused-4px-color);
    }

    .dropdown-story-trigger svg {
      width: var(--ds-primitive-space-05);
      height: var(--ds-primitive-space-05);
      flex: 0 0 auto;
      stroke: currentColor;
    }
  `;

  return element;
};

const iconLabel = (name) =>
  ({
    logout: "log-out",
    userPlus: "user-plus",
  })[name] || name;

const avatarSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" fill="#d1d5db"/>
    <circle cx="40" cy="30" r="14" fill="#374151"/>
    <path d="M15 80c4-17 13.5-27 25-27s21 10 25 27" fill="#374151"/>
  </svg>
`);

const avatarImage = `data:image/svg+xml,${avatarSvg}`;

const avatarMedia = ({ alt }) => {
  const element = document.createElement("img");

  element.src = avatarImage;
  element.srcset = `${avatarImage} 1x, ${avatarImage} 2x`;
  element.alt = alt;

  return element;
};

const renderAvatar = (slot, avatar = {}) => {
  const element = document.createElement("user-avatar");

  setAttributes(element, {
    slot,
    initials: avatar.initials,
    size: avatar.size,
    status: avatar.status,
  });
  if (avatar.media) element.append(avatarMedia(avatar.media));

  return element;
};

const triggerChevron = (open) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");

  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("fill", "none");
  svg.setAttribute("aria-hidden", "true");
  shape.setAttribute("d", chevronPaths[open ? "up" : "down"]);
  shape.setAttribute("stroke", "currentColor");
  shape.setAttribute("stroke-width", "1.5");
  shape.setAttribute("stroke-linecap", "round");
  shape.setAttribute("stroke-linejoin", "round");
  svg.append(shape);

  return svg;
};

const renderTrigger = (trigger = {}, open = false) => {
  const button = document.createElement("button");

  button.slot = "trigger";
  button.type = "button";
  button.className = "dropdown-story-trigger";

  if (trigger.kind === "avatar") {
    button.classList.add("dropdown-story-trigger--avatar");
    button.append(renderAvatar(undefined, trigger));
    return button;
  }

  if (trigger.kind === "icon") {
    button.append(icon(undefined, trigger.name), triggerChevron(open));
    return button;
  }

  button.append(trigger.label || "Account", triggerChevron(open));
  return button;
};

const renderHeader = (header) => {
  const element = document.createElement("drop-down-header");

  if (header.media) element.append(renderAvatar("media", header.media));
  if (header.title) element.append(textSlot("title", header.title));
  if (header.description) {
    element.append(textSlot("description", header.description));
  }

  return element;
};

const renderItem = (item) => {
  const element = document.createElement("drop-down-item");

  setAttributes(element, {
    checked: item.checked,
    disabled: item.disabled,
    href: item.href,
    name: item.name,
    rel: item.rel,
    target: item.target,
    type: item.type,
    value: item.value,
  });

  if (item.icon) element.append(icon("media", item.icon));
  if (item.description) {
    element.append(
      textSlot("label", item.label || ""),
      textSlot("description", item.description || ""),
    );
  } else {
    element.append(item.label || "");
  }
  if (item.end) element.append(textSlot("end", item.end));

  return element;
};

const renderGroup = (group) => {
  const element = document.createElement("drop-down-group");

  setAttributes(element, { label: group.label });
  element.append(...groupItems(group).map(renderItem));

  return element;
};

const renderPart = (part) =>
  part.kind === "header"
    ? renderHeader(part)
    : part.kind === "separator"
      ? document.createElement("drop-down-separator")
      : renderGroup(part);

const renderDropdown = (state) => {
  const container = document.createElement("div");
  const element = document.createElement("drop-down");

  setAttributes(element, {
    align: state.align,
    "aria-label": state.ariaLabel,
    disabled: state.disabled,
    open: state.open,
  });
  setStyles(element, dropdownStyles(state));

  element.append(
    renderTrigger(state.trigger, state.open),
    ...contentParts(state).map(renderPart),
  );
  container.append(storyStyles(), element);

  return container;
};

const sourceIcon = (slot, name) =>
  `<svg${sourceAttributes({ slot, "aria-hidden": "true" })}><!-- ${iconLabel(name)} icon --></svg>`;

const sourceAvatar = (slot, avatar = {}) =>
  `<user-avatar${sourceAttributes({
    slot,
    initials: avatar.initials,
    size: avatar.size,
    status: avatar.status,
  })}>${
    avatar.media
      ? `
  <img src="/avatar.jpg" alt="${escapeHtml(avatar.media.alt)}" />
`
      : ""
  }</user-avatar>`;

const sourceChevron = (open) =>
  `<svg aria-hidden="true"><!-- chevron-${open ? "up" : "down"} icon --></svg>`;

const sourceTrigger = (trigger = {}, open = false) =>
  trigger.kind === "avatar"
    ? `<button slot="trigger" type="button">\n${indent(sourceAvatar(undefined, trigger))}\n</button>`
    : trigger.kind === "icon"
      ? `<button slot="trigger" type="button">\n${indent(
          [sourceIcon(undefined, trigger.name), sourceChevron(open)].join("\n"),
        )}\n</button>`
      : `<button slot="trigger" type="button">${escapeHtml(trigger.label || "Account")} ${sourceChevron(open)}</button>`;

const sourceHeader = (header) => `
<drop-down-header>
${indent(
  [
    header.media && sourceAvatar("media", header.media),
    header.title && `<span slot="title">${escapeHtml(header.title)}</span>`,
    header.description &&
      `<span slot="description">${escapeHtml(header.description)}</span>`,
  ]
    .filter(Boolean)
    .join("\n"),
)}
</drop-down-header>
`;

const sourceItem = (item) => {
  const attributes = sourceAttributes({
    href: item.href,
    target: item.target,
    rel: item.rel,
    checked: item.checked,
    disabled: item.disabled,
    name: item.name,
    type: item.type,
    value: item.value,
  });
  const children = [
    item.icon && sourceIcon("media", item.icon),
    item.description
      ? `<span slot="label">${escapeHtml(item.label || "")}</span>`
      : escapeHtml(item.label || ""),
    item.description &&
      `<span slot="description">${escapeHtml(item.description)}</span>`,
    item.end && `<span slot="end">${escapeHtml(item.end)}</span>`,
  ].filter(Boolean);

  return `<drop-down-item${attributes}>\n${indent(children.join("\n"))}\n</drop-down-item>`;
};

const sourceGroup = (group) => `
<drop-down-group${sourceAttributes({ label: group.label })}>
${indent(groupItems(group).map(sourceItem).join("\n"))}
</drop-down-group>
`;

const sourcePart = (part) =>
  part.kind === "header"
    ? sourceHeader(part)
    : part.kind === "separator"
      ? "<drop-down-separator></drop-down-separator>"
      : sourceGroup(part);

const sourceDropdown = (state) => `
<drop-down${sourceAttributes({
  open: state.open,
  "aria-label": state.ariaLabel,
  disabled: state.disabled,
  align: state.align,
  style: sourceStyle(dropdownStyles(state)),
})}>
${indent([sourceTrigger(state.trigger, state.open), ...contentParts(state).map(sourcePart)].join("\n"))}
</drop-down>
`;

const dropdownParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceDropdown(args)),
});

const account = {
  description: "isabel.navarro@gmail.com",
  initials: "IN",
  name: "Isabel Navarro",
};

const accountAvatar = {
  kind: "avatar",
  initials: account.initials,
  media: { alt: account.name },
  size: "md",
  status: "online",
};

const accountGroups = [
  {
    kind: "group",
    items: [
      {
        href: "#profile",
        icon: "user",
        label: "View profile",
        value: "view-profile",
      },
      { icon: "settings", label: "Settings", value: "settings" },
      {
        icon: "keyboard",
        label: "Keyboard shortcuts",
        value: "keyboard-shortcuts",
      },
    ],
  },
  { kind: "separator" },
  {
    kind: "group",
    items: [
      {
        icon: "building",
        label: "Company profile",
        value: "company-profile",
      },
      { icon: "users", label: "Team", value: "team" },
      {
        icon: "userPlus",
        label: "Invite colleagues",
        value: "invite-colleagues",
      },
    ],
  },
  { kind: "separator" },
  {
    kind: "group",
    items: [
      { icon: "history", label: "Changelog", value: "changelog" },
      { icon: "slack", label: "Slack", value: "slack" },
      { icon: "support", label: "Support", value: "support" },
      { icon: "code", label: "API", value: "api" },
    ],
  },
  { kind: "separator" },
  {
    kind: "group",
    items: [{ icon: "logout", label: "Log out", value: "log-out" }],
  },
];

const accountHeader = {
  kind: "header",
  media: accountAvatar,
  title: account.name,
  description: account.description,
};

const accountContent = [accountHeader, { kind: "separator" }, ...accountGroups];

const dropdown = (state = {}) => ({
  align: "end",
  trigger: { kind: "text", label: "Account" },
  content: accountContent,
  ...state,
});

const choiceContent = ({ kind, shortcuts = false }) => [
  {
    kind: "group",
    items: [
      {
        end: shortcuts ? "⌘C" : "",
        label: "List item",
        name: kind === "radio" ? "choice" : "",
        type: kind,
        value: "one",
      },
      {
        checked: true,
        end: shortcuts ? "⌘C" : "",
        label: "List item",
        name: kind === "radio" ? "choice" : "",
        type: kind,
        value: "two",
      },
      {
        disabled: true,
        end: shortcuts ? "⌘C" : "",
        label: "List item",
        name: kind === "radio" ? "choice" : "",
        type: kind,
        value: "three",
      },
    ],
  },
];

const states = {
  avatar: dropdown({
    ariaLabel: "Account menu",
    trigger: accountAvatar,
  }),
  avatarOpen: dropdown({
    ariaLabel: "Account menu",
    open: true,
    trigger: accountAvatar,
  }),
  button: dropdown(),
  buttonOpen: dropdown({ open: true }),
  checkbox: dropdown({ open: true, content: choiceContent({ kind: "checkbox" }) }),
  checkboxShortcuts: dropdown({
    open: true,
    content: choiceContent({ kind: "checkbox", shortcuts: true }),
  }),
  icon: dropdown({
    ariaLabel: "Account menu",
    trigger: { kind: "icon", name: "settings" },
  }),
  iconOpen: dropdown({
    ariaLabel: "Account menu",
    open: true,
    trigger: { kind: "icon", name: "settings" },
  }),
  radio: dropdown({ open: true, content: choiceContent({ kind: "radio" }) }),
  radioShortcuts: dropdown({
    open: true,
    content: choiceContent({ kind: "radio", shortcuts: true }),
  }),
  rich: dropdown({
    open: true,
    width: "280px",
    content: [
      {
        kind: "group",
        items: [
          {
            description: "12 members",
            end: "Owner",
            icon: "building",
            label: "Acme Workspace",
            value: "acme-workspace",
          },
          {
            description: "Connected",
            end: "Active",
            icon: "slack",
            label: "Slack",
            value: "slack-connected",
          },
          {
            description: "Long labels truncate when space is constrained.",
            label: "A longer menu item label",
            value: "long-row",
          },
        ],
      },
    ],
  }),
  shortcuts: dropdown({
    open: true,
    content: [
      {
        kind: "group",
        items: [
          { end: "⌘C", label: "Copy", value: "copy" },
          { end: "⌘V", label: "Paste", value: "paste" },
        ],
      },
      { kind: "separator" },
      {
        kind: "group",
        items: [
          {
            checked: true,
            end: "⌘B",
            label: "Show toolbar",
            type: "checkbox",
            value: "toolbar",
          },
        ],
      },
    ],
  }),
  withoutHeader: dropdown({ open: true, content: accountGroups }),
};

const meta = {
  title: "Dropdown",
  component: "drop-down",
  tags: ["autodocs"],
  render: renderDropdown,
  args: states.button,
  argTypes: {
    align: { control: "select", options: ["start", "end"] },
    ariaLabel: { control: "text", name: "aria-label" },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
    width: {
      control: "text",
      name: "--dropdown-menu-width",
      table: { category: "CSS custom properties" },
    },
    content: { control: false, table: { disable: true } },
    trigger: { control: false, table: { disable: true } },
  },
  parameters: dropdownParameters(states.button, "40020967:38534"),
};

export default meta;

export const Button = {
  args: states.button,
  parameters: dropdownParameters(states.button, "40020967:33101"),
};

export const ButtonOpen = {
  args: states.buttonOpen,
  parameters: dropdownParameters(states.buttonOpen, "40020967:33104"),
};

export const Icon = {
  args: states.icon,
  parameters: dropdownParameters(states.icon, "40020967:33259"),
};

export const IconOpen = {
  args: states.iconOpen,
  parameters: dropdownParameters(states.iconOpen, "40020967:33356"),
};

export const Avatar = {
  args: states.avatar,
  parameters: dropdownParameters(states.avatar, "40020967:33715"),
};

export const AvatarOpen = {
  args: states.avatarOpen,
  parameters: dropdownParameters(states.avatarOpen, "40020967:33805"),
};

export const WithoutHeader = {
  args: states.withoutHeader,
  parameters: dropdownParameters(states.withoutHeader, "40020967:22605"),
};

export const WithShortcuts = {
  args: states.shortcuts,
  parameters: dropdownParameters(states.shortcuts, "40020967:23669"),
};

export const RichItems = {
  args: states.rich,
  parameters: dropdownParameters(states.rich),
};

export const RadioItems = {
  args: states.radio,
  parameters: dropdownParameters(states.radio, "40020967:17520"),
};

export const RadioItemsWithShortcuts = {
  args: states.radioShortcuts,
  parameters: dropdownParameters(states.radioShortcuts, "40020967:17523"),
};

export const CheckboxItems = {
  args: states.checkbox,
  parameters: dropdownParameters(states.checkbox, "40020967:17528"),
};

export const CheckboxItemsWithShortcuts = {
  args: states.checkboxShortcuts,
  parameters: dropdownParameters(states.checkboxShortcuts, "40020967:17531"),
};
