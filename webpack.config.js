import { resolve } from 'path';
import nodeExternals from 'webpack-node-externals';

const rules = [
  {
    test: /\.tsx?$/,
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
];

const client = {
  entry: './client/index.tsx',
  output: {
    path: resolve(import.meta.dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: rules
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
};

const server = {
  entry: './server/server.tsx',
  target: 'node24',
  externals: [nodeExternals({ importType: "module" })],
  output: {
    path: resolve('dist'),
    filename: 'server.js',
    module: true,
  },
  module: {
    rules: rules
  },
  experiments: {
    outputModule: true,
  }
};

export default [server, client];
