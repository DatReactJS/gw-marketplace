import { getRandomMessage } from '@/utils/normalizers';
import { getProvider, preContractRequest } from './ultilities';

const useAccount = () => {
  const signMessage = async () => {
    const provider = await getProvider();
    await provider.send('eth_requestAccounts');
    const signer = await provider.getSigner();
    const message = getRandomMessage();

    const signature = await signer.signMessage(message);
    return {
      signature,
      message,
    };
  };

  return {
    signMessage: () => preContractRequest(signMessage, undefined, true),
  };
};

export default useAccount;
