import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import PublicHeader from '@components/PublicHeader';
import PublicFooter from '@components/PublicFooter';

const StyledLayout = styled(Layout)`
    width: 100%;
    min-width: 1200px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;
const ScContent = styled.div`
    min-height: calc(100vh - 100px - 110px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NoMatch = () => {
    const history = useHistory();
    console.log(history);
    return (
        <StyledLayout>
            <PublicHeader />
            <ScContent>404</ScContent>
            <PublicFooter />
        </StyledLayout>
    );
};

// NoMatch.propTypes = {
//     requestLogin: PropTypes.func,
// };

export default NoMatch;
