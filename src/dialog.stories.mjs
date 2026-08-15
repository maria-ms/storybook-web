import { expect, userEvent } from "storybook/test";

import "@maria-ms/components-web/button";
import "@maria-ms/components-web/dialog";
import "@maria-ms/components-web/field";
import "@maria-ms/components-web/icon-button";
import "@maria-ms/components-web/text-input";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40024551-2&m=dev";

const button = ({ label, variant = "primary" }) => {
  const component = document.createElement("ds-button");
  const nativeButton = document.createElement("button");

  component.setAttribute("size", "medium");
  component.setAttribute("variant", variant);
  nativeButton.type = "button";
  nativeButton.textContent = label;
  component.append(nativeButton);
  return component;
};

const dialogStory = ({
  description = "Make changes to your profile details.",
  open = true,
  showDescription = true,
  title = "Edit profile",
} = {}) => {
  const fixture = document.createElement("div");
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

  close.setAttribute("size", "medium");
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
  actions.append(button({ label: "Cancel", variant: "secondary" }), button({ label: "Save changes" }));

  dialog.append(header, content, actions);
  component.append(dialog);
  fixture.append(component);

  if (open) {
    queueMicrotask(() => {
      if (dialog.isConnected && !dialog.open) dialog.showModal();
    });
  }

  return fixture;
};

export default {
  title: "Components/Dialog",
  component: "ds-dialog",
  args: {
    description: "Make changes to your profile details.",
    open: true,
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
    open: {
      control: "boolean",
      description: "Story fixture: opens the native dialog with showModal().",
      table: { category: "Native behavior" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: dialogStory,
};

export const Playground = {
  play: async ({ args, canvasElement }) => {
    const fixture = canvasElement.querySelector("[data-dialog-story]");
    const component = fixture?.querySelector("ds-dialog");
    const dialog = component?.querySelector(":scope > dialog");
    const content = dialog?.querySelector("[data-dialog-content]");
    const actions = dialog?.querySelector("[data-dialog-actions]");
    const field = content?.querySelector("ds-field");
    const input = field?.querySelector("input");
    const closeButton = dialog?.querySelector("[data-dialog-close]");
    const dialogStyles = getComputedStyle(dialog);
    const horizontalPadding = Math.round(
      parseFloat(dialogStyles.paddingInlineStart) + parseFloat(dialogStyles.paddingInlineEnd),
    );

    await expect(component).toBeTruthy();
    await expect(dialog).toBeTruthy();
    await expect(content).toBeTruthy();
    await expect(actions).toBeTruthy();
    await expect(field).toBeTruthy();
    await expect(input).toBeTruthy();
    await expect(dialog).toHaveAttribute("aria-labelledby", "dialog-story-title");
    await expect(document.activeElement).toBe(input);
    await expect(content.offsetWidth).toBe(dialog.clientWidth - horizontalPadding);
    await expect(actions.offsetWidth).toBe(content.offsetWidth);
    await expect(field.offsetWidth).toBe(content.offsetWidth);
    await expect(input.offsetWidth).toBe(field.offsetWidth);

    if (!args.open) return;

    await expect(dialog.open).toBe(true);
    await userEvent.click(closeButton);
    await expect(dialog.open).toBe(false);
    dialog.showModal();
    await expect(dialog.open).toBe(true);
  },
};
