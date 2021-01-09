import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InfoWrapper = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
`;

const ValueWrapper = styled.span`
    color: rgba(0, 0, 0, 0.65);
`;

export const InfoItem = ({ infoKey, infoValue }) => (
    <InfoWrapper>
        <span>{infoKey}：</span>
        <ValueWrapper>{infoValue}</ValueWrapper>
    </InfoWrapper>
);

InfoItem.propTypes = {
    infoKey: PropTypes.string,
    infoValue: PropTypes.string,
};
