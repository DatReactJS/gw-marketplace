import { useRequest } from '@umijs/hooks';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

export const bnbAtom = atom({
  key: 'BNB_ATOM',
  default: {
    usd: undefined,
  },
});

export const useBNBPrice = () => {
  return useRecoilValue(bnbAtom);
};

export const useBNB = () => {
  const [bnbInfo, setBnbInfo] = useRecoilState(bnbAtom);

  useRequest('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT', {
    onSuccess: (r) => {
      setBnbInfo({ ...bnbInfo, usd: r.price });
    },
    pollingInterval: 10000,
  });
};
