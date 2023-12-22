import React, { useState } from 'react';
import styled from "styled-components";

const ChartTable = styled.form`
    width: 530px;
    border-collapse: collapse;
`;

const TableHeade = styled.thead`
    background: rgb(45, 47, 55);
`;
const HeaderItem = styled.tr`
    display: flex;
`;

function RankChart() {
    return (
        <ChartTable>
            <TableHeade>
                <HeaderItem>순위</HeaderItem>
                <HeaderItem>구단주명</HeaderItem>
            </TableHeade>
        </ChartTable>
    );
}
export default RankChart;