const POSTCSS_LOADER = 'postcss-loader';
const isPostCssLoader = ({ loader } = {}) => loader === POSTCSS_LOADER;
const getOneOf = ({ oneOf } = {}) => {
    if (oneOf) {
        return oneOf;
    }

    return [];
};

export default _ => ({
    webpack: config => {
        const { rules } = config.module;
        const { oneOf } = rules.find(getOneOf);

        for (const item of oneOf) {
            const postcssLoader = (
                item &&
                item.loader &&
                item.loader.find(isPostCssLoader)
            );

            if (postcssLoader && postcssLoader.options && postcssLoader.options.plugins) {

                const plugins = postcssLoader.options.plugins;

                Object.assign(postcssLoader.options, {
                    plugins: [
                        require('tailwindcss'),
                        ...(plugins.length ? plugins : [])
                    ]
                })

                break;
            }
        }

        return config
    }
})