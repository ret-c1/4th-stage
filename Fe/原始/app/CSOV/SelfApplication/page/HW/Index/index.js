import React from 'react';
import styled from 'styled-components';
import CMiddle from './components/CMiddle';
import CBottom from './components/CBottom';
import TabHeaders from '../components/TabHeaders';

const ScContent = styled.div`
    width: 100%;
    height: 100%;
    font-size: 10px;
    padding: 0 24px;
    @media (max-width: 1441px) {
        font-size: 8px;
    }
`;

const HWBeforePage = () => (
    <ScContent>
        <TabHeaders />
        <CMiddle />
        <CBottom />
    </ScContent>
);

export default HWBeforePage;
