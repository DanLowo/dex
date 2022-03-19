import React, {Fragment, useState} from 'react';
import styled from "styled-components";
import {AccountDetailsModal, ConnectWalletModal} from "../index";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  
  > div {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const PersonIcon = styled.i`
  cursor: pointer;
  color: ${props => props.theme.textPrimary};
  font-size: 2rem;
`

const MenuIcon = styled(PersonIcon)`
  padding: .5rem .7rem;
  font-size: 1.5rem;
  background-color: ${props => props.theme.backgroundButton};
  border-radius: .7rem;
`

const NetworkAndConnectWallet = styled.div`
  cursor: pointer;
  color: ${props => props.theme.textPrimary};
  padding: 0 0 0 .8rem;
  border-radius: 2rem;
  width: 65%;
  display: flex;
  gap: .7rem;
  background-color: ${props => props.theme.backgroundPrimary};
  
  & p {
    font-size: .9rem;
    display: flex;
    align-items: center;
  }
  
  & p i {
    margin-right: .3rem;
    font-size: .5rem;
    border-radius: 50%;
    background-color: ${props => props.theme.backgroundOnline};
  }
  
  & button {
    font-size: .9rem;
    cursor: pointer;
    text-align: center;
    padding: .8rem 0;
    width: 100%;
    border-radius: 2rem;
    border: none;
    color: ${props => props.theme.textPrimary};
    background-color: ${props => props.theme.backgroundButton};
  }
`

const SideBarNavigation = () => {
  const [showConnectWallet, setShowConnectWallet] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  return (
    <Fragment>
      {showConnectWallet && <ConnectWalletModal close={setShowConnectWallet} connectWallet={setWalletConnected} />}
      {showAddressModal && <AccountDetailsModal close={setShowAddressModal} disconnectWallet={setWalletConnected} />}
      <Nav>
        <div>
          <PersonIcon className="fal fa-user-circle" />
          <NetworkAndConnectWallet>
            <p>
              <i className="fal fa-circle"/>
              BSC
            </p>
            {walletConnected ? (
              <button onClick={() => setShowAddressModal(true)}><strong>0xBAD7432A...6435F</strong></button>
            ) : <button onClick={() => setShowConnectWallet(true)}><strong>Connect to a wallet</strong></button>}
          </NetworkAndConnectWallet>
          <MenuIcon className="fal fa-bars" />
        </div>
      </Nav>
    </Fragment>
  );
};

export default SideBarNavigation;