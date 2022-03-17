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

export {
  AllItemsRight, AllItemsLeft, SpaceBetween
}