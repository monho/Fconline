import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SearchForm from "../header/SearchForm";
import { BaseApiUrl, headers } from "../../apibase/Baseinfo";
import { useNavigate, useLocation } from "react-router-dom";
import divisionData from "./division";
import queryString from 'query-string';
import MatchHistoryCard from "./MatchHistory";
import DIVISION_DATAS from "./division";
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
const OtherBtn = styled.button`
  margin-top: 8px;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: #424254;
  background-color: #424254;
  border-radius: 4px;
  display: block;
  width: 1188px;
  height: 40px;
  padding: 8px 0px;
  color: #fff;
  font-size: 13px;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;
`;
function UserInfo() {
  const [userInfo, setUserInfo] = useState("");
  const [usermaxdivisionInfo, setUsermaxdivisionInfo] = useState("");
  const [divisionImgData, setDivisionImgData] = useState(""); // 추가
  const [divisionnamedata, setDivisionnameData] = useState(""); // 추가
  const [divisionInfo, setDivisionInfo] = useState({}); // 추가

  const [currentIndex, setCurrentIndex] = useState(11);
  const [historyMatches, setHistoryMatches] = useState([]); // 새로운 상태 추가
  const [limit, setmatchlimit] = useState("");

  const location = useLocation();
  const setUserOuid = location.state?.ouid;
  const setUserName = location.state?.UserName;
  const setUserLevel = location.state?.level;
  const setachievementDate = location.state?.achievementDate;
  const setUmatchType = location.state?.matchType;
  const setdivision = location.state?.division;
  //const nickname = location.state?.nickname;
  const initialMatchDetails = location.state?.matchDetails || [];
  const [matchDetails, setMatchDetails] = useState(initialMatchDetails); // 새로운 상태 추가
  const TestURl = "http://localhost:8080/api/userinfo/getuserinfo";
  const ServiceURL =
    "https://fconline-node-xwgh.vercel.app/api/userinfo/getuserinfo";



    let nicksearch = queryString.parse(window.location.search);
    console.log(nicksearch);
    const nickname = nicksearch.nickname;
    console.log(nickname)

  const navigate = useNavigate();
  useEffect(() => {
    if (!setdivision) return;
    const divisionData = DIVISION_DATAS.find(
      (divisionData) => divisionData.divisionId === setdivision
    );
    setDivisionInfo(divisionData);
  }, [setdivision]);

  const handleLoadMore = async () => {
    const apiUrl = TestURl;
    try {
      const response = await axios.post(apiUrl, {
        message: nickname,
        currentIndex: currentIndex,
      });

      const { matchDetails: newMatchDetails } = response?.data;

      setMatchDetails((prevMatches) => [...prevMatches, ...newMatchDetails]);

      setCurrentIndex(currentIndex + 11);
    } catch (error) {
      console.error("데이터를 더 로드하는 중 에러 발생:", error);
    }
  };
  
console.log(window.location.search);


  useEffect(() => {
    handleLoadMore(nickname);
    // 컴포넌트가 처음 로드될 때 한 번 실행
  }, []); // 빈 배열을 전달하여 의존성 배열이 비어있으므로 한 번만 실행
  return (
    <>
      <Warp>
        <CardWarp>
          {/* 사용자 정보 표시 */}
          <TierImage>
            <TierMark src={divisionInfo?.divisionIcon} />
          </TierImage>
          <UserInfoArea>
            <UserNamearea>
              <UserNameText>
                {setUserName} {/* 사용자 이름 표시 */}
              </UserNameText>
              <UserLvlText>구단주 레벨: &nbsp;{setUserLevel}</UserLvlText>
            </UserNamearea>
            <UserDivisionText>
              역대등급:{divisionInfo?.divisionName}
            </UserDivisionText>
          </UserInfoArea>
        </CardWarp>
        <MatchTitle>최근 히스토리</MatchTitle>
        <MatchHistoryCard
          matchDetails={matchDetails}
          onChangeMatchDetails={setMatchDetails}
        />
        <OtherBtn data-index="1" onClick={handleLoadMore}>
          더보기
        </OtherBtn>
      </Warp>
    </>
  );
}

export default UserInfo;
