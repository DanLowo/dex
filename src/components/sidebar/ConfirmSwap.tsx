import React from 'react';
import {BackSection, Button, SpaceBetween, TxnDetails} from "../../utils/GlobalStyledComponents";
import styled from "styled-components";

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
    color: ${props => props.theme.textPrimary};
  }
`

const TransactionDetails = styled.div`
  margin: 1.5rem 0 2rem;
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
  return (
    <div>
      <Header>
        <BackSection title={"Select Amount"} onClick={() => close(false)} />
        <i className="fal fa-cog" onClick={() => openSettings(true)}/>
      </Header>

      <TransactionDetails>
        <label>You pay</label>
        <div>
          <h2>{pay.amount}</h2>
          <img src={pay.asset.logoURI} alt={pay.asset.symbol}/>
        </div>
      </TransactionDetails>

      <TransactionDetails>
        <label>You Receive</label>
        <div>
          <h2>{receive.amount}</h2>
          <img src={receive.asset.logoURI} alt={receive.asset.symbol}/>
        </div>
      </TransactionDetails>

      <TransactionInfo>
        <p>
          Output is estimated, you will receive at least {""}
          {Number(receive.amount) - ((Number(receive.amount) * txn.tolerance)/100)}
          {receive.asset.symbol} or the transaction will revert.
        </p>

        <TxnDetails title={"Price"} value={`1 ${pay.asset.symbol} = ${txn.handleConversion()} ${receive.asset.symbol}`} noIcon />
        <TxnDetails title={"Minimum received"} value={`${Number(receive.amount) - ((Number(receive.amount) * txn.tolerance)/100)} ${receive.asset.symbol}`} />
        <TxnDetails title={"Price impact"} value={`< ${txn.tolerance}%`} />
        <TxnDetails title={"Liquidity Provider Fee"} value={"0.5 BUSD"} />
      </TransactionInfo>

      <Button>Confirm Order</Button>
    </div>
  );
};

export default ConfirmSwap;