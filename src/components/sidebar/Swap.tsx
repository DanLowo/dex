import React, { useState } from 'react';
import Section from "./Section";
import { AllItemsRight } from "../../utils/GlobalStyledComponents";
import styled from "styled-components";
import SelectField from "../inputField/SelectField";

const payDetails = {
  label: {
    leftLabel: "Pay",
    rightLabel: "Available"
  },
  availableBalance: 200
}

const receiveDetails = {
  label: {
    leftLabel: "Receive (Estimated)",
    rightLabel: "Available"
  },
  availableBalance: 78
}

const Header = styled(AllItemsRight)`
  & i {
    padding: .6rem;
    border-radius: .5rem;
    color: ${props => props.theme.textPrimary};
    background-color: ${props => props.theme.backgroundButton};
  }
  
  & i:hover {
    cursor: pointer;
    
  }
`


const Swap = () => {
  const [pay, setPay] = useState({
    assetName: "",
    amount: 0
  })

  const [receive, setReceive] = useState({
    assetName: "",
    amount: 0
  })

  return (
    <Section>
      <Header>
        <i className="far fa-star"/>
        <i className="fal fa-gift"/>
        <i className="fal fa-share-square"/>
        <i className="fal fa-cog"/>
      </Header>

      <div>
        <SelectField setField={setPay} fieldValue={pay.amount} label={payDetails.label} availableBalance={payDetails.availableBalance} />

        <SelectField setField={setReceive} fieldValue={receive.amount} label={receiveDetails.label} availableBalance={receiveDetails.availableBalance} />
      </div>
    </Section>
  );
};

export default Swap;