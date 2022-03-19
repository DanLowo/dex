import React, { useState } from 'react';
import {AllItemsLeft, Modal} from "../../utils/GlobalStyledComponents";
import styled from "styled-components";
import {BSCIcon, MetamaskIcon, TrustWalletIcon, WalletConnectIcon} from "../../assets/images";

interface connectWalletModalProps {
  close: Function,
  connectWallet: Function
}

interface itemsProps {
  accepted?: boolean
}

const Items = styled(AllItemsLeft)<itemsProps>`
  margin-top: 1rem;
  width: calc(100% - 2rem);
  padding: .7rem 1rem;
  border-radius: .8rem;
  color: ${props => props.theme.textPrimary};
  background-color: ${props => props.theme.backgroundTertiary};
  
  :hover {
    cursor: ${props => props.accepted && "pointer"};
    background-color: ${props => props.accepted ? props.theme.backgroundPrimary : props.theme.backgroundTertiary};
  }
  
  h4 {
    color: ${props => props.accepted ? props.theme.textPrimary : props.theme.textSecondary};
  }
  
  img {
    width: 15%;
    height: 10%;
  }
`

const ConnectWalletModal = ({ close, connectWallet } : connectWalletModalProps) => {
  const [acceptTerms, setAcceptTerms] = useState(false)

  const connectOptions = [
    {name: "Metamask", icon: MetamaskIcon},
    {name: "Binance Chain Wallet", icon: BSCIcon},
    {name: "Wallet Connect", icon: WalletConnectIcon},
    {name: "Trust Wallet", icon: TrustWalletIcon}
  ]

  const handleConnectWallet = () => {
    if(acceptTerms) {
      connectWallet(true)
      close(false)
    }
  }

  return (
    <Modal close={() => close()} title={"Connect Wallet"}>
        <Items>
          <input onChange={() => setAcceptTerms(!acceptTerms)} checked={acceptTerms} id={"agree"} type={"checkbox"}/>
          <label htmlFor={"agree"}>I have read, understand, and agree to the <a>Terms of Services</a></label>
        </Items>

        <div>
          {connectOptions.map(item => (
            <Items key={item.name} accepted={acceptTerms} onClick={handleConnectWallet}>
              <img src={item.icon} alt={item.name} />
              <h4>{item.name}</h4>
            </Items>
          ))}
        </div>
    </Modal>
  );
}

export default ConnectWalletModal;