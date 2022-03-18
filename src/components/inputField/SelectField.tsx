import React, { Fragment } from 'react';
import styled from "styled-components";
import { SpaceBetween } from "../../utils/GlobalStyledComponents";

interface labelProps {
  label: string,
  leftLabel: string
  rightLabel?: string,
}

interface currentAssetProps {
  name: string,
  symbol: string,
  logoURI: string
}

interface SelectFieldProps {
  fieldValue: any,
  setField: Function,
  currentAsset: currentAssetProps,
  availableBalance: number,
  handleShowAssets: Function,
  label: labelProps
}

const LabelSection = styled(SpaceBetween)`
  font-size: .97rem;
  margin: 1.2rem 0 .4rem 0;
  color: ${props => props.theme.textSecondary};
`

const Field = styled.div`
  position: relative;
  height: 3.75rem;
`

const InputField = styled.input`
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem .5rem;
  border-radius: .9rem;
  width: calc(100% - 1rem);
  color: ${props => props.theme.textSecondary};
  border: 2px solid ${props => props.theme.backgroundButton};
  background-color: ${props => props.theme.backgroundTertiary};
  
  :focus {
    float: right;
    outline: none;
  }
`

const SelectOption = styled(SpaceBetween)`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 32%;
  left: 10px;
  height: 100%;
  color: ${props => props.theme.textPrimary};
  z-index: 2;
  
  & span {
    display: flex;
    gap: .3rem;
    font-size: .9rem;
    font-weight: bold;
    align-items: center;
  }
  
  & img {
    width: 30px;
    height: 30px;
  }
  
  & i {
    margin-top: .1rem;
    font-weight: bold;
    font-size: .8rem;
  }
  
  :hover {
  }
`

const SelectField = (props : SelectFieldProps) => {
  const { currentAsset, label: {label, leftLabel, rightLabel}, availableBalance, fieldValue, setField, handleShowAssets } = props

  const handleInput = (e: any) => {
    setField((prev: any) => ({
      ...prev,
      amount: e.target.value
    }))
  }

  return (
    <Fragment>
      <LabelSection>
        <label>{leftLabel}</label>
        <span>{rightLabel}: {availableBalance}</span>
      </LabelSection>
      <Field>
        <InputField id={label} type={"number"} value={fieldValue} onChange={handleInput} />
        <SelectOption onClick={() => handleShowAssets(label)}>
          <span>
            <img src={currentAsset.logoURI} alt={currentAsset.symbol} />
            {currentAsset.symbol}
          </span>
          <i className="fal fa-chevron-down" />
        </SelectOption>
      </Field>
    </Fragment>
  );
};

export default SelectField;