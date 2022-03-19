import React from 'react';
import styled from "styled-components";
import { BackSection, Button } from "../../utils/GlobalStyledComponents";

const SlippageTolerance = styled.div`
  margin-top: 1.5rem;
  & h4 {
    color: ${props => props.theme.textPrimary};
  }
  
  & div {
    display: flex;
    align-items: center;
    gap: .8rem;
    
     div {
      display: flex;
      align-items: center;
      gap: .2rem;
      color: ${props => props.theme.textPrimary};
       
      span {
        font-weight: bold;
       margin-top: 1rem;
      }
    }
    
    input {
      width: 35%;
      border: none;
      margin-top: 1rem;
      padding: .7rem .6rem;
      border-radius: 1rem;
      color: ${props => props.theme.textPrimary};
      background-color: ${props => props.theme.backgroundButton};
      
      :focus {
        outline: none;
      }
    }
  }
`

interface toleranceButtonProps {
  active: boolean
}
const ToleranceButton = styled(Button)<toleranceButtonProps>`
    padding: .7rem .6rem;
    width: 30%;
    border-radius: 1rem;
    background-color: ${props => props.active ? props.theme.linkOnHover : props.theme.backgroundButton};
`

interface swapSettingsProps {
  close: Function,
  tolerance: number,
  txnDeadline: string,
  setTolerance: Function
  setTxnDeadline: Function
}

const SwapSettings = ({ close, tolerance, setTolerance, txnDeadline, setTxnDeadline } : swapSettingsProps) => {
  const tolerancePercentage = [0.5, 1, 3]

  return (
    <div>
      <BackSection onClick={() => close(false)} title={"Exchange Settings"}/>
      <SlippageTolerance>
        <h4>Slippage Tolerance</h4>
        <div>
          {tolerancePercentage.map(item => <ToleranceButton key={item} onClick={() => setTolerance(item)} active={tolerance === item}>{item}%</ToleranceButton>)}
          <div>
            <input value={tolerance} type={"number"} onChange={(e) => setTolerance(Number(e.target.value))} />
            <span>%</span>
          </div>
        </div>
      </SlippageTolerance>

      <br />
      <SlippageTolerance>
        <h4>Transaction Deadline</h4>
        <div>
          <div>
            <input value={txnDeadline} type={"number"} onChange={(e) => setTxnDeadline(e.target.value)} />
            <span>Min</span>
          </div>
        </div>
      </SlippageTolerance>
    </div>
  );
};

export default SwapSettings;