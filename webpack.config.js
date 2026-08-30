const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: 'js/bundle.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: 'images/[name][ext]'
    },
    devServer: {
      static: './dist',
      port: 8080,
      open: true,
      hot: true,
      watchFiles: ['src/**/*'],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                ['svgo', { name: 'preset-default' }],
              ],
            },
          },
        }),
      ],
    },
    module: {
      rules: [
       {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { 
            loader: 'babel-loader', 
            options: { 
              presets: [
                ['@babel/preset-env', { modules: false }]
              ] 
            } 
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin({ filename: 'css/style.[contenthash].css' })
    ]
  };
};