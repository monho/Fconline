import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SearchForm from "../header/SearchForm";
import { BaseApiUrl, headers } from "../../apibase/Baseinfo";

const CardWarp = styled.div`
  width: 100%;
  height: 220px;
  align-items: center;
  display: flex;
  margin-bottom: 16px;
  padding: 16px 24px;
`;
const TierImage = styled.div``;
const TierImagInner = styled.div`
  border: 2px solid #5273ba;
  border-radius: 50%;
  display: inline-block;
`;
const TierMark = styled.img`
  border: 4px solid transparent;
  border-radius: 50%;
  width: 102px;
  height: 102px;
`;
const UserInfoArea = styled.div`
  flex: 1;
  margin-left: 16px;
`;
const UserNamearea = styled.div`
  margin-bottom: 15px;
`;
const UserNameText = styled.div`
  color: #fff;
  display: inline-block;
  font-weight: 700;
  vertical-align: middle;
`;
const UserLvlText = styled.div`
  background-color: #191d2c;
  border-radius: 2px;
  font-size: 12px;
  line-height: 12px;
  padding: 4px;
`;
function HeaderInfoCard() {
  const [userOuid, setUserInfo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get(
      BaseApiUrl.baseURL + "fconline/v1/user/basic=" + SearchForm.setUserOuid,
      { headers }
    );
    setUserInfo(response.data);
  };

  return (
    <CardWarp>
      <TierImage>
        <TierMark />
      </TierImage>
      <UserInfoArea>
        <UserNamearea>
          <UserNameText />
          <UserLvlText />
        </UserNamearea>
      </UserInfoArea>
    </CardWarp>
  );
}
export default HeaderInfoCard;
