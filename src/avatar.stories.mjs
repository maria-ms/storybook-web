import "@maria-ms/components-web/avatar";
import {
  docsSource,
  escapeHtml,
  setAttributes,
  setStyles,
  sourceAttributes,
  sourceStyle,
} from "./story-helpers.mjs";

const avatarSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <defs>
      <linearGradient id="background" x1="12" x2="68" y1="8" y2="72">
        <stop stop-color="#7c3aed"/>
        <stop offset="1" stop-color="#14b8a6"/>
      </linearGradient>
    </defs>
    <rect width="80" height="80" fill="url(#background)"/>
    <circle cx="40" cy="31" r="14" fill="#f8fafc"/>
    <path d="M16 78c3.5-15.5 13-25 24-25s20.5 9.5 24 25" fill="#f8fafc"/>
  </svg>
`);

const previewImage = `data:image/svg+xml,${avatarSvg}`;

const image = ({ alt }) => {
  const element = document.createElement("img");

  element.src = previewImage;
  element.srcset = `${previewImage} 1x, ${previewImage} 2x`;
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

const media = { image, picture };

const avatarStyles = (state) =>
  state.size && state.size !== 40
    ? { "--user-avatar-size": `${state.size}px` }
    : {};

const renderAvatar = (state) => {
  const element = document.createElement("user-avatar");

  setAttributes(element, {
    initials: state.initials,
    status: state.status,
    "aria-label": state.ariaLabel,
  });
  setStyles(element, avatarStyles(state));
  if (state.media) element.append(media[state.media.kind](state.media));

  return element;
};

const sourceMedia = ({ alt, kind }) =>
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

const sourceAvatar = (state) => {
  const attributes = sourceAttributes({
    initials: state.initials,
    status: state.status,
    "aria-label": state.ariaLabel,
    style: sourceStyle(avatarStyles(state)),
  });

  return state.media
    ? `<user-avatar${attributes}>${sourceMedia(state.media)}</user-avatar>`
    : `<user-avatar${attributes}></user-avatar>`;
};

const story = (state) => ({
  render: () => renderAvatar(state),
  parameters: {
    docs: docsSource(sourceAvatar(state)),
  },
});

const states = {
  image: {
    status: "online",
    media: { kind: "image", alt: "Isabel Navarro" },
  },
  imageWithInitials: {
    initials: "IN",
    status: "online",
    media: { kind: "image", alt: "Isabel Navarro" },
  },
  initials: {
    initials: "IN",
    status: "online",
  },
  offline: {
    initials: "IN",
    status: "offline",
  },
  picture: {
    initials: "IN",
    status: "online",
    media: { kind: "picture", alt: "Isabel Navarro" },
  },
};

const meta = {
  title: "Avatar",
  component: "user-avatar",
  tags: ["autodocs"],
  ...story(states.initials),
};

export default meta;

export const Initials = story(states.initials);

export const Image = story(states.image);

export const ImageWithInitials = story(states.imageWithInitials);

export const Picture = story(states.picture);

export const Offline = story(states.offline);
