import React from 'react';
import styled from "styled-components";
import { AllItemsLeft, SpaceBetween } from "../../utils/GlobalStyledComponents";
import { getTokenPriceService } from "../../services";

interface assetObjectProps {
  name: string,
  symbol: string,
  logoURI: string,
  address: string
}

interface assetFieldProps {
  currentField: assetObjectProps,
  setField: Function
}

interface selectAssetsProps {
  assets: Array<assetObjectProps>,
  close: Function,
  assetField: assetFieldProps
}

const BackSection = styled(AllItemsLeft)`
  cursor: pointer;
  color: ${props => props.theme.textPrimary};
  font-weight: bold;
  letter-spacing: .05rem;
`


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
const SearchField = () => (
  <Search>
    <input type={"text"} placeholder={"Enter the token symbol or address"}/>
    <i className="fal fa-search" />
  </Search>
)

const Assets = styled.div`
  margin-top: 1rem;
  height: 100%;
  overflow-y: scroll;
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

const SelectAssets = ({ assets, close, assetField: {currentField, setField} } : selectAssetsProps) => {

  const handleAssetSelection = async (asset: assetObjectProps) => {
    const price = await getTokenPriceService([asset.address])
    setField((prev: object) => ({
      ...prev,
      asset: { ...asset, price: price[0] }
    }))
    close(false)
  }

  return (
    <Div>
      <div>
        <BackSection onClick={() => close(false)}>
          <i className="fal fa-long-arrow-left" />
          <span>Select An Asset</span>
        </BackSection>
      </div>
      <SearchField />
      <Assets>
        {assets.map((item, k) => (
          item.symbol !== currentField.symbol && (
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