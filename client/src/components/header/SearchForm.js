import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_KEY, BaseApiUrl, headers } from "../../apibase/Baseinfo";
import axios from "axios";

import UserInfo from "../content/UserInfo";

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
  const [userOuid, setUserOuid] = useState("");
  const [userinfo, setUserInfo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); // useNavigate 사용
  const [error, setError] = useState(""); // 추가: 에러 상태
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputValue.trim()) return;
    try {
      const response = await axios.get(
        BaseApiUrl.baseURL + "/fconline/v1/id?nickname=" + inputValue,
        { headers }
      );
      setUserOuid(response.data);

      const { ouid } = response.data;

      // 다른 컴포넌트로 이동
      navigate("/userinfo", { state: { userOuid: ouid } });
    } catch (error) {
      // API 오류 처리
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
