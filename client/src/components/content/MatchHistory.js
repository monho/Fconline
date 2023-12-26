import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import DIVISION_DATAS from "./division";
const CardWarp = styled.div`
  width: 100%;
  height: 120px;
  align-items: center;
  display: flex;
  padding: 16px 24px;
  position: relative;
  gap: 170px;
  background-color: #692525;
  margin-top: 10px;
`;

const MatchCardLeft = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 12px;
  padding-left: 4px;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  padding-bottom: 0;
  padding-left: 24px;
  width: 130px;
`;

const MatchCarduser = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-content: center;
`;

const MatchView = styled.div`
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  background-color: #833f3f;
`;

const MatchResultbar = styled.div`
  background-color: #b93a3a;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 8px;
`;

const MatchResultText = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 700;
  line-height: 14px;
  color: #fd8282;
`;

const MatchTypeText = styled.div`
  font-size: 14px;
  line-height: 12px;
  margin-bottom: 5px;
  color: #bcbcc8;
`;

const MatchDivisionText = styled.div`
  font-size: 14px;
  line-height: 12px;
  margin-bottom: 5px;
  color: #bcbcc8;
`;

const MatchDateTime = styled.div`
  font-size: 14px;
  line-height: 12px;
  color: #bcbcc8;
`;

const MatchTeam = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  color: #fff;
`;

const MatchVS = styled.div`
  font-size: 14px;
  width: 40px;
  background-color: #692525;
  color: #ed6767;
  margin-left: 150px;
  margin-right: 150px;
  vertical-align: middle;
  padding-top: 3px;
  font-weight: bold;
  align-items: center;
  text-align: center;
`;

const MatchInfoLink = styled.a`
  color: #ed6767;
  text-decoration: none;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

function MatchHistoryCard({ matchDetailsProp, onHistoryMatchesUpdate }) {
  const [divisionInfo, setDivisionInfo] = useState({});
  const location = useLocation();
  const UserName = location.state?.UserName;
  const matchDetails = location.state?.matchDetails;
  const [historyMatches, setHistoryMatches] = useState([]); // 새로운 상태 추가
  const division = location.state?.division;

  useEffect(
    () => {
      const divisionData = DIVISION_DATAS.find(
        (divisionData) => divisionData.divisionId === division
      );
      console.log("matchDetails가 변경되었습니다:", matchDetails);
      setDivisionInfo(divisionData);
    },
    [division],
    [matchDetails]
  );

  let cleanDivisionName = divisionInfo?.divisionName;

  // 숫자가 있는 경우에만 숫자를 제거
  if (/\d+/.test(cleanDivisionName)) {
    cleanDivisionName = cleanDivisionName.replace(/\d+/g, "");
  }

  return (
    <>
      {matchDetails.map((match, index) => (
        <CardWarp
          key={index}
          style={{
            backgroundColor:
              match?.matchInfo[0]?.matchDetail?.matchResult === "승"
                ? "#232b41"
                : "#3b2020",
          }}
        >
          <MatchResultbar
            key={index}
            style={{
              backgroundColor:
                match?.matchInfo[0]?.matchDetail?.matchResult === "승"
                  ? "#3d8ddf"
                  : "#b93a3a",
            }}
          />
          <MatchCardLeft>
            <MatchResultText
              style={{
                color:
                  match?.matchInfo[0]?.matchDetail?.matchResult === "승"
                    ? "#7fc3ff"
                    : "##ed6767",
              }}
            >
              {match?.matchInfo[0]?.matchDetail?.matchResult || "결과 없음"}
            </MatchResultText>
            <MatchTypeText>공식경기</MatchTypeText>
            <MatchDivisionText>{cleanDivisionName} 구간</MatchDivisionText>
            <MatchDateTime>{match?.matchDate || "날짜 없음"}</MatchDateTime>
          </MatchCardLeft>
          <MatchCarduser>
            <MatchTeam>{UserName}</MatchTeam>
            <MatchVS
              style={{
                backgroundColor:
                  match?.matchInfo[0]?.matchDetail?.matchResult === "승"
                    ? "#36436f"
                    : "#692525",
                color:
                  match?.matchInfo[0]?.matchDetail?.matchResult === "승"
                    ? "#7fc3ff"
                    : "##ed6767",
              }}
            >
              VS
            </MatchVS>
            <MatchTeam>
              {match?.matchInfo[0]?.nickname === UserName
                ? match?.matchInfo[1]?.nickname || "상대팀 없음"
                : match?.matchInfo[0]?.nickname || "상대팀 없음"}
            </MatchTeam>
          </MatchCarduser>
          <MatchView>
            <MatchInfoLink
              href="#"
              style={{
                backgroundColor:
                  match?.matchInfo[0]?.matchDetail?.matchResult === "승"
                    ? "#36436f"
                    : "#692525",
                color:
                  match?.matchInfo[0]?.matchDetail?.matchResult === "승"
                    ? "#7fc3ff"
                    : "##ed6767",
              }}
            >
              <i className="fas fa-arrow-right"></i>
            </MatchInfoLink>
          </MatchView>
        </CardWarp>
      ))}
    </>
  );
}
export default MatchHistoryCard;
