/** @type { import('@storybook/vue3-webpack5').StorybookConfig } */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
              MiniCssExtractPlugin.loader,
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
              MiniCssExtractPlugin.loader,
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
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader'
              }
            ]
          }
        ]
      },

      plugins: [...config.plugins, new MiniCssExtractPlugin()],

      optimization: {
        ...config.optimization,
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_debugger: false,
                drop_console: false
              },
              output: {
                comments: false
              }
            },
            extractComments: false
          }),
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true }
                }
              ]
            }
          })
        ]
      }
    };
  }
};
export default config;
