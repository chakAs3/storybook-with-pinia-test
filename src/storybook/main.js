/** @type { import('@storybook/vue3-webpack5').StorybookConfig } */

const path = require('path');

const config = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: ['@storybook/addon-essentials'],

  framework: {
    name: '@storybook/vue3-webpack5',
    options: {}
  },

  docs: {
    autodocs: 'tag'
  },

  webpackFinal: (config) => {
    config.stats = {
      ...config.stats,
      loggingDebug: ['sass-loader']
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.dirname(path.resolve(__dirname, './'))
    };

    return {
      ...config,

      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.css$/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: {
                    exportLocalsConvention: 'dashes',
                    localIdentName: `[local]`
                  }
                }
              },
              {
                loader: 'sass-loader',
                options: {}
              }
            ]
          }
        ]
      },

      plugins: [...config.plugins]
    };
  }
};
export default config;
