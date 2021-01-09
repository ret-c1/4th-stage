import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Layout, BackTop, Affix } from 'antd';
// import styled from 'styled-components';
import Console from './Console';
import CSOData from './CSOData';

const ODataMain = (props) => {
    const { children } = props;
    const [type, setType] = useState(null);
    useEffect(() => {
        const state = /csov/.test(window.location.pathname);
        if (state) {
            setType('csov');
        } else {
            setType(null);
        }
    }, [window.location.pathname]);

    if (type === 'csov') {
        return <CSOData>{children}</CSOData>;
    }
    return <Console>{children}</Console>;
};

ODataMain.propTypes = {
    children: PropTypes.node,
};

export default ODataMain;
