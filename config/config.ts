import { defineConfig } from 'umi';
import defineEnv from './defineEnv';
import routes from './routes';

const outputPath: string = '/dist/';

const env: string | undefined = process.env.NODE_ENV;
const path: string =
  env === 'development' ? 'http://127.0.0.1:8000/' : outputPath;

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
  outputPath: outputPath,
  publicPath: path,
  ssr: {
    devServerRender: false,
  },
});
