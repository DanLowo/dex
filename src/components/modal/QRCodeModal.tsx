import React from 'react';
import QRCode from "react-qr-code"
import { CenterItems, Modal } from "../../utils/GlobalStyledComponents";
import styled from "styled-components";

interface qrCodeModalProps {
  close: Function
}

const QRDiv = styled(CenterItems)`
  height: 100%;
  gap: 1.5rem;
  margin-top: .5rem;
  flex-direction: column;
  
  section {
    padding: .6rem;
    border-radius: .5rem;
    background-color: ${props => props.theme.textPrimary};
  }
  
  & div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: .7rem;
    font-weight: bold;
    color: ${props => props.theme.textPrimary};
    
    i {
      cursor: pointer;
      font-size: 1.1rem;
      padding: .8rem 1rem;
      border-radius: .5rem;
      background-color: ${props => props.theme.backgroundButton};
    }
  }
`

const QrCodeModal = ({ close } : qrCodeModalProps) => {
  return (
    <Modal close={() => close(false)} title={"Invite Your Friends!"}>
      <QRDiv>
        <section>
          <QRCode level={"Q"} size={180} value={"Developed by: Daniel Olulowo"} />
        </section>
        <div>
          <i className="fal fa-copy" />
          <span>Copy Link</span>
        </div>
      </QRDiv>
    </Modal>
  );
};

export default QrCodeModal;