const path = require('path');
const webpack = require('webpack');
const config = require('./build/config');

const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const { ifDevelopment, ifProduction } = getIfUtils(nodeEnv);

const absolutePath = relativePath => path.resolve(__dirname, relativePath);

const cssLoaders = [{
    loader: 'css-loader',
    options: {
      sourceMap: ifDevelopment(true, config.build.productionSourceMap)
    }
  },
  {
    loader: 'sass-loader',
    options: {
      indentedSyntax: true,
      sourceMap: ifDevelopment(true, config.build.productionSourceMap)
  }
}];

module.exports = removeEmpty({
  entry: {
    app: './src/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: ifProduction('[name]-[hash].js', '[name].js'),
    publicPath: config.build.assetsPublicPath,
  },
  devtool: ifDevelopment('eval-source-map', 'source-map'),

  devServer: ifDevelopment(config.dev.devServer),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [absolutePath('src'), absolutePath('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [absolutePath('src'), absolutePath('test')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(sass|scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders,
        }),
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(config.build.assetsSubDirectory, 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(config.build.assetsSubDirectory, 'media/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  plugins: removeEmpty([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),

    new HtmlWebpackPlugin({
      template: absolutePath('src/index.html'),
      filename:config.build.index,
      inject: true,
      showErrors: true,
      environment: nodeEnv,
    }),

    ifProduction(new CopyWebpackPlugin([{ from: absolutePath('static'), to: config.build.assetsSubDirectory }])),

    ifProduction(
      new ExtractTextPlugin('[name]-[hash].css'),
      new ExtractTextPlugin('[name].css')
    ),
  ]),
});
