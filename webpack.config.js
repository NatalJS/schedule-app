const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
  entry: './index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'scss': path.resolve(__dirname, 'src/scss'),
      'app/schedule-app/utils': path.resolve(__dirname, 'src/utils'),
      'config': path.resolve(__dirname, 'config.js'),
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test:  /\.(jpe?g|png|gif|svg|obj|mtl|pdf|zip|ico)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name(file) {
              if (file.match(/\.zip$|\.pdf$/)) {
                return './documents/[name].[ext]';
              }
              if (file.match(/icon([0-9].*).png$/)) {
                return './assets/[name].[ext]';
              }
              return './assets/[hash].[ext]';
            }
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        }]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract([
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
              sourceMap: 'inline',
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules')],
              sourceMap: true
            }
          }
        ]),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: '[contenthash].css'}),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
