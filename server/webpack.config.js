const path = require('path');
var webpack = require('webpack');
const DotenvWebpackPlugin = require('dotenv-webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  mode: 'development',
  entry: './index.ts',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
  },
  module: {
    rules: [{ test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' }],
  },
  externals: nodeModules,
  plugins: [
    new DotenvWebpackPlugin(),
    new webpack.DefinePlugin({
      'typeof window': '"object"',
      'process.env': {
        PORT: JSON.stringify(process.env.PORT || 3000),
      },
    }),
  ],
};
