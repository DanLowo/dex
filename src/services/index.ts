import axios from "axios";

interface getAssetsServiceProps {
  name: string,
  symbol: string,
  logoURI: string
}

export const getAssetsService = async (): Promise<Array<getAssetsServiceProps>> => {
  try {
    const { data: { tokens } } = await axios.get("https://tokens.pancakeswap.finance/pancakeswap-extended.json")
    tokens.length = 100

    return tokens.map(({name, symbol, logoURI}: getAssetsServiceProps) => ({ name, symbol, logoURI}))

  } catch(e:any) {
    throw new Error(e)
  }
}
