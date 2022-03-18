import React, { Fragment, useState, useEffect } from 'react';
import { Section, SelectAssets, SelectField } from "../";
import {AllItemsRight, Button, CenterItems, Line} from "../../utils/GlobalStyledComponents";
import styled from "styled-components";
import { swapUseEffect } from "../../services/useEffectServices";

const payDetails = {
  label: {
    label: "pay",
    leftLabel: "Pay",
    rightLabel: "Available"
  }
}

const receiveDetails = {
  label: {
    label: "receive",
    leftLabel: "Receive (Estimated)",
    rightLabel: "Available"
  }
}

const Header = styled(AllItemsRight)`
  margin-bottom: 1.5rem;
  & i {
    padding: .6rem;
    border-radius: .5rem;
    color: ${props => props.theme.textPrimary};
    background-color: ${props => props.theme.backgroundButton};
  }
  
  & i:hover {
    cursor: pointer;
  }
`

const SwitchAssetButtonIcon = styled(CenterItems)`
  cursor: pointer;
  margin-top: 1.2rem;
  & i {
    font-size: 1.3rem;
    color: ${props => props.theme.textPrimary};
  }
`

const ConversionRate = styled(CenterItems)`
  margin: 1.3rem 0 .2rem 0;
  font-size: .85rem;
  font-weight: bold;
  letter-spacing: .03rem;
  color: ${props => props.theme.textSecondary};
  
  & i {
    cursor: pointer;
    color: ${props => props.theme.textPrimary};
  }
`

const Swap = () => {
  const [allAssets, setAllAssets] = useState([{ name: "", logoURI: "", symbol: "" }])
  const [showSelectAssets, setShowSelectAssets] = useState(false)

  const [pay, setPay] = useState({
    asset: {
      name: "",
      symbol: "",
      logoURI: ""
    },
    amount: "",
    availableBalance: 90
  })

  const [receive, setReceive] = useState({
    asset: {
      name: "",
      symbol: "",
      logoURI: ""
    },
    amount: "",
    availableBalance: 43.5
  })
  const [selectAssetField, setSelectAssetField] = useState({currentField: pay.asset, setField: setPay})

  const handleShowAssets = (type: string) => {
    setShowSelectAssets(true)
    const field = type === "pay" ? {currentField: pay.asset, setField: setPay} : {currentField: receive.asset, setField: setReceive}
    setSelectAssetField(field)
  }

  const handleSwitchAssetsForSwap = () => {
    const holdCurrentPayInfo = {...pay}
    setPay(receive)
    setReceive(holdCurrentPayInfo)
  }

  useEffect(() => {
    swapUseEffect({ setAllAssets, setPay, setReceive })
      .then()
      .catch(e => console.log(e))
  }, [])

  return (
    <Section>
      {/* is select asset component is not enabled show swap component*/}
      {showSelectAssets ? (
        <SelectAssets assets={allAssets} assetField={selectAssetField} close={setShowSelectAssets} />
      ) : (
        <Fragment>
          <Header>
            <i className="far fa-star"/>
            <i className="fal fa-gift"/>
            <i className="fal fa-share-square"/>
            <i className="fal fa-cog"/>
          </Header>

          <div>
            <SelectField currentAsset={pay.asset} handleShowAssets={handleShowAssets} setField={setPay} fieldValue={pay.amount} label={payDetails.label} availableBalance={pay.availableBalance} />
            <SwitchAssetButtonIcon>
              <i className="fal fa-arrow-circle-down" onClick={handleSwitchAssetsForSwap} />
            </SwitchAssetButtonIcon>
            <SelectField currentAsset={receive.asset} handleShowAssets={handleShowAssets} setField={setReceive} fieldValue={receive.amount} label={receiveDetails.label} availableBalance={receive.availableBalance} />
          </div>

          <ConversionRate>
            <p>1 {pay.asset.symbol} = 1 {receive.asset.symbol}</p>
            <i className="fal fa-sync" />
          </ConversionRate>

          <Button disabled={true}>Confirm Order</Button>
          <Line/>
        </Fragment>
      )}
    </Section>
  );
};

export default Swap;