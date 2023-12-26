import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.form`
  display: flex;
  width: 500px;
  height: 44px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #8b8b8b;
  background: #fff;
  margin-top: 15px;
`;

const Input = styled.input`
  padding: 5px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 16px;
  margin-left: 15px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  outline: none;
  width: 100%;
`;

const Button = styled.button`
  padding: 8px 12px;
  color: #717171;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
`;

function SearchForm() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const apiUrl = "http://localhost:8080/api/userinfo/getuserinfo";

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputValue.trim()) return;
    try {
      const response = await axios.post(apiUrl, {
        message: inputValue,
      });

      const serverData = response.data;

      const {
        UserName,
        level,
        ouid,
        maxDivision,
        matchType,
        division,
        achievementDate,
        matchDetails,
      } = serverData;

      // console.log("Match Details:", matchDetails);

      navigate("/userinfo", {
        state: { ...serverData, nickname: inputValue },
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorCode
      ) {
        setError(`API 오류: ${error.response.data.errorCode}`);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    }
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
        <i className="fas fa-search"></i>
      </Button>
      
    </FormContainer>
  );
}

export default SearchForm;