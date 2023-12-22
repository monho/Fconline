import React from 'react';
import Header from './header/Header';
import styled from "styled-components";
import Content from './content/Content';


const Warp = styled.div`
   width:100%;
   height:100%;
   background: #222;
`;


function Default() {
    return (
      <Warp>
        <Header />
        <Content />
      </Warp>

    );
}
export default Default;