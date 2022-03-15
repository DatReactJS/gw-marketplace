import { defineConfig } from 'umi';
import defineEnv from './defineEnv';
import routes from './routes';

const outputPath: string = '/dist/';

const env: string | undefined = process.env.NODE_ENV;

const path: string = outputPath;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  favicon: '/assets/favicon.ico',
  routes,
  locale: {
    default: 'en-US',
    useLocalStorage: true,
    baseNavigator: false,
    title: true,
    baseSeparator: '-',
  },
  // hash: true,
  fastRefresh: {},
  define: defineEnv(),
  externals: {
    // react: 'window?.React',
    // 'react-dom': 'window?.ReactDOM',

    lodash: 'window._',
    numeral: 'window.numeral',
  },
  scripts: [
    // 'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
    // 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
    'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js',
  ],
  outputPath: outputPath,
  publicPath: path,
  ssr: {
    devServerRender: false,
  },
});
