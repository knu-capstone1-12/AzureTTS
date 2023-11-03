const dotenv = require('dotenv')
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

dotenv.config();

module.exports = {
  target: 'node',
  externals: [nodeExternals({
    // `nodeExternals`의 `allowlist` 옵션을 사용하여 트랜스파일할 패키지를 지정
    allowlist: [/^microsoft-cognitiveservices-speech-sdk/]
  })],
  entry: './src/azureTTS.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, // `.js` 및 `.mjs` 파일 처리
        // `include`를 사용하여 트랜스파일할 `node_modules` 내부의 모듈 명시
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/microsoft-cognitiveservices-speech-sdk')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),

  ]
};