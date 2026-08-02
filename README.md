# Maria Web Storybook

Storybook is the visual verification surface for the public package. It loads
the components from `@maria-ms/components-web` and the generated theme CSS from
`@maria-ms/tokens`; it does not duplicate component CSS or token values.

## Run locally

Build and link the adjacent packages first:

```sh
cd ../tokens
npm install
npm run build
npm link

cd ../components-web
npm install
npm link

cd ../storybook-web
npm install
npm link @maria-ms/tokens @maria-ms/components-web
npm run dev
```

## Story rule

Create stories from the canonical component page in Figma, not from imagined
permutations. The source hierarchy is: Figma canonical component and examples
for the public contract; `tokens/dist` for visual values; the approved shared
icon/asset source for reusable child assets. Do not use a Figma screenshot,
copied colour value or a story-only substitute as a component asset.

For each component:

1. Export one `Playground` only. Its Controls expose real public component,
   native HTML, or ARIA behaviour and use the real semantic HTML child.
2. Do not expose Figma preview controls such as State, displayed content, or
   picker-open. Native value, disabled, validation, and focus behaviour use the
   browser's real mechanism.
3. Compound Playgrounds demonstrate one valid composition through fixture
   content and real child controls. Do not create a variant/size matrix or
   duplicate every Figma example. Light and dark are selected from the global
   toolbar.
4. Add a `play` function only when custom composition or ownership behaviour
   needs an assertion beyond a successful browser mount. Do not add event
   actions or state-specific stories by default.

The Button story keeps its SVGs in the story because they demonstrate
consumer-supplied child content. They are not a Button asset or a second icon
library. Reusable icons belong in the approved icon source, then are consumed
by both Figma and code.

Before handoff, run:

```sh
npm run build
npm run test:storybook -- --run
```
