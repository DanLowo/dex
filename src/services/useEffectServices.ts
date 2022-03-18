import {getAssetsService, getTokenPriceService} from "./index";

interface swapInterface {
  setAllAssets: Function,
  setPay: Function,
  setReceive: Function,
}

export const swapUseEffect = async ({setAllAssets, setPay, setReceive } : swapInterface ) => {
  try {
    const res = await getAssetsService()
    const prices = await getTokenPriceService([res[0].address, res[1].address])

    setAllAssets(res)
    setPay((prev: any) => ({
      ...prev,
      asset: { ...res[0], price: prices[0] }
    }))

    setReceive((prev: any) => ({
      ...prev,
      asset: { ...res[1], price: prices[1] }
    }))

  } catch(e: any) {
    throw new Error(e)
  }
}