import React from 'react';
import {Button, CenterItems, Modal} from "../../utils/GlobalStyledComponents";
import { SuccessIcon, FailIcon } from "../../assets/images";
import styled from "styled-components";

interface transactionStatusProps {
  status: string,
  details: string
  close: Function
}

const Section = styled(CenterItems)`
  flex-direction: column;
  & h3 {
    margin-top: 1rem;
    color: ${({ theme }) => theme.textPrimary};
  }
  & p {
    color: ${({ theme }) => theme.textSecondary};
  }
`

const StatusIcon = styled.img`
  width: 40%;
  max-width: 100%;
`

const TransactionStatusModal = ({ status, details, close } : transactionStatusProps) => {
  return (
    <Modal close={() => close(false)} title={""}>
      {status === "success" ? (
        <Section>
          <StatusIcon src={SuccessIcon} alt={"successful"} />
          <h3>Transaction Submitted</h3>
          <p>{details}</p>

          <Button dark>View on Bscscan</Button>
        </Section>
      ) : (
        <Section>
          <StatusIcon src={FailIcon} alt={"successful"} />
          <h3>Transaction failed</h3>
          <p>{details}</p>
          <br/>
        </Section>
      )}
    </Modal>
  );
};

export default TransactionStatusModal;