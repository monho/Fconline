import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import queryString from "query-string";
import SearchForm from "../header/SearchForm";
import { BaseApiUrl, headers } from "../../apibase/Baseinfo";
import divisionData from "./division";
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

const UserNameText = styled.div`
  color: #fff;
  display: inline-block;
  font-weight: 700;
  vertical-align: middle;
  font-size: 23px;
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

const UserDivisionText = styled.div`
  color: #fff;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
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

const Namearea = styled.div`
  display: flex;
`;

function UserInfo() {
  const location = useLocation();
  const setUserOuid = location.state?.ouid;
  const setUserName = location.state?.UserName;
  const setUserLevel = location.state?.level;
  const setdivision = location.state?.division;
  const initialMatchDetails = location.state?.matchDetails || [];
  const nickname = location.state?.nickname;
  const [matchDetails, setMatchDetails] = useState(initialMatchDetails);
  const [divisionInfo, setDivisionInfo] = useState({});

  const [currentIndex, setCurrentIndex] = useState(11);

  useEffect(() => {
    if (!setdivision) return;
    const divisionData = DIVISION_DATAS.find(
      (divisionData) => divisionData.divisionId === setdivision
    );
    setDivisionInfo(divisionData);
  }, [setdivision]);

  const handleLoadMore = async () => {
    const apiUrl = "http://localhost:8080/api/userinfo/getuserinfo";
    try {
      const response = await axios.post(apiUrl, {
        message: queryString.parse(window.location.search).nickname,
        currentIndex: currentIndex,
      });

      const { matchDetails: newMatchDetails } = response?.data;

      setMatchDetails((prevMatches) => [...prevMatches, ...newMatchDetails]);

      setCurrentIndex((prevIndex) => prevIndex + 11);
    } catch (error) {
      console.error("데이터를 더 로드하는 중 에러 발생:", error);
    }
  };
  const handleLoadMore2 = async () => {
    const apiUrl = "http://localhost:8080/api/userinfo/getuserinfo";
    try {
      const response = await axios.post(apiUrl, {
        message: nickname,
        currentIndex: currentIndex,
      });

      const { matchDetails: newMatchDetails } = response?.data;

      setMatchDetails((prevMatches) => [...prevMatches, ...newMatchDetails]);

      setCurrentIndex((prevIndex) => prevIndex + 11);
    } catch (error) {
      console.error("데이터를 더 로드하는 중 에러 발생:", error);
    }
  };
  useEffect(() => {}, []);

  return (
    <Warp>
      <CardWarp>
        {/* 사용자 정보 표시 */}
        <TierMark src={divisionInfo?.divisionIcon} />
        <UserInfoArea>
          <Namearea>
            <UserNameText>{setUserName}</UserNameText>
            <UserLvlText>구단주 레벨: {setUserLevel}</UserLvlText>
          </Namearea>
          <UserDivisionText>
            역대등급: {divisionInfo?.divisionName}
          </UserDivisionText>
        </UserInfoArea>
      </CardWarp>
      <MatchTitle>최근 히스토리</MatchTitle>
      <MatchHistoryCard
        matchDetails={matchDetails}
        onChangeMatchDetails={setMatchDetails}
      />
      <OtherBtn onClick={handleLoadMore2}>더보기</OtherBtn>
    </Warp>
  );
}

export default UserInfo;
