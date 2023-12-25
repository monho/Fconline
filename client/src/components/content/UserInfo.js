import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SearchForm from "../header/SearchForm";
import { BaseApiUrl, headers } from "../../apibase/Baseinfo";
import { useLocation } from "react-router-dom";
import divisionData from "./division.json";
import MatchHistoryCard from "./MatchHistory";
const Warp = styled.div`
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 1140px;
`;

const CardWarp = styled.div`
  width: 100%;
  height: 220px;
  align-items: center;
  display: flex;
  margin-bottom: 16px;
  padding: 16px 24px;
  border-radius: 15px;
  background-color: #252525;
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
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;
const UserNamearea = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
const UserNameText = styled.div`
  color: #fff;
  display: inline-block;
  font-weight: 700;
  vertical-align: middle;
  font-size: 23px;
`;
const UserDivisionText = styled.div`
  color: #fff;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
`;
const UserLvlText = styled.div`
  margin-left: 5px;
  background-color: #191d2c;
  border-radius: 2px;
  font-size: 14px;
  line-height: 12px;
  padding: 8px;
  color: #fff;
  vertical-align: middle;
`;
const UserdivisionDate = styled.div`
  font-size: 14px;
  color: #fff;
  vertical-align: middle;
`;
const MatchTitle = styled.h3`
  color: #fff;
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 25px;
`;

function UserInfo() {
  const [userInfo, setUserInfo] = useState("");
  const [usermaxdivisionInfo, setUsermaxdivisionInfo] = useState("");
  const [divisionImgData, setDivisionImgData] = useState(""); // 추가
  const [divisionnamedata, setDivisionnameData] = useState(""); // 추가
  const location = useLocation();
  const setUserOuid = location.state?.userOuid;
  console.log("데이터 입니다.::" + JSON.stringify(location.state));
  const handleSubmit = async () => {
    if (!setUserOuid) {
      return;
    }

    try {
      // const response = await axios.post('/api/userinfo/getuserinfo', {})
      // const response = await axios.get(
      //   BaseApiUrl.baseURL + "/fconline/v1/user/basic?ouid=" + setUserOuid,
      //   { headers }
      // );
      // const maxdivision = await axios.get(
      //   BaseApiUrl.baseURL +
      //     "/fconline/v1/user/maxdivision?ouid=" +
      //     setUserOuid,
      //   { headers }
      // );
      // const filteredData = maxdivision.data.filter(
      //   (item) => item.matchType === 50
      // );
      // if (filteredData.length > 0) {
      //   const { division } = filteredData[0]; // 첫 번째 매치만 가져오기
      //   // division.json 파일에서 divisionId 값과 비교하여 같으면 해당 이미지 경로를 가져오기
      //   console.log(division);
      //   const matchingIndex = divisionData.findIndex(
      //     (item) => item.divisionId === division
      //   );
      //   if (matchingIndex !== -1) {
      //     const divisionImg = divisionData[matchingIndex].divisionIcon;
      //     const divisionText = divisionData[matchingIndex].divisionName;
      //     setDivisionImgData(divisionImg); // 상태 업데이트
      //     setDivisionnameData(divisionText);
      //   } else {
      //     console.warn(
      //       "매치 타입이 50인 객체가 있으나 division.json에 해당 divisionId가 없습니다."
      //     );
      //   }
      //   setUserInfo(response.data);
      //   setUsermaxdivisionInfo(maxdivision.data);
      // } else {
      // }
      // const { matchType } = response.data; // level과 nickname 추출
      // setUserInfo(response.data);
      // setUsermaxdivisionInfo(maxdivision.data);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 처음 로드될 때 한 번 실행
    handleSubmit();
  }, []); // 빈 배열을 전달하여 의존성 배열이 비어있으므로 한 번만 실행

  return (
    <>
      <Warp>
        <CardWarp>
          <TierImage>
            <TierMark src={divisionImgData} />
          </TierImage>
          <UserInfoArea>
            <UserNamearea>
              <UserNameText>
                {usermaxdivisionInfo.matchType}
                {userInfo.nickname}
              </UserNameText>
              <UserLvlText>구단주 레벨: &nbsp;{userInfo.level}</UserLvlText>
            </UserNamearea>
            <UserDivisionText>역대등급:{divisionnamedata}</UserDivisionText>
          </UserInfoArea>
        </CardWarp>
        <MatchTitle>최근 히스토리</MatchTitle>
        <MatchHistoryCard />
      </Warp>
    </>
  );
}

export default UserInfo;
