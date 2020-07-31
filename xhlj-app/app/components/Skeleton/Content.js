import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

const loading = keyframes`
    from{
        background-position: 100% 50%;
    }
    to{
        background-position: 0 50%;
    }
`;

const ContentNode = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    padding-top: 12px;
    & > div {
        margin-bottom: 20px;
    }
    & h1 {
        width: 50%;
        height: 12px;
        background: linear-gradient(
            90deg,
            rgb(32, 41, 69) 25%,
            rgb(25, 31, 53) 37%,
            rgb(32, 41, 69) 63%
        );
        background-size: 400% 100%;
        animation: ${loading} 1.4s ease infinite;
        margin: 0;
        padding: 0;
        margin-bottom: 12px;
    }
    & ul {
        width: 100%;
        margin: 0;
        padding: 0;
    }
    & ul > li {
        list-style: none;
        margin: 0;
        padding: 0;
        background: #f2f2f2;
        width: 100%;
        height: 12px;
    }
    & ul > li + li {
        margin-top: 10px;
    }
    & ul > li:last-child:not(:first-child):not(:nth-child(2)) {
        width: 70%;
    }
    ${(props) =>
        props.active &&
        css`
            & ul > li {
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

const showItem = (loop) => {
    const arr = [];
    for (let index = 0; index < loop; index += 1) {
        arr.push(
            <div key={`skitem-${index}`}>
                <h1 />
                <ul>
                    <li />
                    <li />
                    <li />
                </ul>
            </div>,
        );
    }
    return arr;
};

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { loop } = this.props;
        return <ContentNode {...this.props}>{showItem(loop)}</ContentNode>;
    }
}

Content.propTypes = {
    loop: PropTypes.number,
};

export default Content;
