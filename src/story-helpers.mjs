const figmaFileUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026";

const present = ([, value]) =>
  value !== false && value !== undefined && value !== null && value !== "";

const entries = (object) => Object.entries(object).filter(present);

export const docsSource = (code) => ({
  source: { code: code.trim(), language: "html", type: "code" },
});

export const staticStoryParameters = {
  controls: { disable: true },
};

export const figmaNodeUrl = (nodeId) =>
  `${figmaFileUrl}?node-id=${nodeId.replace(":", "-")}&m=dev`;

export const storyParameters = (source, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(source),
});

export const staticStoryParametersFor = (source, design) => ({
  ...staticStoryParameters,
  ...storyParameters(source, design),
});

export const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export const sourceAttributes = (attributes) =>
  entries(attributes)
    .map(([name, value]) =>
      value === true ? ` ${name}` : ` ${name}="${escapeHtml(value)}"`,
    )
    .join("");

export const sourceStyle = (styles) =>
  entries(styles)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ");

export const indent = (source, spaces = 2) =>
  source
    .trim()
    .split("\n")
    .map((line) => `${" ".repeat(spaces)}${line}`)
    .join("\n");

export const setAttributes = (element, attributes) => {
  entries(attributes).forEach(([name, value]) =>
    element.setAttribute(name, value === true ? "" : String(value)),
  );
};

export const setStyles = (element, styles) => {
  entries(styles).forEach(([name, value]) => element.style.setProperty(name, value));
};

export const renderStoryGroup = (
  items,
  renderItem,
  {
    alignItems = "flex-start",
    direction = "row",
    gap = "var(--ds-primitive-space-06)",
    wrap = true,
  } = {},
) => {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.alignItems = alignItems;
  container.style.flexDirection = direction;
  container.style.gap = gap;
  if (wrap) container.style.flexWrap = "wrap";
  container.append(...items.map(renderItem));

  return container;
};

export const sourceStoryGroup = (items, sourceItem) =>
  `<div>\n${indent(items.map(sourceItem).join("\n"))}\n</div>`;

export const textSlot = (slot, text) => {
  const element = document.createElement("span");
  element.slot = slot;
  element.textContent = text;
  return element;
};
