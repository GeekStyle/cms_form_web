var path = require('path');

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  // get the standard storybook webpack.config.js
  const config = genDefaultConfig(baseConfig);
  config.node = {
    fs: 'empty'
  }
  config.devServer = {
    //...config.devServer,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  }  
  //loaders: ['style-loader', 'css-loader', 'less-loader']
  // add our custom loaders - or anything else that's needed
  config.module.rules.unshift(
    {
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, "src")],
      use: 'babel-loader'
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
  );

  return config;
};
