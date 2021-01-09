import React from 'react';
// import PropTypes from 'prop-types';
import { SctrainWrapper, ScHeader, ScHeaderInfo, ScContent, ScContentInfo } from './style';

const Train = () => (
    <SctrainWrapper>
        <ScHeader>
            <ScHeaderInfo style={{ width: '40%' }}>培训名称</ScHeaderInfo>
            <ScHeaderInfo style={{ width: '24.5%' }}>培训时间</ScHeaderInfo>
            <ScHeaderInfo style={{ width: '20%' }}>参与人数</ScHeaderInfo>
            <ScHeaderInfo style={{ width: '15%' }}>通过率</ScHeaderInfo>
        </ScHeader>
        <React.Fragment key="TrainBody">
            <ScContent>
                <ScContentInfo style={{ width: '40%' }}>安全运维</ScContentInfo>
                <ScContentInfo style={{ width: '24.5%' }}>2020-05-25</ScContentInfo>
                <ScContentInfo style={{ width: '20%' }}>125</ScContentInfo>
                <ScContentInfo style={{ width: '15%' }}>83</ScContentInfo>
            </ScContent>
            <ScContent>
                <ScContentInfo style={{ width: '40%' }}>应用安全开发生命周期</ScContentInfo>
                <ScContentInfo style={{ width: '24.5%' }}>2020-05-18</ScContentInfo>
                <ScContentInfo style={{ width: '20%' }}>145</ScContentInfo>
                <ScContentInfo style={{ width: '15%' }}>83</ScContentInfo>
            </ScContent>
            <ScContent>
                <ScContentInfo style={{ width: '40%' }}>WEB安全进阶</ScContentInfo>
                <ScContentInfo style={{ width: '24.5%' }}>2020-05-11</ScContentInfo>
                <ScContentInfo style={{ width: '20%' }}>145</ScContentInfo>
                <ScContentInfo style={{ width: '15%' }}>84</ScContentInfo>
            </ScContent>
            <ScContent>
                <ScContentInfo style={{ width: '40%' }}>WEB安全基础</ScContentInfo>
                <ScContentInfo style={{ width: '24.5%' }}>2020-04-27</ScContentInfo>
                <ScContentInfo style={{ width: '20%' }}>145</ScContentInfo>
                <ScContentInfo style={{ width: '15%' }}>90</ScContentInfo>
            </ScContent>
        </React.Fragment>
    </SctrainWrapper>
);

// Train.propTypes = {
//     type: PropTypes.number,
// };

export default Train;
