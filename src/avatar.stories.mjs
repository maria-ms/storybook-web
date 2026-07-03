import "@maria-ms/components-web/avatar";
import {
  docsSource,
  escapeHtml,
  setAttributes,
  sourceAttributes,
} from "./story-helpers.mjs";

const avatarSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" fill="#d1d5db"/>
    <circle cx="40" cy="30" r="14" fill="#374151"/>
    <path d="M15 80c4-17 13.5-27 25-27s21 10 25 27" fill="#374151"/>
  </svg>
`);

const companySvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" fill="#111827"/>
    <path d="M18 58 40 16l22 42H48l-8-16-8 16H18Z" fill="#f9fafb"/>
  </svg>
`);

const previewImage = `data:image/svg+xml,${avatarSvg}`;
const companyImage = `data:image/svg+xml,${companySvg}`;

const image = ({ alt, slot }) => {
  const element = document.createElement("img");

  if (slot) element.slot = slot;
  element.src = slot === "badge" ? companyImage : previewImage;
  element.srcset = `${element.src} 1x, ${element.src} 2x`;
  element.alt = alt;

  return element;
};

const picture = ({ alt }) => {
  const element = document.createElement("picture");
  const source = document.createElement("source");

  source.srcset = previewImage;
  source.type = "image/svg+xml";
  element.append(source, image({ alt }));

  return element;
};

const media = {
  badge: ({ alt }) => image({ alt, slot: "badge" }),
  image,
  picture,
};

const mediaKind = (state) =>
  state.media === "image" || state.media === "picture" ? state.media : "";

const imageAlt = (state) => state.imageAlt || state.ariaLabel || "Isabel Navarro";

const renderAvatar = (state) => {
  const element = document.createElement("user-avatar");

  setAttributes(element, {
    initials: state.initials,
    size: state.size,
    status: state.status,
    "aria-label": state.ariaLabel,
  });
  if (mediaKind(state)) {
    element.append(media[mediaKind(state)]({ alt: imageAlt(state) }));
  }
  if (state.badge) element.append(media.badge({ alt: state.badgeAlt || "Acme" }));

  return element;
};

const sourceMedia = (kind, alt) =>
  kind === "picture"
    ? `
  <picture>
    <source srcset="/avatar.avif" type="image/avif" />
    <source srcset="/avatar.webp" type="image/webp" />
    <img src="/avatar.jpg" alt="${escapeHtml(alt)}" />
  </picture>
`
    : `
  <img src="/avatar.jpg" alt="${escapeHtml(alt)}" />
`;

const sourceBadge = (alt) => `
  <img slot="badge" src="/company.jpg" alt="${escapeHtml(alt)}" />
`;

const sourceAvatar = (state) => {
  const attributes = sourceAttributes({
    initials: state.initials,
    size: state.size,
    status: state.status,
    "aria-label": state.ariaLabel,
  });
  const children = [
    mediaKind(state) && sourceMedia(mediaKind(state), imageAlt(state)),
    state.badge && sourceBadge(state.badgeAlt || "Acme"),
  ].filter(Boolean);

  return children.length
    ? `<user-avatar${attributes}>${children.join("")}</user-avatar>`
    : `<user-avatar${attributes}></user-avatar>`;
};

const avatarParameters = (args) => ({
  docs: docsSource(sourceAvatar(args)),
});

const states = {
  badge: {
    size: "md",
    media: "image",
    imageAlt: "Isabel Navarro",
    badge: true,
    badgeAlt: "Acme",
  },
  image: {
    size: "md",
    status: "online",
    media: "image",
    imageAlt: "Isabel Navarro",
  },
  initials: {
    initials: "IN",
    size: "md",
    status: "online",
  },
  offline: {
    initials: "IN",
    size: "md",
    status: "offline",
  },
  picture: {
    initials: "IN",
    size: "md",
    status: "online",
    media: "picture",
    imageAlt: "Isabel Navarro",
  },
  placeholder: {
    size: "md",
  },
  small: {
    initials: "IN",
    size: "sm",
    status: "online",
  },
  large: {
    initials: "IN",
    size: "lg",
    status: "online",
  },
};

const meta = {
  title: "Avatar",
  component: "user-avatar",
  tags: ["autodocs"],
  render: renderAvatar,
  args: states.placeholder,
  argTypes: {
    ariaLabel: { control: "text", name: "aria-label" },
    initials: { control: "text" },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    status: { control: "select", options: ["", "online", "offline"] },
    badge: { control: false, table: { disable: true } },
    badgeAlt: { control: false, table: { disable: true } },
    imageAlt: { control: false, table: { disable: true } },
    media: { control: false, table: { disable: true } },
  },
  parameters: avatarParameters(states.placeholder),
};

export default meta;

export const Initials = {
  args: states.initials,
  parameters: avatarParameters(states.initials),
};

export const Image = {
  args: states.image,
  parameters: avatarParameters(states.image),
};

export const Picture = {
  args: states.picture,
  parameters: avatarParameters(states.picture),
};

export const Placeholder = {
  args: states.placeholder,
  parameters: avatarParameters(states.placeholder),
};

export const Offline = {
  args: states.offline,
  parameters: avatarParameters(states.offline),
};

export const Badge = {
  args: states.badge,
  parameters: avatarParameters(states.badge),
};

export const Small = {
  args: states.small,
  parameters: avatarParameters(states.small),
};

export const Large = {
  args: states.large,
  parameters: avatarParameters(states.large),
};
