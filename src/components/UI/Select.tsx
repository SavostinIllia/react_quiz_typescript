import React from "react";
import styled from "styled-components";

interface SelectProps {
  label: string;
  value: number;
  onChange?(e: React.ChangeEvent<HTMLSelectElement>): void;
  options: { text: number; value: number }[];
}

const SelectContainer = styled.div`
  flex: 0 0 100%;
  padding-bottom: 30px;
`;

const SelectLabel = styled.label`
  display: block;
  font-size: 25px;
  color: var(--whiteTextColor);
  padding-bottom: 15px;
`;

const SelectForm = styled.select`
  display: block;
  width: 100%;
  background: transparent;
  border: 1.5px solid var(--whiteTextColor);
  padding: 5px 15px;
  border-radius: 7px;
  color: var(--whiteTextColor);

  font-size: 20px;
`;

const SelectOption = styled.option`
  background: transparent;
  color: #aaa;
  font-size: 25px;
`;

const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => {
  const htmlFor = `${label}-${Math.random()}`;

  return (
    <SelectContainer>
      <SelectLabel htmlFor={htmlFor}>{label}</SelectLabel>
      <SelectForm id={htmlFor} value={value} onChange={onChange}>
        {options.map((option, index: number) => {
          return (
            <SelectOption value={option.value} key={option.value + index}>
              {option.text}
            </SelectOption>
          );
        })}
      </SelectForm>
    </SelectContainer>
  );
};
export default Select;
