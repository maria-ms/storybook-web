# Maria's web Storybook

This Storybook is a focused visual catalogue of implemented components and
their Figma artboard examples. It intentionally omits generated Docs pages,
controls, and engineering-only demo stories.

## Install

```sh
npm install
```

For local development against the adjacent packages, install Storybook first,
then build tokens and link the local tokens and components packages:

```sh
cd ../tokens
npm install
npm run build
npm link

cd ../components-web
npm install
npm link

cd ../storybook-web
npm link @maria-ms/tokens @maria-ms/components-web
```

This makes Storybook use the local `../tokens` and `../components-web` folders
instead of the published npm packages.

`../tokens` must be built before running or building Storybook because Storybook
imports generated files from `@maria-ms/tokens/css/light` and
`@maria-ms/tokens/css/dark`. Rebuild `../tokens` after changing token sources so
those CSS entry points resolve to fresh generated files.

## Develop

```sh
npm run dev
```

## Build

```sh
npm run build
```

The app imports individual component entry points from
`@maria-ms/components-web` and the light/dark CSS token entry points from
`@maria-ms/tokens`.
