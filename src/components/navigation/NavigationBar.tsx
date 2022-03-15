import React from 'react';
import styled from "styled-components";
import LogoImg from "../../assets/images/Logo.png"

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8%;
`

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style-type: none;
`

const NavListItem = styled.li`
  display: flex;
  font-size: 1.05rem;
  letter-spacing: .03rem;
  align-items: center;
  gap: .5rem;
  
  >i {
    display: none;
    font-size: .8rem;
  }
  :hover, :hover i {
    display: inherit;
    cursor: pointer;
    color: ${props => props.theme.linkOnHover};
  }
`

const Logo = styled.img``


const NavigationBar = () => {
  return (
    <Nav>
      <Logo src={LogoImg} alt={"logo"} />
      <NavList>
        <NavListItem>
          Exchange
          <i className="fal fa-chevron-down" />
        </NavListItem>

        <NavListItem>
          Liquidity
          <i className="fal fa-chevron-down" />
        </NavListItem>

        <NavListItem>
          Mining
          <i className="fal fa-chevron-down" />
        </NavListItem>

        <NavListItem>
          Developers
          <i className="fal fa-chevron-down" />
        </NavListItem>
      </NavList>
    </Nav>
  );
};

export default NavigationBar;
