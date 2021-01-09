import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ScInfoWrapper = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
`;

const ValueWrapper = styled.div`
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    vertical-align: top;
`;

export const InfoItem = ({ infoKey, infoValue, style }) => (
    <ScInfoWrapper style={style}>
        <span>
            {infoKey}
            {infoKey ? '：' : null}
        </span>
        <ValueWrapper>{infoValue}</ValueWrapper>
    </ScInfoWrapper>
);

InfoItem.propTypes = {
    infoKey: PropTypes.string,
    infoValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    style: PropTypes.object,
};
