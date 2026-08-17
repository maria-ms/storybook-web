import "@maria-ms/components-web/avatar";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40024856-2&m=dev";

const portrait = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" fill="#d9d6fe"/>
    <circle cx="40" cy="30" r="16" fill="#8f7f72"/>
    <path d="M12 80c4-22 16-32 28-32s24 10 28 32" fill="#374151"/>
  </svg>
`)}`;

const avatar = ({
  size = "md",
  status = "online",
  withImage = true,
  fallback: fallbackMode = "initials",
  withPresence = true,
} = {}) => {
  const fixture = document.createElement("div");
  const component = document.createElement("ds-avatar");
  const picture = document.createElement("picture");
  const source = document.createElement("source");
  const image = document.createElement("img");
  const fallback = document.createElement("span");
  const initials = document.createElement("span");
  const accessibleName = document.createElement("span");
  const presence = document.createElement("ds-avatar-presence");

  fixture.dataset.avatarStory = "";
  component.setAttribute("size", size);

  picture.slot = "image";
  source.type = "image/svg+xml";
  source.srcset = portrait;
  image.src = portrait;
  image.alt = "Avery Brown";
  image.width = 80;
  image.height = 80;
  image.decoding = "async";
  picture.append(source, image);

  if (fallbackMode === "initials") {
    fallback.slot = "fallback";
    initials.setAttribute("aria-hidden", "true");
    initials.textContent = "AB";
    accessibleName.className = "sr-only";
    accessibleName.textContent = "Avery Brown";
    fallback.append(initials, accessibleName);
  }

  presence.slot = "presence";
  presence.setAttribute("status", status);
  if (withImage) component.append(picture);
  if (fallbackMode === "initials") component.append(fallback);
  if (withPresence) component.append(presence);
  fixture.append(component);

  return fixture;
};

export default {
  title: "Components/Avatar",
  component: "ds-avatar",
  args: {
    size: "md",
    status: "online",
    withImage: true,
    fallback: "initials",
    withPresence: true,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { category: "Appearance" },
    },
    status: {
      control: "select",
      options: ["online", "away", "busy", "offline"],
      if: { arg: "withPresence", eq: true },
      table: { category: "Presence child" },
    },
    withImage: {
      control: "boolean",
      table: { category: "Native image composition" },
    },
    fallback: {
      control: "inline-radio",
      options: ["initials", "placeholder"],
      if: { arg: "withImage", eq: false },
      table: { category: "Fallback composition" },
    },
    withPresence: {
      control: "boolean",
      table: { category: "Presence child" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: avatar,
};

export const Playground = {};
