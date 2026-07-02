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

const avatarTriggerStyles = {
  "--dropdown-trigger-background": "transparent",
  "--dropdown-trigger-border": "0",
  "--dropdown-trigger-min-height": "40px",
  "--dropdown-trigger-padding": "0",
};

const dropdownStyles = (state) => ({
  ...(state.trigger.kind === "avatar" ? avatarTriggerStyles : {}),
  ...(state.width ? { "--dropdown-menu-width": state.width } : {}),
});

const iconLabel = (name) =>
  ({
    logout: "log-out",
    userPlus: "user-plus",
  })[name] || name;

const renderAvatar = (slot, avatar) => {
  const element = document.createElement("user-avatar");

  setAttributes(element, {
    slot,
    initials: avatar.initials,
    status: avatar.status,
  });

  return element;
};

const renderTrigger = (trigger) => {
  if (trigger.kind === "avatar") return renderAvatar("trigger", trigger);
  if (trigger.kind === "icon") return icon("trigger", trigger.name);
  return textSlot("trigger", trigger.label);
};

const renderHeader = (header) => {
  const element = document.createElement("drop-down-header");

  element.append(
    renderAvatar("media", header.media),
    textSlot("title", header.title),
    textSlot("description", header.description),
  );

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
      textSlot("label", item.label),
      textSlot("description", item.description),
    );
  } else {
    element.append(item.label);
  }
  if (item.end) element.append(textSlot("end", item.end));

  return element;
};

const renderGroup = (group) => {
  const element = document.createElement("drop-down-group");

  setAttributes(element, { label: group.label });
  element.append(...group.items.map(renderItem));

  return element;
};

const renderPart = (part) =>
  part.kind === "header"
    ? renderHeader(part)
    : part.kind === "separator"
      ? document.createElement("drop-down-separator")
      : renderGroup(part);

const renderDropdown = (state) => {
  const story = document.createElement("div");
  const element = document.createElement("drop-down");

  setAttributes(element, {
    align: state.align,
    "aria-label": state.ariaLabel,
    disabled: state.disabled,
    open: state.open,
  });
  setStyles(element, dropdownStyles(state));

  element.append(renderTrigger(state.trigger), ...state.content.map(renderPart));
  story.append(element);

  return story;
};

const sourceIcon = (slot, name) =>
  `<svg slot="${slot}" aria-hidden="true"><!-- ${iconLabel(name)} icon --></svg>`;

const sourceAvatar = (slot, avatar) =>
  `<user-avatar${sourceAttributes({
    slot,
    initials: avatar.initials,
    status: avatar.status,
  })}></user-avatar>`;

const sourceTrigger = (trigger) =>
  trigger.kind === "avatar"
    ? sourceAvatar("trigger", trigger)
    : trigger.kind === "icon"
      ? sourceIcon("trigger", trigger.name)
      : `<span slot="trigger">${escapeHtml(trigger.label)}</span>`;

const sourceHeader = (header) => `
<drop-down-header>
${indent(sourceAvatar("media", header.media))}
  <span slot="title">${escapeHtml(header.title)}</span>
  <span slot="description">${escapeHtml(header.description)}</span>
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
      ? `<span slot="label">${escapeHtml(item.label)}</span>`
      : escapeHtml(item.label),
    item.description &&
      `<span slot="description">${escapeHtml(item.description)}</span>`,
    item.end && `<span slot="end">${escapeHtml(item.end)}</span>`,
  ].filter(Boolean);

  return `<drop-down-item${attributes}>\n${indent(children.join("\n"))}\n</drop-down-item>`;
};

const sourceGroup = (group) => `
<drop-down-group${sourceAttributes({ label: group.label })}>
${indent(group.items.map(sourceItem).join("\n"))}
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
${indent([sourceTrigger(state.trigger), ...state.content.map(sourcePart)].join("\n"))}
</drop-down>
`;

const story = ({ design, state }) => ({
  render: () => renderDropdown(state),
  parameters: {
    ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
    docs: docsSource(sourceDropdown(state)),
  },
});

const account = {
  description: "isabel.navarro@gmail.com",
  initials: "IN",
  name: "Isabel Navarro",
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
  media: { kind: "avatar", initials: account.initials, status: "online" },
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
    trigger: { kind: "avatar", initials: account.initials, status: "online" },
  }),
  avatarOpen: dropdown({
    ariaLabel: "Account menu",
    open: true,
    trigger: { kind: "avatar", initials: account.initials, status: "online" },
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
  ...story({ design: "40020967:38534", state: states.button }),
};

export default meta;

export const Button = story({
  design: "40020967:33101",
  state: states.button,
});

export const ButtonOpen = story({
  design: "40020967:33104",
  state: states.buttonOpen,
});

export const Icon = story({
  design: "40020967:33259",
  state: states.icon,
});

export const IconOpen = story({
  design: "40020967:33356",
  state: states.iconOpen,
});

export const Avatar = story({
  design: "40020967:33715",
  state: states.avatar,
});

export const AvatarOpen = story({
  design: "40020967:33805",
  state: states.avatarOpen,
});

export const WithoutHeader = story({
  design: "40020967:22605",
  state: states.withoutHeader,
});

export const WithShortcuts = story({
  design: "40020967:23669",
  state: states.shortcuts,
});

export const RichItems = story({
  state: states.rich,
});

export const RadioItems = story({
  design: "40020967:17520",
  state: states.radio,
});

export const RadioItemsWithShortcuts = story({
  design: "40020967:17523",
  state: states.radioShortcuts,
});

export const CheckboxItems = story({
  design: "40020967:17528",
  state: states.checkbox,
});

export const CheckboxItemsWithShortcuts = story({
  design: "40020967:17531",
  state: states.checkboxShortcuts,
});
