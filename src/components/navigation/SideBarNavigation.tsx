import React from 'react';
import styled from "styled-components";

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
  return (
    <Nav>
      <div>
        <PersonIcon className="fal fa-user-circle" />
        <NetworkAndConnectWallet>
          <p>
            <i className="fal fa-circle"/>
            BSC
          </p>
          <button><strong>Connect to a wallet</strong></button>
        </NetworkAndConnectWallet>
        <MenuIcon className="fal fa-bars" />
      </div>
    </Nav>
  );
};

export default SideBarNavigation;