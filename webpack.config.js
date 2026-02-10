import { resolve } from 'path';
import nodeExternals from 'webpack-node-externals';

const client = {
  entry: './client/index.tsx',
  output: {
    path: resolve(import.meta.dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
};

const server = {
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
  }
};

export default [server, client];
