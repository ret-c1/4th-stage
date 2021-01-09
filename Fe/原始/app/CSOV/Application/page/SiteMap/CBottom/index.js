import React, { useState } from 'react';
import {
    ScCBottom,
    ScCBottomUl,
    ScItemTop,
    ScItemBottom,
    ScTitle,
    ScItemInfoTab1,
    ScLittleDot,
    ScItemInfoTab2,
    ScItemUnActive,
    ScChartBox,
} from './style';
import FinishSituation from './charts/FinishSituation';
import Healthy from './charts/Healthy/other';
import Responsive from './charts/Responsive';
import TopColumn from './charts/TopColumn';
import Train from './charts/Train';
import VulTop from './charts/VulTop';

const CBottom = () => {
    const [responsiveType, setResponsiveType] = useState(3);
    const [finishType, setFinishType] = useState(3);
    const [trainType, setTrainType] = useState(3);
    const [healthyType, setHealthyType] = useState(3);
    return (
        <ScCBottom>
            <ScCBottomUl>
                <li>
                    <ScItemTop>
                        <ScTitle style={{ width: '100%' }}>开发安全-未修复漏洞最多项目TOP5</ScTitle>
                        <ScChartBox>
                            <TopColumn />
                        </ScChartBox>
                    </ScItemTop>
                    <ScItemBottom>
                        <ScTitle>开发安全-漏洞TOP5</ScTitle>
                        <ScChartBox>
                            <VulTop />
                        </ScChartBox>
                    </ScItemBottom>
                </li>
                <li>
                    <ScItemTop>
                        <ScTitle>事件响应时间</ScTitle>
                        <div style={{ position: 'absolute', right: 0, top: 0 }}>
                            <ScItemInfoTab1
                                active={responsiveType === 2}
                                onClick={() => {
                                    setResponsiveType(2);
                                }}
                            >
                                <ScLittleDot style={{ left: '-2px', top: '-2px' }} />
                                <ScLittleDot style={{ left: '-2px', bottom: '-2px' }} />
                                近七天
                            </ScItemInfoTab1>
                            <ScItemInfoTab2
                                active={responsiveType === 3}
                                style={{ marginLeft: '2px' }}
                                onClick={() => {
                                    setResponsiveType(3);
                                }}
                            >
                                <ScLittleDot style={{ right: '-2px', top: '-2px' }} />
                                <ScLittleDot style={{ right: '-2px', bottom: '-2px' }} />
                                近一个月
                            </ScItemInfoTab2>
                        </div>
                        <ScChartBox>
                            <Responsive type={responsiveType} />
                        </ScChartBox>
                    </ScItemTop>
                    <ScItemBottom>
                        <ScTitle>事件完成情况</ScTitle>
                        <div style={{ position: 'absolute', right: 0, top: 0 }}>
                            <ScItemInfoTab1
                                active={finishType === 1}
                                onClick={() => {
                                    setFinishType(1);
                                }}
                            >
                                <ScLittleDot style={{ left: '-2px', top: '-2px' }} />
                                <ScLittleDot style={{ left: '-2px', bottom: '-2px' }} />
                                近24小时
                            </ScItemInfoTab1>
                            <ScItemUnActive
                                active={finishType === 2}
                                style={{ marginLeft: '2px' }}
                                onClick={() => {
                                    setFinishType(2);
                                }}
                            >
                                近7天
                            </ScItemUnActive>
                            <ScItemInfoTab2
                                active={finishType === 3}
                                style={{ marginLeft: '2px' }}
                                onClick={() => {
                                    setFinishType(3);
                                }}
                            >
                                <ScLittleDot style={{ right: '-2px', top: '-2px' }} />
                                <ScLittleDot style={{ right: '-2px', bottom: '-2px' }} />
                                近一个月
                            </ScItemInfoTab2>
                        </div>
                        <ScChartBox>
                            <FinishSituation type={finishType} />
                        </ScChartBox>
                    </ScItemBottom>
                </li>
                <li>
                    <ScItemTop>
                        <ScTitle>培训列表</ScTitle>
                        <div style={{ position: 'absolute', right: 0, top: 0 }}>
                            <ScItemInfoTab1
                                active={trainType === 2}
                                style={{ marginTop: '2px' }}
                                onClick={() => {
                                    setTrainType(2);
                                }}
                            >
                                <ScLittleDot style={{ left: '-2px', top: '-2px' }} />
                                <ScLittleDot style={{ left: '-2px', bottom: '-2px' }} />
                                近七天
                            </ScItemInfoTab1>
                            <ScItemInfoTab2
                                active={trainType === 3}
                                style={{ marginTop: '2px', marginLeft: '2px' }}
                                onClick={() => {
                                    setTrainType(3);
                                }}
                            >
                                <ScLittleDot style={{ right: '-2px', top: '-2px' }} />
                                <ScLittleDot style={{ right: '-2px', bottom: '-2px' }} />
                                近一个月
                            </ScItemInfoTab2>
                        </div>
                        <Train type={trainType} />
                    </ScItemTop>
                    <ScItemBottom>
                        <ScTitle>健康指数TOP10</ScTitle>
                        <div style={{ position: 'absolute', right: 0, top: 0 }}>
                            <ScItemInfoTab1
                                active={healthyType === 1}
                                onClick={() => {
                                    setHealthyType(1);
                                }}
                            >
                                <ScLittleDot style={{ left: '-2px', top: '-2px' }} />
                                <ScLittleDot style={{ left: '-2px', bottom: '-2px' }} />
                                近24小时
                            </ScItemInfoTab1>
                            <ScItemUnActive
                                active={healthyType === 2}
                                style={{ marginLeft: '2px' }}
                                onClick={() => {
                                    setHealthyType(2);
                                }}
                            >
                                近7天
                            </ScItemUnActive>
                            <ScItemInfoTab2
                                active={healthyType === 3}
                                style={{ marginLeft: '2px' }}
                                onClick={() => {
                                    setHealthyType(3);
                                }}
                            >
                                <ScLittleDot style={{ right: '-2px', top: '-2px' }} />
                                <ScLittleDot style={{ right: '-2px', bottom: '-2px' }} />
                                近一个月
                            </ScItemInfoTab2>
                        </div>
                        <ScChartBox>
                            <Healthy type={healthyType} />
                        </ScChartBox>
                    </ScItemBottom>
                </li>
            </ScCBottomUl>
        </ScCBottom>
    );
};

// CBottom.propTypes = {
//     requestLogin: PropTypes.func,
// };

export default CBottom;
