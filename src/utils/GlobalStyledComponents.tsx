import styled from "styled-components";

const AllItemsRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: .5rem;
`
const AllItemsLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .5rem;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CenterItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
`

const Button = styled.button`
  cursor: pointer;
  margin: 2rem 0 .5rem;
  padding: 1rem .5rem;
  border: none;
  width: 100%;
  font-weight: bold;
  font-size: .9rem;
  border-radius: 1rem;
  
  :disabled {
    color: ${props => props.theme.textSecondary};
    background-color: ${props => props.theme.backgroundButton};
  }
`

const Line = styled.div`
  margin: 1rem 0;
  padding: 0.03rem;
  width: 100%;
  background: ${props => props.theme.backgroundButton};
`

export {
  AllItemsRight, AllItemsLeft, SpaceBetween, CenterItems, Button, Line
}