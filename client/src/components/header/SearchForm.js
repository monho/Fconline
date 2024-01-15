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
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  // useHistory 대신에 useNavigate를 사용

  const APi_URL_Test = "http://localhost:8080/";

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        APi_URL_Test + `api/getuserinfo/getuserinfo?nickname=${nickname}`
      );

      const serverData = response.data;

      const { UserName, level, ouid, maxDivision, matchType, division } =
        serverData;

      // console.log("Match Details:", matchDetails);
      navigate("/userinfo", {
        state: { ...serverData, nick: nickname },
      });
    } catch (error) {
      console.error("에러:", error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <FormContainer onSubmit={handleSearch}>
      <Input
        type="text"
        placeholder="구단주명 입력"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Button type="submit">
        <i className="fas fa-search"></i>
      </Button>
    </FormContainer>
  );
}

export default SearchForm;
