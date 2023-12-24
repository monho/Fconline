import React from "react";
import styled from "styled-components";
import RankChart from "./RankChart";

const Warp = styled.div`
  display: flex;
  width: 1080px;
  height: 108px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

function Content() {
  return <Warp></Warp>;
}
export default Content;
