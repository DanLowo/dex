import React from 'react';
import styled from "styled-components";
import { NavigationBar, SideBarNavigation } from "../index";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100vw;
  justify-content: space-between;
  
  >:nth-child(1) {
    width: calc(72% - 5rem);
    padding: 1rem 2.5rem;
    background-color: ${props => props.theme.backgroundPrimary};
  };
  
  >:nth-child(2) {
    width: 30%;
    padding: 1rem;
    background-color: ${props => props.theme.backgroundSecondary};
    
    & main {
      width: 100%;
      height: calc(100% - 2rem);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`

const PageAndSidebarWrapper = ({ children } : propTypes) => {
  return (
    <Wrapper>
      <div>
        <NavigationBar />
        {children[0]}
      </div>

      <div>
        <SideBarNavigation />
        <main>
          {children[1]}
        </main>
      </div>
    </Wrapper>
  );
};

export default PageAndSidebarWrapper;

interface propTypes {
  children: Array<object>
}
