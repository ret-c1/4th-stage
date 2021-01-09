import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// 定义状态全局样式

// 完成状态背景颜色
const finishColor = '#73BF8A';
// 未操作状态背景颜色
const undoColor = 'rgba(0,0,0,0.25)';
// 不通过状态背景颜色
const rejectColor = '#E65C63';
// 名字颜色
const nameColor = 'rgba(0,0,0,0.65)';
// 成功文字颜色
const successNameColor = '#2FC25B';
// 未通过文字颜色
const rejectTextColor = '#F5222D';
// 发起时间/未审批文字颜色
const timeColor = 'rgba(0,0,0,0.45)';

const AssessWrapper = styled.div`
    width: 100%;
    display: flex;
    align-item: center;
    justify-content: space-between;
    background: #ffffff;
    box-shadow: 0 0 4px 0 rgba(36, 54, 102, 0.25);
    border-radius: 4px;
    border-radius: 4px;
    box-sizing: border-box;
`;

const AssessPeople = styled.div`
    width: 64px;
    height: ${(props) => props.height};
    line-height: ${(props) => props.height};
    background: ${(props) => props.color};
    display: inline-block;
    vertical-align: top;
    border-radius: 4px 0 0 4px;
    border-radius: 4px 0px 0px 4px;
    color: #fff;
    text-align: center;
    box-sizing: border-box;
`;

const AssessInfo = styled.div`
    padding: 12px 24px 12px 20px;
    display: inline-block;
    vertical-align: top;
    flex-grow: 1;
    box-sizing: border-box;
`;

export const AssessStatus = (props) => {
    const { status, advice, name, time } = props;
    let boxHeight = '46px';
    if (advice) {
        boxHeight = '82px';
    }
    let cStatus = timeColor;
    let bgStatus = undoColor;
    if (status === '已上报' || status === '已通过') {
        cStatus = successNameColor;
        bgStatus = finishColor;
    } else if (status === '未通过') {
        cStatus = rejectTextColor;
        bgStatus = rejectColor;
    }
    return (
        <AssessWrapper>
            <AssessPeople color={bgStatus} height={boxHeight}>
                {name && name.slice(-2)}
            </AssessPeople>
            <AssessInfo>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItem: 'center',
                    }}
                >
                    <div>
                        <span style={{ color: nameColor }}>{name}</span>
                        <span style={{ margin: '0 8px' }}>|</span>
                        <span style={{ color: cStatus }}>{status}</span>
                    </div>
                    {time && (
                        <span style={{ color: timeColor }}>
                            {status === '已上报' ? '发起' : '审批'}时间：{time}
                        </span>
                    )}
                </div>
                {advice && (
                    <p style={{ color: timeColor, marginTop: '8px', marginBottom: '0px' }}>
                        {advice}
                    </p>
                )}
            </AssessInfo>
        </AssessWrapper>
    );
};

AssessStatus.propTypes = {
    status: PropTypes.string, // 审批状态
    advice: PropTypes.string, // 审批意见
    name: PropTypes.string, // 审批人
    time: PropTypes.string, // 审批时间
};
