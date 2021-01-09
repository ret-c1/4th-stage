import React from 'react';
import PropTypes from 'prop-types';
import {
    ScFlow,
    ScEarly,
    ScEarlyCol1,
    ScEarlyCol2,
    ScEarlyCol3,
    ScFlowEntity,
    ScFlowLine,
    ScFlowEntityNum,
} from './styled';
import { ScTop, ScRight, ScTopInner } from '../../styled';

const FlowChart = (props) => {
    const { currentPage, hwStatus, overview } = props;

    const renderClass = (stage) => {
        if (currentPage === 'overall') {
            return null;
        }
        if (stage === hwStatus) {
            return 'active';
        }
        if (stage > hwStatus) {
            return 'normal';
        }
        return '';
    };

    // 情报个数
    const flow1 = overview.emergencyWarnVO
        ? overview.emergencyWarnVO.passReviewThreatCount + overview.emergencyWarnVO.netAttackCount
        : 0;
    // 排查任务数
    const flow2 = overview.emergencyWarnVO ? overview.emergencyWarnVO.threatTaskCount : 0;
    // 告警记录、日志分析数
    const flow3 = overview.emergencyWarnVO ? overview.emergencyWarnVO.analysisCount : 0;
    // 事件研判
    const flow4 = overview.emergencyWarnVO ? overview.emergencyWarnVO.eventAnalysisCount : 0;
    // 事件研判
    const flow5 = overview.emergencyWarnVO ? overview.emergencyWarnVO.eventAnalysisCount : 0;
    // 应急响应任务数
    const flow6 = overview.emergencyDoingVO ? overview.emergencyDoingVO.emergencyTaskCount : 0;
    // 应急执行中任务数 - 待提交 （远程）
    const flow7 = overview.emergencyDoingVO
        ? overview.emergencyDoingVO.readyCommitRemoteWayCount
        : 0;
    // 应急执行中任务数 - 待提交 （预案）
    const flow8 = overview.emergencyDoingVO ? overview.emergencyDoingVO.planCount : 0;
    // 应急执行中任务数 - 待提交 （现场）
    const flow9 = overview.emergencyDoingVO ? overview.emergencyDoingVO.readyCommitSpotWayCount : 0;
    // 提交应急报告数
    const flow10 = overview.emergencyDoingVO
        ? overview.emergencyDoingVO.alreadyReviewReportCount
        : 0;
    // 应急报告- 通过
    const flow11 = overview.emergencyDoneVO ? overview.emergencyDoneVO.handledCount : 0;
    // 应急案例
    const flow12 = overview.emergencyDoneVO ? overview.emergencyDoneVO.caseCount : 0;

    // 预警
    const yjdjCount = flow1 + flow2 + flow3 + flow4 + flow5;
    // 应急
    const yjCount = flow5 + flow6 + flow7 + flow8 + flow9 + flow10;
    // 结束
    const jsCount = flow11 + flow12;

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginLeft: '10px',
                }}
            >
                <ScTop>
                    <ScTopInner>预警定级 | {yjdjCount}个</ScTopInner>
                </ScTop>
                <ScTop>
                    <ScTopInner>应急响应 | {yjCount}个</ScTopInner>
                </ScTop>
                <ScRight>应急结束 | {jsCount}个</ScRight>
            </div>
            <ScFlow>
                <ScEarly>
                    <ScEarlyCol1>
                        <ScFlowEntity className={`earlyentity01 ${renderClass()}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow1}</ScFlowEntityNum>
                            ) : null}
                            <h3>事件收集和预警申请</h3>
                            <p>安全运营平台</p>
                        </ScFlowEntity>
                        <ScFlowEntity className="earlyentity02">
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow2}</ScFlowEntityNum>
                            ) : null}
                            <h3>发起应急评审</h3>
                            <p>安全运营平台</p>
                        </ScFlowEntity>
                        <ScFlowLine className="earlyline01" />
                        <ScFlowLine className="earlyline02" />
                    </ScEarlyCol1>
                    <ScEarlyCol2>
                        <ScFlowEntity className="earlyentity03">
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow3}</ScFlowEntityNum>
                            ) : null}
                            <h3>汇总专家意见决策</h3>
                            <p>应急总体负责人</p>
                        </ScFlowEntity>
                    </ScEarlyCol2>
                    <ScEarlyCol3>
                        <ScFlowEntity className={`earlyentity04 ${renderClass(1)}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow4}</ScFlowEntityNum>
                            ) : null}
                            <h3>预警级别判断</h3>
                            <p>应急总体负责人</p>
                        </ScFlowEntity>
                        <ScFlowEntity className={`earlyentity05 ${renderClass(1)}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow5}</ScFlowEntityNum>
                            ) : null}
                            <h3>启动发布预警通告</h3>
                            <p>安全运营平台</p>
                        </ScFlowEntity>
                    </ScEarlyCol3>
                    <ScFlowLine className="earlyline03" />
                    <ScFlowLine className="earlyline04" />
                    <ScFlowLine className="earlyline041" />
                    <ScFlowLine className="earlyline051" />
                </ScEarly>
                <ScEarly>
                    <ScEarlyCol1>
                        <ScFlowEntity className={`earlyentity01 ${renderClass(2)}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow6}</ScFlowEntityNum>
                            ) : null}
                            <h3>启动应急</h3>
                            <p>安全运营平台</p>
                        </ScFlowEntity>
                        <ScFlowEntity className={`earlyentity02 ${renderClass(4)}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow7}</ScFlowEntityNum>
                            ) : null}
                            <h3>远程应急</h3>
                            <p>安全运营平台</p>
                        </ScFlowEntity>
                    </ScEarlyCol1>
                    <ScEarlyCol2>
                        <ScFlowEntity className={`earlyentity02 ${renderClass(3)}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow8}</ScFlowEntityNum>
                            ) : null}
                            <h3>应急预案</h3>
                            <p>应急总体负责人</p>
                        </ScFlowEntity>
                    </ScEarlyCol2>
                    <ScEarlyCol3>
                        <ScFlowEntity className={`earlyentity04 ${renderClass(3)}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow9}</ScFlowEntityNum>
                            ) : null}
                            <h3>现场应急</h3>
                            <p>安全运营平台</p>
                        </ScFlowEntity>
                        <ScFlowEntity className={`earlyentity05 ${renderClass(5)}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow10}</ScFlowEntityNum>
                            ) : null}
                            <h3>应急记录</h3>
                            <p>安全运营平台</p>
                        </ScFlowEntity>
                    </ScEarlyCol3>
                    <ScFlowLine className="emerline01" />
                    <ScFlowLine className="emerline021" />
                    <ScFlowLine className="emerline022" />
                    <ScFlowLine className="emerline023" />
                    <ScFlowLine className="emerlinexc03" />
                    <ScFlowLine className="emerlineyc03" />
                    <ScFlowLine className="emerline04" />
                </ScEarly>
                <ScEarly>
                    <ScEarlyCol1>
                        <ScFlowEntity className={`earlyentity01 ${renderClass(6)}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow11}</ScFlowEntityNum>
                            ) : null}
                            <h3>技术分析和防护方案</h3>
                            <p>品牌推广人和技术支持部接口人</p>
                        </ScFlowEntity>
                        <ScFlowEntity className={`earlyentity02 ${renderClass(8)}`}>
                            {currentPage === 'overall' ? (
                                <ScFlowEntityNum>{flow12}</ScFlowEntityNum>
                            ) : null}
                            <h3>应急报告整理和发布归档</h3>
                            <p>安全服务部</p>
                        </ScFlowEntity>
                    </ScEarlyCol1>
                    <ScFlowLine className="endline01" />
                </ScEarly>
                <ScFlowLine />
            </ScFlow>
        </>
    );
};

FlowChart.propTypes = {
    currentPage: PropTypes.string,
    hwStatus: PropTypes.number,
    overview: PropTypes.object,
};

export default FlowChart;
