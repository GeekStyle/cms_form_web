/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

let libraryName = pkg.name;

let plugins = [], outputFile;

const config = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
      path: __dirname + '/dist',
      filename: 'main.js',
      library: 'react-webpack-mobx',
      libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader','css-loader',"less-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;

// ,
//       {
//         test: /(\.jsx|\.js)$/,
//         loader: 'eslint-loader',
//         exclude: /node_modules/
//       }

// module.exports = options => {
//   return {
//     entry: './src/index.js',
//     output: {
//       filename: 'bundle.js',
//     },
//     module: {
//       rules: [
//         {
//           test: /.js$/,
//           exclude: /node_modules/,
//           use: [
//             {
//               loader: 'babel-loader',
//               options: {
//                 cacheDirectory: true,
//               },
//             },
//           ],
//         },
//       ],
//     },
//   }
// }