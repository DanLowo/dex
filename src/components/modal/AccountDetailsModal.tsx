import React from 'react';
import {Button, Modal, SpaceBetween} from "../../utils/GlobalStyledComponents";
import styled from "styled-components";

interface accountDetailsModalProps {
  close: Function,
  disconnectWallet: Function
}

const AccountDiv = styled(SpaceBetween)`
  color: ${props => props.theme.textPrimary};
  i {
    cursor: pointer;
    font-size: 1.2rem;
    padding: .6rem .7rem;
    margin-right: .5rem;
    border-radius: .5rem;
    background-color: ${props => props.theme.backgroundButton};
  }
`

const Actions = styled(SpaceBetween)`
`

interface actionButtonProps {
  dark?: boolean
}

const ActionButton = styled(Button)<actionButtonProps>`
  width: 48%;
  font-weight: bold;
  padding: 1rem .5rem;
  background-color: ${props => props.dark && props.theme.backgroundTertiary};
  
  :hover {
    background-color: ${props => props.dark ? props.theme.backgroundPrimary : props.theme.backgroundButton};
  }
  
  i {
    font-size: .8rem;
    padding: .15rem;
    border-radius: 50%;
    margin-right: .3rem;
    border: 1px solid ${props => props.theme.textPrimary};
  }
`

const Transactions = styled.div`
  margin: 2rem 0 1rem;
  
  & div:nth-child(1) {
    color: white;
    font-weight: bold;
    
    span {
      cursor: pointer;
      color: ${props => props.theme.linkOnHover};
    }
  }
`

interface transactionItemStyledProps {
  status: boolean
}

const TransactionItemStyled = styled(SpaceBetween)<transactionItemStyledProps>`
  margin-top: 1.2rem;

  i {
    font-size: 1.2rem;
    color: ${props => props.status ? props.theme.backgroundOnline : "red"};
  }

  h4 {
    font-size: .9rem;
    font-weight: lighter;
    color: ${props => props.theme.textPrimary};
  }
`

interface transactionItemProps {
  name: string,
  status: boolean
}

const AccountDetailsModal = ({ close } : accountDetailsModalProps) => {

  const transactionDetails = [
    {name: "Swap BUSD", status: true},
    {name: "Approve BUSD", status: true},
    {name: "Stake", status: false},
    {name: "Stake", status: true},
    {name: "Approve BTCB", status: false},
    {name: "Stake", status: true},
  ]

  const TransactionItem = ({ name, status } : transactionItemProps) => (
    <TransactionItemStyled status={status}>
      <h4>{name}</h4>
      <i className="fal fa-check"/>
    </TransactionItemStyled>
  )

  return (
    <Modal close={() => close()} title={"Account"}>
      <AccountDiv>
        <h3>0xBAD7432A...6435F</h3>
        <div>
          <i className="fal fa-external-link"/>
          <i className="fal fa-copy"/>
        </div>
      </AccountDiv>
      <Actions>
        <ActionButton dark>
          <i className="fal fa-exchange"/>
          Switch Wallet</ActionButton>
        <ActionButton>Disconnect Wallet</ActionButton>
      </Actions>

      <Transactions>
        <SpaceBetween>
          <h4>Recent Transactions</h4>
          <span>Clear all</span>
        </SpaceBetween>

        <div>
          {transactionDetails.map((item, k) => <TransactionItem key={k} name={item.name} status={item.status} />)}
        </div>
      </Transactions>
    </Modal>
  );
};

export default AccountDetailsModal;