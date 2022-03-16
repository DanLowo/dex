import React from 'react';
import styled from "styled-components";

const StyledSection = styled.section`
  padding: 2rem;
  height: 70%;
  border-radius: 1.2rem;
  width: calc(90% - 3rem);
  background-color: ${props => props.theme.backgroundTertiary};
`

interface props {
  children: object
}

const Section = ({ children } : props) => {
  return (
    <StyledSection>
      {children}
    </StyledSection>
  );
};

export default Section;