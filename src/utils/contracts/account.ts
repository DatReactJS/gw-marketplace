import { getRandomMessage } from '@/utils/normalizers';
import { getProvider, preContractRequest } from './ultilities';
interface SignMessageInterface {
  mes: string;
}
const useAccount = () => {
  const signMessage = async (mes: string) => {
    await window?.ethereum?.request({ method: 'eth_requestAccounts' });
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(mes);

    return {
      signature,
    };
  };
  return {
    signMessage: (mes: string) => preContractRequest(signMessage, mes, true),
  };
};

export default useAccount;
