import { defineConfig } from 'umi';
import defineEnv from './defineEnv';
import routes from './routes';

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
  hash: true,
  fastRefresh: {},
  define: defineEnv(),
});
