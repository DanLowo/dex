import { getAssetsService } from "./index";

interface swapInterface {
  setAllAssets: Function,
  setPay: Function,
  setReceive: Function,
}

export const swapUseEffect = async ({setAllAssets, setPay, setReceive } : swapInterface ) => {
  try {
    const res = await getAssetsService()

    setAllAssets(res)
    setPay((prev: any) => ({
      ...prev,
      asset: res[0]
    }))

    setReceive((prev: any) => ({
      ...prev,
      asset: res[1]
    }))
  } catch(e: any) {
    throw new Error(e)
  }
}