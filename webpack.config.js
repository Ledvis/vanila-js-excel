const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const getFileName = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const getJSLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    // Include babel preset
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              // only include polyfills and code transforms needed for users whose browsers have >0.25% market share
              browsers: '> 0.25%, not dead',
            },
          },
        ],
      ],
      plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods'],
    },
  }];

  if (isDev) loaders.push('eslint-loader');

  return loaders;
};

module.exports = {
  // The base directory, an absolute path, for resolving entry points and loaders from configuration.
  // __dirname tells you the absolute path of the directory containing the currently executing file
  context: path.resolve(__dirname, 'src'), // /home/zenbook/Documents/projects/tutorials/excel-course
  mode: 'development',
  // @babel/polyfill - this is a polyfill (which will run before your source code), we need it to be a dependency
  // This means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    // simplifies creation of HTML files to serve your webpack bundles
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: isProd,
      collapseWhitespace: isProd,
      removeComments: isProd,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    // extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports
    new MiniCssExtractPlugin({
      filename: getFileName('css'),
    }),
  ],
  // Loaders
  module: {
    // rules executes from right to left (e.g. for sass-scss files first run 'sass-loader', then 'css-loader', lastly 'MiniCssExtractPlugin.loader')
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
              hmr: isDev,
            },
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: getJSLoaders(),
      },
    ],
  },
};
