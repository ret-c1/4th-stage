import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ScDotWrapper = styled.div`
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
`;

const CircleDot = (props) => {
    let borderParam = {};
    if (props.borderColor) {
        borderParam = {
            border: `1px solid ${props.borderColor}`,
        };
    }
    return (
        <ScDotWrapper
            style={{
                width: props.size,
                height: props.size,
                background: props.backgroundColor,
                ...borderParam,
                ...props.style,
            }}
        />
    );
};

CircleDot.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.number,
    borderColor: PropTypes.string,
    style: PropTypes.object,
};

export default CircleDot;
