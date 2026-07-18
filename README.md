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

1. `Playground` exposes only documented public choices as Controls and uses
   the real semantic HTML element. Native events appear in Actions.
2. A compact `Variants` or `Sizes` story reflects the canonical component set
   when that set is useful for comparison.
3. `FigmaExamples` mirrors the page's composition/examples frame, using the
   approved icon or other child assets referenced there.
4. Native states use the real mechanism (`disabled`, focus interaction, etc.).
   Do not add an artificial Storybook control for hover, focus-visible or
   pressed unless the component API actually exposes one.

The Button story keeps its SVGs in the story because they demonstrate
consumer-supplied child content. They are not a Button asset or a second icon
library. Reusable icons belong in the approved icon source, then are consumed
by both Figma and code.

Run `npm run check` for syntax validation and `npm run build` before handoff.
