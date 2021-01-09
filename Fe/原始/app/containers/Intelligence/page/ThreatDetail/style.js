import styled from 'styled-components';

const StyleContent = styled.div`
    margin: 24px 24px 0;
`;
const StyleChart = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
const StyleChartLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    margin-right: 10px;
`;
const StyleChartRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const StyleNum = styled.div`
    font-family: HelveticaNeue;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    line-height: 32px;
`;
const StyleTitle = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    line-height: 22px;
    margin-top: 8px;
`;
export { StyleContent, StyleChart, StyleChartLeft, StyleChartRight, StyleNum, StyleTitle };
