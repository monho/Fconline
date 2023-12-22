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


function RankChart() {
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