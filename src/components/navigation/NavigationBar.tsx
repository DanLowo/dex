import React from 'react';
import styled from "styled-components";
import LogoImg from "../../assets/images/Logo.png"
import { navigationDummyData } from "../../utils/dummyData";

// Interfaces
interface navListItemProps {
  dropdown?: boolean
}

interface dropDownProps {
  no: number,
  length: number
}

interface menuItemProps {
  icon: string,
  title: string,
  body: string,
  no: number,
  length: number
}


// Styled components
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

const NavListItem = styled.li<navListItemProps>`
  position: relative;
  font-size: 1.05rem;
  color: ${props => props.theme.textPrimary};
  font-weight: bold;
  
  & span {
    display: flex;
    align-items: center;
    gap: .8rem;
  }
  
  & span i {
    margin-top: .2rem;
    font-weight: bold;
    font-size: .8rem;
  }

  & div {
    display: none;
  }
  
  :hover, :hover i {
    cursor: pointer;
    color: ${props => props.theme.linkOnHover};
  }

  :hover div {
    display: inherit;
  }
`

const DropDownMenu = styled.div`
  position: absolute;
  padding-top: 1rem;
  left: -2rem;
  width: 22vw;
  height: fit-content;
  
  > div {
    height: 100%;
    border-radius: .9rem;
    background-color: ${props => props.theme.backgroundSecondary};
  }
`

const DropDownMenuItem = styled.div<dropDownProps>`
  padding: 1.2rem;
  & header {
    margin-bottom: .2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  & header i {
    padding: .5rem;
    border-radius: 50%;
    background-color: ${props => props.theme.backgroundButton};
    color: ${props => props.theme.backgroundOnline} !important;
  }
  
  & header h3 {
    font-size: 1rem;
    font-weight: bold;
    color: ${props => props.theme.textPrimary};
  }
  
  & p {
    font-weight: normal;
    font-size: .95rem;
    margin-left: 3.25rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.textSecondary};
  }
  
  :hover {
    background-color: ${props => props.theme.backgroundButton};
    
    //add border radius to the first item
    border-top-left-radius: ${props => props.no === 1 ? ".9rem" : 0};
    border-top-right-radius: ${props => props.no === 1 && ".9rem"};
    
    //add border radius to the last item
    border-bottom-left-radius: ${props => props.no === props.length && ".9rem"};
    border-bottom-right-radius: ${props => props.no === props.length && ".9rem"};
  }

  :hover i {
    background-color: ${props => props.theme.backgroundSecondary};
  }
`

const NavigationBar = () => {
  const { miningMenuData, developerMenuData } = navigationDummyData;

  const MenuItem = ({ icon, title, body, no, length } : menuItemProps) => (
    <DropDownMenuItem no={no} length={length}>
      <header>
        <i className={icon} />
        <h3>{title}</h3>
      </header>
      <p>{body}</p>
    </DropDownMenuItem>
  )

  return (
    <Nav>
      <img src={LogoImg} alt={"logo"}/>
      <NavList>
        <NavListItem>Exchange</NavListItem>
        <NavListItem>Liquidity</NavListItem>

        <NavListItem>
          <span>
            Mining
            <i className="fal fa-chevron-down"/>
          </span>
          <DropDownMenu>
            <div>
              {miningMenuData.map((item, k) =>
                <MenuItem key={k} no={k+1} length={miningMenuData.length} icon={item.icon} title={item.title} body={item.body} />)
              }
            </div>
          </DropDownMenu>
        </NavListItem>

        <NavListItem>
          <span>
            Developers
            <i className="fal fa-chevron-down"/>
          </span>
          <DropDownMenu>
            <div>
              {developerMenuData.map((item, k) =>
                <MenuItem key={k} no={k+1} length={developerMenuData.length} icon={item.icon} title={item.title} body={item.body} />)
              }
            </div>
          </DropDownMenu>
        </NavListItem>

      </NavList>
    </Nav>
  );
};

export default NavigationBar;
