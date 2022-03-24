import styled from "styled-components";
import React from "react";

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

interface buttonProps {
  dark?: boolean
}

const Button = styled.button<buttonProps>`
  cursor: pointer;
  margin: 1rem 0 0;
  padding: 1rem .5rem;
  border: none;
  width: 100%;
  font-weight: bold;
  font-size: .9rem;
  border-radius: 1rem;
  color: ${({ theme }) => theme.textPrimary};
  background-color ${({ theme, dark }) => dark ? theme.backgroundButton : theme.linkOnHover};
  
  :disabled {
    cursor: initial;
    color: ${props => props.theme.textSecondary};
    background-color: ${props => props.theme.backgroundButton};
  }
`

const Line = styled.div`
  margin: 1rem 0 1rem;
  padding: 0.03rem;
  width: 100%;
  background: ${props => props.theme.backgroundButton};
`

const BackSectionStyled = styled(AllItemsLeft)`
  cursor: pointer;
  color: ${props => props.theme.textPrimary};
  font-weight: bold;
  letter-spacing: .05rem;
`

interface backSectionProps {
  title: string,
  onClick: Function
}

const BackSection = ({ title, onClick } : backSectionProps) => (
  <BackSectionStyled onClick={() => onClick()}>
    <i className="fal fa-long-arrow-left" />
    <span>{title}</span>
  </BackSectionStyled>
)


const ModalStyled = styled.div`
  position: absolute !important;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: .8;
  width: 100%;
  height: 100%;
  background-color: #3f3a3a;
  z-index: 99;
  
  > div {
    height: fit-content;
    max-height: 80%;
    width: 23%;
    padding: 1.5rem;
    border-radius: 1.5rem;
    background: ${props => props.theme.backgroundSecondary};
  }
`

const HeadSection = styled(SpaceBetween)`
  color: ${props => props.theme.textPrimary};
  margin-bottom: 1.5rem;
  & i {
    cursor: pointer;
  }
`

interface modalProps {
  children: object,
  close: Function,
  title: string
}

const Modal = ({ children, close, title }: modalProps) => (
  <ModalStyled onClick={() => close(false)}>
    <div onClick={(e) => e.stopPropagation()}>
      <HeadSection>
        <h4>{title}</h4>
        <i className="fal fa-times" onClick={() => close(false)}/>
      </HeadSection>
      {children}
    </div>
  </ModalStyled>
)


const TransactionDetails = styled(SpaceBetween)`
  margin-bottom: .3rem;
  & div {
    font-size: .9rem;
    display: flex;
    gap: .5rem;
    align-items: center;
    
    span {
      color: ${props => props.theme.textSecondary}
    }
    i {
      color: ${props => props.theme.textPrimary}
    }
  }
  
  > span {
    font-size: .85rem;
    color: ${props => props.theme.textPrimary}
  }
`

interface tnxProps {
  title: string,
  value: string,
  noIcon?: boolean
}

const TxnDetails = ({title, value, noIcon}: tnxProps) => (
  <TransactionDetails>
    <div>
      <span>{title}</span>
      {!noIcon && <i className="fal fa-question-circle" />}
    </div>
    <span>{value}</span>
  </TransactionDetails>
)

export {
  AllItemsRight, AllItemsLeft, SpaceBetween, CenterItems, Button, Line, BackSection, Modal, TxnDetails
}