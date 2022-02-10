import { useRequest } from '@umijs/hooks';
import { ENVIRONMENTS } from '@/utils/constants/environments';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { web, WEB_PATHS } from '@/utils/apis';

interface AppConfig {
  KGC: string;
  KingdomBank: string;
  MAX_INT: string;
}
interface Config {
  loading: boolean;
  APP_CONFIG: AppConfig;
}

const initialValues: Config = {
  loading: true,
  APP_CONFIG: {
    KGC: '',
    KingdomBank: '',
    MAX_INT: '',
  },
};

export const configAtoms = atom({
  key: `${ENVIRONMENTS.LOCAL_STORAGE_KEY}_CONFIG_ATOMS`,
  default: initialValues,
});

export const useConfigInfo = () => {
  const config = useRecoilValue(configAtoms);
  return config;
};

export const useConfig = () => {
  const [config, setConfig] = useRecoilState(configAtoms);

  useRequest(
    async () => {
      const json: string[] = [WEB_PATHS.APP_CONFIG];

      return Promise.all(json.map((path: string) => web.get(path)));
    },
    {
      onSuccess: (r) => {
        setConfig({ APP_CONFIG: r[0], loading: false });
      },
    },
  );

  return {
    loading: config.loading,
  };
};
