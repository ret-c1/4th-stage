import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const loading = keyframes`
    from{
        background-position: 100% 50%;
    }
    to{
        background-position: 0 50%;
    }
`;

const AvatarNode = styled.div`
    margin: 0;
    padding: 0;
    margin-right: 14px;
    & > span {
        display: block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        background: #f2f2f2;
        margin: 0;
        padding: 0;
    }
    ${(props) =>
        props.active &&
        css`
            & > span {
                background: linear-gradient(
                    90deg,
                    rgb(32, 41, 69) 25%,
                    rgb(25, 31, 53) 37%,
                    rgb(32, 41, 69) 63%
                );
                background-size: 400% 100%;
                animation: ${loading} 1.4s ease infinite;
            }
        `};
`;

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <AvatarNode {...this.props}>
                <span />
            </AvatarNode>
        );
    }
}

export default Avatar;
