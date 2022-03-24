import React, {Fragment, useState} from 'react';
import {BackSection, Button, SpaceBetween, TxnDetails} from "../../utils/GlobalStyledComponents";
import styled from "styled-components";
import {TransactionStatusModal} from "../index";

interface assetProps {
  logoURI: string,
  symbol: string
}

interface payAndReceiveProps {
  asset: assetProps,
  amount: string
}

interface txnProps {
  tolerance: number,
  handleConversion: Function
}

interface confirmSwapProps {
  pay: payAndReceiveProps,
  receive: payAndReceiveProps,
  close: Function,
  txn: txnProps,
  openSettings: Function
}

const Header = styled(SpaceBetween)`
  i {
    cursor: pointer;
    color: ${props => props.theme.textPrimary};
  }
`

const TransactionDetails = styled.div`
  margin: 1.5rem 0;
  & label {
    font-size: .95rem;
    color: ${props => props.theme.textSecondary};
  }
  
  & div {
    margin-top: .5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    
    h2 {
      color: ${props => props.theme.textPrimary};
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
`

const TransactionInfo = styled.div`
  & p {
    margin-bottom: 1.5rem;
    color: ${props => props.theme.textSecondary};
  }
  
  & div {
    margin-bottom: .3rem;
  }
`

const ConfirmSwap = ({ close, openSettings, pay, receive, txn } : confirmSwapProps) => {
  const { amount: payAmount , asset : { symbol: paySymbol, logoURI: payLogoURI } } = pay
  const { amount: receiveAmount, asset : { symbol: receiveSymbol, logoURI: receiveLogoURI } } = receive

  const [showTransactionModal, setShowTransactionModal] = useState(false)

  const statusTypes = ["success", "fail"]
  const [{ status, details }, setTransactionDetails] = useState({
    status: statusTypes[1],
    details: `Exchanging ${payAmount} ${paySymbol} for ${receiveAmount} ${receiveSymbol}`
  })

  const handleSubmitTransaction = () => {
    setTransactionDetails(prev => ({
      ...prev,
      status: statusTypes[Math.floor(Math.random()+.5)]
    }))
    setShowTransactionModal(true)
  }

  return (
    <Fragment>
      {showTransactionModal && (
        <TransactionStatusModal status={status} details={details} close={setShowTransactionModal} />
      )}
      <div>
        <Header>
          <BackSection title={"Select Amount"} onClick={() => close(false)} />
          <i className="fal fa-cog" onClick={() => openSettings(true)}/>
        </Header>

        <TransactionDetails>
          <label>You pay</label>
          <div>
            <h2>{payAmount}</h2>
            <img src={payLogoURI} alt={paySymbol}/>
          </div>
        </TransactionDetails>

        <TransactionDetails>
          <label>You Receive</label>
          <div>
            <h2>{receiveAmount}</h2>
            <img src={receiveLogoURI} alt={receiveSymbol}/>
          </div>
        </TransactionDetails>

        <TransactionInfo>
          <p>
            Output is estimated, you will receive at least {""}
            {Number(receiveAmount) - ((Number(receiveAmount) * txn.tolerance)/100)}
            {receiveSymbol} or the transaction will revert.
          </p>

          <TxnDetails title={"Price"} value={`1 ${paySymbol} = ${txn.handleConversion()} ${receiveSymbol}`} noIcon />
          <TxnDetails title={"Minimum received"} value={`${Number(receiveAmount) - ((Number(receiveAmount) * txn.tolerance)/100)} ${receiveSymbol}`} />
          <TxnDetails title={"Price impact"} value={`< ${txn.tolerance}%`} />
          <TxnDetails title={"Liquidity Provider Fee"} value={"0.5 BUSD"} />
        </TransactionInfo>

        <Button onClick={handleSubmitTransaction}>Confirm Order</Button>
      </div>
    </Fragment>
  );
};

export default ConfirmSwap;