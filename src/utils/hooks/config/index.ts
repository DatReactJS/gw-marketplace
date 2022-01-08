import { useRequest } from '@umijs/hooks';
import { ENVIRONMENTS } from '@/utils/constants/environments';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { web, WEB_PATHS } from '@/utils/apis';
import { useSaleCountdown } from '../sale';

interface SoftCap {
  name: string;
  symbol: string;
  owner: string;
  address: string;
}
interface HardCap extends SoftCap {
  totalSupply: string;
}

interface AppConfig {
  hardCap: HardCap;
  softCap: SoftCap;
  timeRemainingBox: string;
}
interface Config {
  loading: boolean;
  APP_CONFIG: AppConfig;
}

const initialValues: Config = {
  loading: true,
  APP_CONFIG: {
    hardCap: {
      name: 'BattleLand',
      symbol: 'BLC',
      owner: '',
      totalSupply: '1000000000000000000000000000',
      address: '',
    },
    softCap: {
      name: 'BattleLandSoft',
      symbol: 'BLG',
      owner: '',
      address: '',
    },
    timeRemainingBox: '0D 0H 0M',
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

export const useHardCap = () => {
  const config = useRecoilValue(configAtoms);
  return config.APP_CONFIG.hardCap;
};

export const useSoftCap = () => {
  const config = useRecoilValue(configAtoms);
  return config.APP_CONFIG.softCap;
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
