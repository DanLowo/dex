import React from 'react';
import styled from "styled-components";

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
    width: 28%;
    padding: 1rem;
    background-color: ${props => props.theme.backgroundSecondary};
  }
`

const PageAndSidebarWrapper = ({ children } : propTypes) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export default PageAndSidebarWrapper;

interface propTypes {
  children: Array<object>
}
