import React from 'react';
import Wrap from './Wrap';
import Spinkit from './Spinkit';

const Loading = () => (
    <Wrap>
        <Spinkit>
            <div className="sk-cube1 sk-cube" />
            <div className="sk-cube2 sk-cube" />
            <div className="sk-cube4 sk-cube" />
            <div className="sk-cube3 sk-cube" />
        </Spinkit>
    </Wrap>
);

export default Loading;
