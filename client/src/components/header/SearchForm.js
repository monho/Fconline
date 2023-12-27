import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

function SearchForm({ handleNicknameClick }) {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const TestURl = "http://localhost:8080/api/userinfo/getuserinfo";
  const ServiceURL =
    "https://fconline-node-xwgh.vercel.app/api/userinfo/getuserinfo";
  const apiUrl = TestURl;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
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
  
      // URL을 변경하면서 데이터도 함께 전달
      navigate(`/userinfo?nickname=${encodeURIComponent(inputValue)}`, {
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
  useEffect(() => {
    // URL 파라미터 변경을 감지하고 검색 요청 수행
    const urlSearchParams = new URLSearchParams(location.search);
    const nicknameParam = urlSearchParams.get("nickname");
  
    if (nicknameParam && inputValue !== nicknameParam) {
      setInputValue(nicknameParam);
      handleSubmit();
    }
  }, [location.search, inputValue]); // inputValue를 의존성 배열에 추가
  return (
<FormContainer onSubmit={(e) => {
  e.preventDefault();
  handleSubmit();
}}>
      <Input
        type="text"
        placeholder="구단주명 입력"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button type="submit">
        <i className="fas fa-search"></i>
      </Button>
    </FormContainer>
  );
}

export default SearchForm;