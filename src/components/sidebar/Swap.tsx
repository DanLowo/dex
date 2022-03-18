import React, { Fragment, useState, useEffect } from 'react';
import { Section, SelectAssets, SelectField } from "../";
import { AllItemsRight } from "../../utils/GlobalStyledComponents";
import styled from "styled-components";
import { swapUseEffect } from "../../services/useEffectServices";

const payDetails = {
  label: {
    label: "pay",
    leftLabel: "Pay",
    rightLabel: "Available"
  },
  availableBalance: 200
}

const receiveDetails = {
  label: {
    label: "receive",
    leftLabel: "Receive (Estimated)",
    rightLabel: "Available"
  },
  availableBalance: 78
}

const Header = styled(AllItemsRight)`
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

const Swap = () => {
  const [allAssets, setAllAssets] = useState([{ name: "", logoURI: "", symbol: "" }])
  const [showSelectAssets, setShowSelectAssets] = useState(false)

  const [pay, setPay] = useState({
    asset: {
      name: "",
      symbol: "",
      logoURI: ""
    },
    amount: ""
  })

  const [receive, setReceive] = useState({
    asset: {
      name: "",
      symbol: "",
      logoURI: ""
    },
    amount: ""
  })
  const [selectAssetField, setSelectAssetField] = useState({currentField: pay.asset, setField: setPay})

  const handleShowAssets = (type: string) => {
    setShowSelectAssets(true)
    const field = type === "pay" ? {currentField: pay.asset, setField: setPay} : {currentField: receive.asset, setField: setReceive}
    setSelectAssetField(field)
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
            <SelectField currentAsset={pay.asset} handleShowAssets={handleShowAssets} setField={setPay} fieldValue={pay.amount} label={payDetails.label} availableBalance={payDetails.availableBalance} />
            <SelectField currentAsset={receive.asset} handleShowAssets={handleShowAssets} setField={setReceive} fieldValue={receive.amount} label={receiveDetails.label} availableBalance={receiveDetails.availableBalance} />
          </div>
        </Fragment>
      )}
    </Section>
  );
};

export default Swap;