import { expect, userEvent } from "storybook/test";

import "@maria-ms/components-web/button";
import "@maria-ms/components-web/dialog";
import "@maria-ms/components-web/field";
import "@maria-ms/components-web/icon-button";
import "@maria-ms/components-web/text-input";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40024551-2&m=dev";

const button = ({ label, variant = "primary", closes = false }) => {
  const component = document.createElement("ds-button");
  const nativeButton = document.createElement("button");

  component.setAttribute("size", "medium");
  component.setAttribute("variant", variant);
  nativeButton.type = "button";
  if (closes) nativeButton.dataset.dialogClose = "";
  nativeButton.textContent = label;
  component.append(nativeButton);
  return component;
};

const dialogStory = ({
  description = "Make changes to your profile details.",
  showDescription = true,
  title = "Edit profile",
} = {}) => {
  const fixture = document.createElement("div");
  const trigger = button({ label: "Edit profile" });
  const triggerButton = trigger.querySelector("button");
  const component = document.createElement("ds-dialog");
  const dialog = document.createElement("dialog");
  const header = document.createElement("header");
  const heading = document.createElement("div");
  const titleElement = document.createElement("h2");
  const descriptionElement = document.createElement("p");
  const close = document.createElement("ds-icon-button");
  const closeButton = document.createElement("button");
  const content = document.createElement("div");
  const field = document.createElement("ds-field");
  const label = document.createElement("label");
  const textInput = document.createElement("ds-text-input");
  const input = document.createElement("input");
  const message = document.createElement("p");
  const actions = document.createElement("footer");

  fixture.dataset.dialogStory = "";
  fixture.style.inlineSize = "100%";
  fixture.style.minBlockSize = "360px";

  titleElement.id = "dialog-story-title";
  titleElement.dataset.dialogTitle = "";
  titleElement.textContent = title;
  heading.dataset.dialogHeading = "";
  heading.append(titleElement);

  dialog.setAttribute("aria-labelledby", titleElement.id);

  if (showDescription) {
    descriptionElement.id = "dialog-story-description";
    descriptionElement.dataset.dialogDescription = "";
    descriptionElement.textContent = description;
    dialog.setAttribute("aria-describedby", descriptionElement.id);
    heading.append(descriptionElement);
  }

  close.setAttribute("size", "small");
  close.setAttribute("variant", "ghost");
  closeButton.type = "button";
  closeButton.dataset.dialogClose = "";
  closeButton.setAttribute("aria-label", "Close dialog");
  close.append(closeButton);

  header.dataset.dialogHeader = "";
  header.append(heading, close);

  label.slot = "label";
  label.textContent = "Display name";
  textInput.slot = "control";
  textInput.setAttribute("size", "medium");
  input.id = "dialog-story-display-name";
  input.autofocus = true;
  input.name = "display-name";
  input.value = "Maria";
  textInput.append(input);
  message.slot = "message";
  message.textContent = "Shown on your public profile.";
  field.append(label, textInput, message);

  content.dataset.dialogContent = "";
  content.append(field);
  actions.dataset.dialogActions = "";
  actions.append(
    button({ label: "Cancel", variant: "secondary", closes: true }),
    button({ label: "Save changes" }),
  );

  dialog.append(header, content, actions);
  component.append(dialog);
  fixture.append(trigger, component);

  triggerButton.addEventListener("click", () => {
    if (!dialog.open) dialog.showModal();
  });

  return fixture;
};

export default {
  title: "Components/Dialog",
  component: "ds-dialog",
  args: {
    description: "Make changes to your profile details.",
    showDescription: true,
    title: "Edit profile",
  },
  argTypes: {
    title: {
      control: "text",
      table: { category: "Content" },
    },
    description: {
      control: "text",
      if: { arg: "showDescription" },
      table: { category: "Content" },
    },
    showDescription: {
      control: "boolean",
      description: "Story fixture: includes or removes the visible description and aria-describedby relationship.",
      table: { category: "Content" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: dialogStory,
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const fixture = canvasElement.querySelector("[data-dialog-story]");
    const trigger = fixture?.querySelector("ds-button > button");
    const dialog = fixture?.querySelector("dialog");
    const close = dialog?.querySelector("[data-dialog-close]");
    const input = dialog?.querySelector("input[autofocus]");
    const themeTarget = canvasElement.closest("[data-theme]") ?? document.documentElement;
    const previousTheme = themeTarget.getAttribute("data-theme");

    await expect(trigger).toBeTruthy();
    await expect(dialog).toBeTruthy();

    await userEvent.click(trigger);
    await expect(dialog).toHaveAttribute("open");
    await expect(input).toHaveFocus();
    await expect(close?.getBoundingClientRect().height).toBeCloseTo(32, 1);
    await expect(close?.getBoundingClientRect().width).toBeCloseTo(32, 1);

    close?.focus();
    await expect(close).toHaveFocus();
    try {
      themeTarget.setAttribute("data-theme", "light");
      const lightFocus = getComputedStyle(close);
      const lightBackground = lightFocus.backgroundColor;
      const lightShadow = lightFocus.boxShadow;
      await expect(lightFocus.borderRadius).toBe("8px");
      await expect(lightShadow).not.toBe("none");

      themeTarget.setAttribute("data-theme", "dark");
      const darkFocus = getComputedStyle(close);
      await expect(darkFocus.backgroundColor).not.toBe(lightBackground);
      await expect(darkFocus.boxShadow).not.toBe(lightShadow);
    } finally {
      if (previousTheme === null) themeTarget.removeAttribute("data-theme");
      else themeTarget.setAttribute("data-theme", previousTheme);
    }

    await userEvent.click(close);
    await expect(dialog).not.toHaveAttribute("open");
  },
};
