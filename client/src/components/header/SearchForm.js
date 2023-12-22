import React, { useState } from 'react';
import styled from "styled-components";

const FormContainer = styled.form`
    display: flex;
    width: 500px;
    height: 44px;
    justify-content: flex-end;
    align-items: center;
    border-radius: 20px;
    border: 1px solid #8B8B8B;
    background: #FFF;
    margin-top:15px;
`;

const Input = styled.input`
    padding: 5px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size:16px;
    margin-left: 15px;
    margin-right: 8px;
    border: none;
    border-radius: 4px;
    outline: none; /* 포커스 시 outline 제거 */
    width: 100%;
`;

const Button = styled.button`
  padding: 8px 12px;
  color: #717171;
  border: none;
  background:none;
  cursor: pointer;
  font-size:20px;
`;

function SearchForm() {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // 여기에서 입력값을 사용하거나 필요한 작업을 수행합니다.
      console.log('Submitted:', inputValue);
    };
    return (
        <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="구단주명 입력"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit">
         <i class="fas fa-search"></i>
        </Button>
      </FormContainer>
    );
}
export default SearchForm;