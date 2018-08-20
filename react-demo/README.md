# react-starter

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

<!-- start: markdown-toc -->

-   [Usage](#usage)
    -   [Manual](#manual)
    -   [Auto](#auto)
    -   [More](#more)
-   [Browser Enhancement](#browser-enhancement)
    -   [Polyfill](#polyfill)
    -   [Stylesheets](#stylesheets)
-   [React Related](#react-related)
    -   [Typechecking](#typechecking)
    -   [Router](#router)
    -   [Styletheets](#styletheets)
    -   [Media](#media)
    -   [State Management](#state-management)
    -   [API Request](#api-request)
    -   [Hot Reloading](#hot-reloading)
-   [QA](#qa)
    -   [Linters](#linters)
    -   [Auto Formatting (TODO)](#auto-formatting-todo)
    -   [Static Type checking (TODO)](#static-type-checking-todo)
-   [Build](#build)
    -   [Environment Variables](#environment-variables)
-   [Others](#others)
    -   [SEO](#seo)
    -   [Plans](#plans)
-   [LICENSE](#license)

<!-- end: markdown-toc -->

## Usage

### Manual

Download the latest version from Downloads Page. Then use the code to initialize your own repo.

### Auto

```sh
$ curl -sSL https://bitbucket.org/teambun/react-starter/get/master.tar.gz | tar xvz
```

### More

Read more information about this starter in the following sections.

## Browser Enhancement

### Polyfill

Polyfill is provided by [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) and applied by [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env).

Its contents are imported on demand according to [browserslist](https://github.com/browserslist/browserslist).

### Stylesheets

-   Reset default styles via [normalize.css](https://github.com/necolas/normalize.css).
-   Set `box-sizing: border-box` and native-like fonts via [web-candy](https://github.com/m31271n/web-candy).

## React Related

### Typechecking

`props-types` is provided by default. Use it to define the interface of your components.

Read more:

-   [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

### Router

Router related things is **not** provided by default. Getting router support via [@reach/router](https://github.com/reach/router).

-   [Code Splitting With react-router](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)
-   [Configure production server to support client-side routing](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-apps-with-client-side-routing)

### Styletheets

`styled-components` is provided by deafult. Use it to style your components.

Read more:

-   [A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)

### Media

Following formats of medias are supported:

-   image: `png` / `jpeg` / `gif` / `svg`
-   video: `mp4`
-   audio: `mp3` / `m4a`
-   font: `woff` / `woff2` / `ttf` / `otf` / `eot`

### State Management

> If you're like me, you're sick of all the ceremony around state management in React. Something that fits in well with the React way of thinking, but doesn't command some crazy architecture and methodology. - thejameskyle

Recommended packages:

-   [unstated](https://github.com/thejameskyle/unstated)

### API Request

-   [AJAX and APIs - Doc from React](https://reactjs.org/docs/faq-ajax.html)

### Hot Reloading

Hot reloading of react components is provided by [`react-hot-loader`](https://github.com/gaearon/react-hot-loader).

> react-hot-loader is not executed in production and the footprint is minimal.

## QA

### Linters

Linter have 2 categories of rules:

-   Formatting rules
-   Code-quality rules

[`eslint-config-airbnb`](https://www.npmjs.com/package/eslint-config-airbnb) includes formatting rules and code-quality rules. But, in the aspect of formatting rules, I prefer [prettier](https://prettier.io/) personally. So, I extend it with [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier).

And, we get the awsome experience of formatting code automatically provided by [prettier](https://github.com/prettier/prettier).

Related packages:

-   `eslint` / `babel-eslint`
-   `esilnt-config-airbnb`
    -   `eslint-plugin-jsx-a11y`
    -   `eslint-plugin-import`
    -   `eslint-plugin-react`
-   `eslint-plugin-prettier`
    -   `prettier`
    -   `eslint-config-prettier`

### Auto Formatting (TODO)

> Currently, I don't wanna everyone to use this opinionated code style. So, this feature is not provided. If you think it is necessary, request it.

Related packages:

-   `husky` - helper for githook defined in npm scripts.
-   `lint-staged` - command runner on staged files in git.
-   `prettier` - code formatter.

The auto formatting steps are:

1.  `husky` runs githook.
2.  `lint-staged` runs as a githook.
3.  `prettier` runs as a step in `lint-staged`'s configs.

### Static Type checking (TODO)

-   [Adding Flow](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-flow)

## Build

### Environment Variables

| Name             | Description                    | Default Value | Example                    |
| ---------------- | ------------------------------ | ------------- | -------------------------- |
| `RS_ASSETS_PATH` | Path to serve static files     | ``            | `https://cdn.example.com/` |
| `RS_FLAT_FILES`  | Toggle flat structure of files | ``            |

## Others

### SEO

-   [SEO vs. React: Web Crawlers are Smarter Than You Think](https://medium.freecodecamp.org/seo-vs-react-is-it-neccessary-to-render-react-pages-in-the-backend-74ce5015c0c9)

### Plans

-   Tree-shaking
-   favicon
    -   [jantimon/favicons-webpack-plugin](https://github.com/jantimon/favicons-webpack-plugin)
-   clean unused css
    -   [FullHuman/purgecss](https://github.com/FullHuman/purgecss)
-   vender bundle
-   [imagemin](https://github.com/tcoopman/image-webpack-loader)
-   [fontmin](https://ecomfe.github.io/fontmin/en)

## LICENSE

MIT
