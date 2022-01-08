import { ethers, utils } from 'ethers';
import { getProvider, preContractRequest } from './ultilities';

interface TakeOfferInterace {
  buyerAddress: string;
  heroId: number;
}

interface BuyHeroInterface {
  heroId: number;
  price: ethers.BigNumber;
}

interface OfferHeroInterface {
  heroId: number;
  price: number;
}

interface CancelOfferInterface {
  heroId: number;
}

interface DelistHeroInterface {
  heroId: number;
}

interface HeroPriceInterface {
  heroId: number;
}

interface ChangePriceInterface {
  heroId: number;
  price: number;
}

interface ListHeroInterface {
  heroId: number;
  price: number;
}

const useMarketContracts = () => {
  const createNewContract = (
    signerOrProvider: ethers.Signer | ethers.providers.Provider,
  ) => {
    return new ethers.Contract('', '', signerOrProvider);
  };

  const takeOffer = async ({ buyerAddress, heroId }: TakeOfferInterace) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const result = await contract.takeOffer(heroId, buyerAddress);
    await result.wait();

    return result;
  };

  const buyHero = async ({ heroId, price }: BuyHeroInterface) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const result = await contract.buy(heroId, { value: price.toString() });
    await result.wait();

    return result;
  };

  const offerHero = async ({ heroId, price }: OfferHeroInterface) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const accounts = await provider.send('eth_requestAccounts');

    const myOffer = await contract.getOfferOfHeroByAddress(heroId, accounts[0]);
    const _price = price.toString();
    const toBigNumber = utils.parseEther(_price);
    let value: string | number = 0;
    if (myOffer) {
      if (utils.formatEther(myOffer.toString()) === _price) {
        throw new Error('You already offer at this price');
      } else if (myOffer.gt(toBigNumber)) {
      } else if (myOffer.lt(toBigNumber)) {
        value = toBigNumber.sub(myOffer).toString();
      }
    }
    const result = await contract.offer(heroId, toBigNumber.toString(), {
      value,
    });
    await result.wait();

    return result;
  };

  const cancelOffer = async ({ heroId }: CancelOfferInterface) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const result = await contract.cancelOffer(heroId);
    await result.wait();

    return result;
  };

  const changePrice = async ({ heroId, price }: ChangePriceInterface) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const result = await contract.changePrice(
      heroId,
      utils.parseEther(price.toString()).toString(),
    );

    await result.wait();

    return result;
  };

  const listHero = async ({ heroId, price }: ListHeroInterface) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const result = await contract.listForSale(
      heroId,
      utils.parseEther(price.toString()).toString(),
    );
    await result.wait();

    return result;
  };

  const delistHero = async ({ heroId }: DelistHeroInterface) => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = createNewContract(signer);
    const result = await contract.unList(heroId);
    await result.wait();

    return result;
  };

  const getHeroPrice = async ({ heroId }: HeroPriceInterface) => {
    const provider = await getProvider();
    const contract = createNewContract(provider);
    const result = await contract.heroesOnSale(heroId);
    return result;
  };

  return {
    takeOffer: ({ buyerAddress, heroId }: TakeOfferInterace) =>
      preContractRequest(takeOffer, { buyerAddress, heroId }, true),
    buyHero: ({ heroId, price }: BuyHeroInterface) =>
      preContractRequest(buyHero, { heroId, price }, true),
    offerHero: ({ heroId, price }: OfferHeroInterface) =>
      preContractRequest(offerHero, { heroId, price }, true),
    cancelOffer: ({ heroId }: CancelOfferInterface) =>
      preContractRequest(cancelOffer, { heroId }, true),
    changePrice: ({ heroId, price }: ChangePriceInterface) =>
      preContractRequest(changePrice, { heroId, price }, true),
    listHero: ({ heroId, price }: ListHeroInterface) =>
      preContractRequest(listHero, { heroId, price }, true),
    delistHero: ({ heroId }: DelistHeroInterface) =>
      preContractRequest(delistHero, { heroId }, true),
    getHeroPrice: ({ heroId }: HeroPriceInterface) => getHeroPrice({ heroId }),
  };
};

export default useMarketContracts;
