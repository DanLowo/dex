import React, { useState } from 'react';
import styled from "styled-components";
import { BackSection, SpaceBetween } from "../../utils/GlobalStyledComponents";
import { getTokenPriceService } from "../../services";

interface assetObjectProps {
  name: string,
  symbol: string,
  logoURI: string,
  address: string
}

interface assetFieldProps {
  currentField: assetObjectProps,
  setField: Function,
  label: string,
  matchAsset: string
}

interface selectAssetsProps {
  assets: Array<assetObjectProps>,
  close: Function,
  handleConversion: Function,
  assetField: assetFieldProps
}


const Search = styled.div`
  position: relative;
  margin-top: 1.5rem;
  & input {
    padding: .8rem 0 .8rem 2.2rem;
    border-radius: .9rem;
    width: calc(100% - 2.5rem);
    font-size: .8rem;
    font-weight: bold;
    color: ${props => props.theme.textSecondary};
    border: 1px solid ${props => props.theme.backgroundButton};
    background-color: ${props => props.theme.backgroundTertiary};

    :focus {
      outline: none;
    }
  }
  
  & i {
    position: absolute;
    top: 36%;
    left: .8rem;
    font-size: .9rem;
    color:  ${props => props.theme.textPrimary};
  }
`

const Assets = styled.div`
  margin-top: 1rem;
  height: 100%;
  overflow-y: hidden;
  max-height: inherit;
`

const AssetItem = styled(SpaceBetween)`
  padding: .8rem;
  cursor: pointer;
  
  :hover {
    border-radius: .7rem 0 0 .7rem;
    background-color: ${props => props.theme.backgroundButton};
  }
 & div {
   display: flex;
   align-items: center;
   gap: .5rem;
   font-size: .9rem;
   font-weight: bold;
   color:  ${props => props.theme.textPrimary};;
   
   img {
     width: 30px;
     height: 30px;
   }
 } 
  
  & span {
    color: ${props => props.theme.textSecondary};
    margin-right: .5rem;
  }
`

const Div = styled.div`
  height: 75%;
`

const SelectAssets = ({ assets, close, assetField: {currentField, setField, label, matchAsset}, handleConversion } : selectAssetsProps) => {

  const [assetsList, setAssetsList] = useState(assets)

  const handleSearchAssets = (e: any) => {
    const searchedAssets = assets.filter(item => {
      const regex = new RegExp(e.target.value, "gi");
      return item.symbol.match(regex) || item.name.match(regex);
    });

    setAssetsList(searchedAssets)
  }

  const handleAssetSelection = async (asset: assetObjectProps) => {
    const price = await getTokenPriceService([asset.address])
    setField((prev: object) => ({
      ...prev,
      asset: { ...asset, price: price[0] }
    }))
    handleConversion(label, price)
    close(false)
  }

  const SearchField = () => (
    <Search>
      <input type={"text"} placeholder={"Enter the token symbol or address"} onChange={handleSearchAssets}/>
      <i className="fal fa-search" />
    </Search>
  )

  return (
    <Div>
      <div>
        <BackSection onClick={() => close(false)} title={"Select An Asset"}/>
      </div>
      {SearchField()}
      <Assets>
        {assetsList.map((item, k) => (
          (item.symbol !== currentField.symbol && item.symbol !== matchAsset)  && (
            <AssetItem key={k} onClick={() => handleAssetSelection(item)}>
              <div>
                <img src={item.logoURI} alt={item.symbol}/>
                {item.symbol}
              </div>
              <span>0</span>
            </AssetItem>
          )
        ))}
      </Assets>
    </Div>
  );
};

export default SelectAssets;