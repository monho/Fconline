import React from 'react';
import Header from './header/Header';
import styled from "styled-components";
import Content from './content/Content';
import Footer from './footer/Footer';


const Warp = styled.div`
   width:100%;
   height:100%;
   background: #222;
   display: flex;
    flex-direction: column;
    align-items: center;
`;


function Default() {
    return (
      <Warp>
        <Header />
        <Content />
        <Footer />
      </Warp>

    );
}
export default Default;