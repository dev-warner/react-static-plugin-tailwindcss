const POSTCSS_LOADER = "postcss-loader";
const isPostCssLoader = ({ loader } = {}) => loader === POSTCSS_LOADER;
const getOneOf = ({ oneOf } = {}) => {
  if (oneOf) {
    return oneOf;
  }

  return false;
};

const defaultOptions = {
  autoPrefixer: true,
  purge: false,
  cssInJs: false,
};

export default (options = {}) => ({
  webpack: (config) => {
    const opts = { ...defaultOptions, ...options };
    const { rules } = config.module;
    const { oneOf } = rules.find(getOneOf);

    for (const item of oneOf) {
      const postcssLoader =
        item && item.loader && item.loader.find(isPostCssLoader);

      if (
        postcssLoader &&
        postcssLoader.options &&
        postcssLoader.options.plugins
      ) {
        const plugins = postcssLoader.options.plugins;
        const tailwind = [require("tailwindcss")];

        if (opts.autoPrefixer) {
          tailwind.push(require("autoprefixer"));
        }

        if (opts.purge) {
          const userOptions = typeof opts.purge === "object" ? opts.purge : {};
          const purgecss = require("@fullhuman/postcss-purgecss")({
            userOptions,
          });

          tailwind.push(purgecss);
        }

        Object.assign(postcssLoader.options, {
          plugins: [...tailwind, ...(plugins.length ? plugins : [])],
        });

        break;
      }
    }

    if (opts.cssInJs) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
});
