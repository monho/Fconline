import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ChartTable = styled.form`
  width: 530px;
  border-collapse: collapse;
`;

const TableHeade = styled.thead`
  background: rgb(45, 47, 55);
  width: 100%;
`;

const HeaderItem = styled.tr`
  color: #fff;
  display: flex;
  width: 500px;
  height: 44px;
  align-items: flex-start;
  flex-shrink: 0;
`;

const HeaderItemText = styled.th`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: rgb(255, 255, 255);
  padding: 16px 0px;
  flex-grow: 1; /* 추가된 부분: 각 셀의 동일한 너비를 보장하기 위해 */
`;

const Tablebody = styled.tbody`
  background: rgb(33, 34, 39);
`;

const Tablebodyarea = styled.tr`
  padding: 5px;
  display: flex;
  border-bottom: 1px solid rgb(45, 47, 55);
  height: 49px;
  flex-shrink: 0;
`;

const Tablebodyareatext = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  padding: 11px 0px 10px;
  color: rgb(207, 209, 215);
  flex-grow: 1; /* 추가된 부분: 각 셀의 동일한 너비를 보장하기 위해 */
  &:hover {
    text-decoration: underline;
  }

  &:nth-child(2) {
    cursor: pointer;
  }
`;
function RankChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 페이지 접속 후 한 번만 호출
        const response = await axios.get("http://localhost:3005/crawlTop5Data");
        setData(response.data.crawledData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 처음 렌더링 시에만 실행

  return (
    <ChartTable>
      <TableHeade>
        <HeaderItem>
          <HeaderItemText>순위</HeaderItemText>
          <HeaderItemText>구단주명</HeaderItemText>
          <HeaderItemText>랭크포인트</HeaderItemText>
        </HeaderItem>
      </TableHeade>
      <Tablebody>
        {data.map((item, index) => (
          <Tablebodyarea key={index}>
            <Tablebodyareatext>{item.rankNo}</Tablebodyareatext>
            <Tablebodyareatext>{item.name}</Tablebodyareatext>
            <Tablebodyareatext>{item.rankRWinPoint}</Tablebodyareatext>
          </Tablebodyarea>
        ))}
      </Tablebody>
    </ChartTable>
  );
}
export default RankChart;
