import React, { Fragment, useState, useEffect } from 'react';
import { Section, SelectAssets, SelectField, SwapSettings } from "../";
import { AllItemsRight, Button, CenterItems, Line, SpaceBetween } from "../../utils/GlobalStyledComponents";
import styled from "styled-components";
import { swapUseEffect } from "../../services/useEffectServices";
import { getTokenPriceService } from "../../services";

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

const defaultAssetState = {
  asset: {
    name: "",
    symbol: "",
    logoURI: "",
    address: "",
    price: ""
  },
  amount: "",
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
    background-color: ${props => props.theme.backgroundSecondary};
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

const TransactionDetails = styled(SpaceBetween)`
  margin-bottom: .3rem;
  & div {
    font-size: .9rem;
    display: flex;
    gap: .5rem;
    align-items: center;
    
    span {
      color: ${props => props.theme.textSecondary}
    }
    i {
      color: ${props => props.theme.textPrimary}
    }
  }
  
  > span {
    font-size: .85rem;
    color: ${props => props.theme.textPrimary}
  }
`

const Swap = () => {
  const [allAssets, setAllAssets] = useState([{ name: "", logoURI: "", symbol: "", address: "" }])
  const [showSelectAssets, setShowSelectAssets] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [tolerance, setTolerance] = useState(0.5)
  const [txnDeadline, setTxnDeadline] = useState("")

  const [pay, setPay] = useState({
    ...defaultAssetState,
    availableBalance: 90
  })

  const [receive, setReceive] = useState({
    ...defaultAssetState,
    availableBalance: 43.5
  })
  const [selectAssetField, setSelectAssetField] = useState({currentField: pay.asset, setField: setPay, label: "pay", matchAsset: receive.asset.symbol})

  const handleShowAssets = (type: string) => {
    setShowSelectAssets(true)
    const field = type === "pay" ? {currentField: pay.asset, setField: setPay, label: "pay", matchAsset: receive.asset.symbol} :
      {currentField: receive.asset, setField: setReceive, label: "receive", matchAsset: pay.asset.symbol}
    setSelectAssetField(field)
  }

  const handleSwitchAssetsForSwap = () => {
    const holdCurrentPayInfo = {...pay}
    setPay(receive)
    setReceive(holdCurrentPayInfo)
  }

  const handleConversion = () => {
    return (Number(pay.asset.price) / Number(receive.asset.price)).toFixed(6)
  }

  const handleConversionFromAssetChange = (fieldType: string, price: number) => {
    if(fieldType === "pay") {
      setReceive(prev => ({
        ...prev,
        amount: ((price * Number(pay.amount)) / Number(receive.asset.price)).toFixed(6)
      }))
    } else {
      setPay(prev => ({
        ...prev,
        amount: ((price * Number(receive.amount)) / Number(pay.asset.price)).toFixed(6)
      }))
    }
  }

  const handleConversionFromInputChange = (amount: number, fieldType: string) => {
    if(fieldType === "pay") {
      setReceive(prev => ({
        ...prev,
        amount: ((Number(pay.asset.price) * Number(amount)) / Number(receive.asset.price)).toFixed(6)
      }))
    } else {
      setPay(prev => ({
        ...prev,
        amount: ((Number(receive.asset.price) * Number(amount)) / Number(pay.asset.price)).toFixed(6)
      }))
    }
  }

  const handleRefreshPrices = async () => {
    try {
      const [payPrice, receivePrice] = await getTokenPriceService([pay.asset.address, receive.asset.address])
      setPay(prev => ({
        ...prev,
        asset: {...prev.asset, price: payPrice}
      }))
      setReceive(prev => ({
        ...prev,
        asset: {...prev.asset, price: receivePrice}
      }))
    } catch (e: any) {
      console.log(e)
    }
  }

  interface tnxProps {
    title: string,
    value: string
  }

  const TnxDetails = ({title, value}: tnxProps) => (
    <TransactionDetails>
      <div>
        <span>{title}</span>
        <i className="fal fa-question-circle" />
      </div>
      <span>{value}</span>
    </TransactionDetails>
  )

  useEffect(() => {
    swapUseEffect({ setAllAssets, setPay, setReceive })
      .then()
      .catch(e => console.log(e))
  }, [])


  return (
    <Section>
      {/* is select asset component is not enabled show swap component*/}
      {showSelectAssets ? (
        <SelectAssets handleConversion={handleConversionFromAssetChange} assets={allAssets} assetField={selectAssetField} close={setShowSelectAssets} />
      ) : showSettings ? (
        <SwapSettings close={setShowSettings} tolerance={tolerance} setTolerance={setTolerance} txnDeadline={txnDeadline} setTxnDeadline={setTxnDeadline} />
      ) : (
        <Fragment>
          <Header>
            <i className="far fa-star"/>
            <i className="fal fa-gift"/>
            <i className="fal fa-share-square"/>
            <i className="fal fa-cog" onClick={() => setShowSettings(true)}/>
          </Header>

          <div>
            <SelectField handleConversion={handleConversionFromInputChange} currentAsset={pay.asset}
                         handleShowAssets={handleShowAssets} setField={setPay} fieldValue={pay.amount}
                         label={payDetails.label} availableBalance={pay.availableBalance}/>
            <SwitchAssetButtonIcon>
              <i className="fal fa-arrow-circle-down" onClick={handleSwitchAssetsForSwap}/>
            </SwitchAssetButtonIcon>
            <SelectField handleConversion={handleConversionFromInputChange} currentAsset={receive.asset}
                         handleShowAssets={handleShowAssets} setField={setReceive} fieldValue={receive.amount}
                         label={receiveDetails.label} availableBalance={receive.availableBalance}/>
          </div>

          <ConversionRate>
            <p>1 {pay.asset.symbol} = {handleConversion()} {receive.asset.symbol}</p>
            <i className="fal fa-sync" onClick={handleRefreshPrices}/>
          </ConversionRate>

          <Button disabled={(pay.amount === "" || receive.amount === "")}>Confirm Order</Button>
          <Line/>

          <TnxDetails title={"Slippage Tolerance"} value={`${tolerance}%`} />
          <TnxDetails title={"Minimum Received"} value={`${Number(receive.amount) - ((Number(receive.amount) * tolerance)/100)} ${receive.asset.symbol}`}/>
        </Fragment>
      )}
    </Section>
  );
};

export default Swap;