import { ethers } from 'ethers';
import { getProvider, preContractRequest } from './ultilities';

interface GetApprovedInterface {
  heroId: number;
}

interface ApproveInterface {
  heroId: number;
}

const useHeroContracts = () => {
  const createNewContract = (
    signerOrProvider: ethers.Signer | ethers.providers.Provider,
  ) => {
    return new ethers.Contract('', '', signerOrProvider);
  };

  const getApproved = async ({ heroId }: GetApprovedInterface) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const result = await contract.getApproved(heroId);
    return result;
  };

  const approve = async ({ heroId }: ApproveInterface) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const result = await contract.approve('', heroId);
    return result.wait();
  };

  const getBuyedAmount = async (userAddress: string) => {
    const provider = await getProvider();
    const contract = createNewContract(provider);
    const configNumber = await contract.getLatestConfig();
    const buyedAmount = await contract.amountBought(userAddress, configNumber);
    return buyedAmount;
  };

  const getHeroBalance = async (address: string) => {
    const provider = await getProvider();
    const contract = createNewContract(provider);
    return contract.balanceOf(address);
  };

  const getWhiteList = async (address: string) => {
    const provider = await getProvider();
    const contract = createNewContract(provider);
    return contract.whiteList(address);
  };

  const getHeroById = async (heroId: number) => {
    const provider = await getProvider();
    const contract = createNewContract(provider);
    return contract.getHeroById(heroId);
  };

  const getConfig = async () => {
    const provider = await getProvider();
    const contract = createNewContract(provider);
    const configNumber = await contract.getLatestConfig();
    const result = await contract.configs(configNumber.toString());
    const [
      startTime,
      endTime,
      basicPrice,
      totalSell,
      currentSell,
      maxPerPurchase,
      onlyWhiteList,
    ] = result;

    return {
      startTime: startTime.toString(),
      endTime: endTime.toString(),
      basicPrice: ethers.utils.formatEther(basicPrice),
      originBasicPrice: basicPrice,
      totalSell: totalSell.toString(),
      currentSell: currentSell.toString(),
      maxPerPurchase: maxPerPurchase.toString(),
      onlyWhiteList,
    };
  };

  const claimHeroes = async ({
    amount,
    price,
  }: {
    amount: number;
    price: ethers.BigNumber;
  }) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const result = await contract.claimHeroes(amount, {
      value: price.toString(),
    });
    return result.wait();
  };

  return {
    getApproved: ({ heroId }: GetApprovedInterface) =>
      preContractRequest(getApproved, { heroId }, true),
    approve: ({ heroId }: ApproveInterface) =>
      preContractRequest(approve, { heroId }, true),
    getHeroBalance,
    getWhiteList,
    getHeroById: (heroId: number) => getHeroById(heroId),
    getConfig,
    getBuyedAmount,
    claimHeroes: ({
      amount,
      price,
    }: {
      amount: number;
      price: ethers.BigNumber;
    }) => preContractRequest(claimHeroes, { amount, price }, true),
  };
};

export default useHeroContracts;
