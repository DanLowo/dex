import axios from "axios";

interface getAssetsServiceProps {
  name: string,
  symbol: string,
  logoURI: string,
  address: string
}

export const getAssetsService = async (): Promise<Array<getAssetsServiceProps>> => {
  try {
    const { data: { tokens } } = await axios.get("https://tokens.pancakeswap.finance/pancakeswap-extended.json")
    tokens.length = 100

    return tokens.map(({name, symbol, logoURI, address}: getAssetsServiceProps) => ({ name, symbol, logoURI, address}))

  } catch(e:any) {
    throw new Error(e)
  }
}

export const getTokenPriceService = async (tokensAddress: Array<string>): Promise<any> => {
  try {
    // map through the array of address, get the price for each and return it as a promise array
    const promises = tokensAddress.map(async address => {
      const res = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${address}`)
      return res.data.data.price
    })

    return await Promise.all(promises)
  } catch (e: any) {
    throw new Error(e)
  }
}