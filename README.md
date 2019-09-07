# A React-Static plugin that adds tailwind support

[![npm version](https://badge.fury.io/js/react-static-plugin-tailwindcss.svg)](https://badge.fury.io/js/react-static-plugin-tailwindcss)

## Installation
In an existing react-static site run:

```bash
$ yarn add react-static-plugin-tailwindcss -D
```

Then add the plugin to your static.config.js:

```js
export default {
  plugins: ["react-static-plugin-tailwindcss"]
};
```

Now you can add @tailwind directives to your .css files

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```