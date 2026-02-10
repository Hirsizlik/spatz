import { resolve } from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  entry: './server/server.tsx',
  target: 'node22',
  externals: [nodeExternals({ importType: "module" })],
  output: {
    path: resolve('dist'),
    filename: 'server.js',
    module: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'],
          }
        }
      }
    ]
  },
  experiments: {
    outputModule: true,
  },
};
