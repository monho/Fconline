import React from "react";
import styled from "styled-components";
import RankChart from "./RankChart";
import queryString from 'query-string';


const Warp = styled.div`
  display: flex;
  width: 1080px;
  height: 108px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

function Content() {

  console.log(window.location.search);

  let nicksearch = queryString.parse(window.location.search);
  
  

  return <Warp></Warp>;
}
export default Content;
