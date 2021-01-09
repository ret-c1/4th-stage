import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Tag, Descriptions } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import EventBasicInfo from '../EmergencyBasicInfo';
import EmergencyCheckLists from '../EmergencyCheckLists';
import {
    ScReportTitle,
    ScReportBasicInfo,
    ScContentBox,
    ScLeftMenu,
    ScRightContent,
    ScContentHeader,
    ScContentInfo,
} from './styled';

const leftMenu = [
    {
        id: '1',
        name: '相关说明',
        subMenu: [
            {
                id: '1-1',
                name: '1-1 相关说明',
            },
        ],
    },
    {
        id: '2',
        name: '事件概述',
        subMenu: [
            {
                id: '2-1',
                name: '2-1 事件概述',
            },
        ],
    },
    {
        id: '3',
        subId: '3-1',
        name: '事件分析',
        subMenu: [
            {
                id: '3-1',
                name: '3-1 事件分析',
            },
        ],
    },
    {
        id: '4',
        name: '排查记录',
        subMenu: [
            {
                id: '4-1',
                name: '4-1 排查记录',
            },
        ],
    },
    {
        id: '5',
        name: '排查结果',
        subMenu: [
            {
                id: '5-1',
                name: '5-1 排查结果',
            },
        ],
    },
    {
        id: '6',
        name: '安全建议',
        subMenu: [
            {
                id: '6-1',
                name: '6-1 安全建议',
            },
        ],
    },
    {
        id: '7',
        name: '加固处理',
        subMenu: [
            {
                id: '7-1',
                name: '7-1 加固处理',
            },
        ],
    },
];

const ReportInfo = ({ info, reportInfoRef }) => {
    const [reportInfo, setReportInfo] = useState(info);
    useEffect(() => {
        setReportInfo(info);
    }, [info]);
    const rightContent = [
        {
            id: '1',
            name: '相关说明',
            subContent: [
                {
                    id: '1-1',
                    content: info.相关说明 ? info.相关说明 : '',
                },
            ],
        },
        {
            id: '2',
            name: '事件概述',
            subContent: [
                {
                    id: '2-1',
                    content: info.事件概述 ? info.事件概述 : '',
                },
            ],
        },
        {
            id: '3',
            name: '事件分析',
            subContent: [
                {
                    id: '3-1',
                    content: (
                        <div style={{ paddingTop: '16px' }}>
                            <EventBasicInfo info={info} />
                        </div>
                    ),
                },
            ],
        },
        {
            id: '4',
            name: '排查记录',
            subContent: [
                {
                    id: '4-1',
                    content: (
                        <div style={{ paddingTop: '16px' }}>
                            <EmergencyCheckLists checkLists={info} />
                        </div>
                    ),
                },
            ],
        },
        {
            id: '5',
            name: '排查结果',
            subContent: [
                {
                    id: '5-1',
                    content: info.result ? info.result : '',
                },
            ],
        },
        {
            id: '6',
            name: '安全建议',
            subContent: [
                {
                    id: '6-1',
                    content: info.securityAdvice ? info.securityAdvice : '',
                },
            ],
        },
        {
            id: '7',
            name: '加固处理',
            subContent: [
                {
                    id: '7-1',
                    content: (
                        <div style={{ padding: '16px 0' }}>
                            {info.handle ? <p>{info.handle}</p> : null}
                            <Descriptions column={2} bordered>
                                <Descriptions.Item label="开始处置时间" key="开始处置时间" span={1}>
                                    {info.startHandleTime
                                        ? moment(info.startHandleTime).format('YYYY-MM-DD HH:mm:ss')
                                        : '暂无'}
                                </Descriptions.Item>
                                <Descriptions.Item label="结束处置时间" key="结束处置时间" span={1}>
                                    {info.endHandleTime
                                        ? moment(info.endHandleTime).format('YYYY-MM-DD HH:mm:ss')
                                        : '暂无'}
                                </Descriptions.Item>
                                <Descriptions.Item label="事件处置结果" key="事件处置结果" span={2}>
                                    {info.handleResult}
                                </Descriptions.Item>
                                <Descriptions.Item label="可行性建议" key="可行性建议" span={2}>
                                    {info.feasibilityAdvice}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    ),
                },
            ],
        },
    ];

    // 获取所有章节
    const chapter = [];
    const content = {};
    rightContent.forEach((item) => {
        chapter.push(item.id);
        if (item.subContent) {
            item.subContent.forEach((ele) => {
                chapter.push(ele.id);
                content[item.name] = ele.content;
            });
        }
    });

    // 向父组件传递数据
    useImperativeHandle(reportInfoRef, () => ({
        chapter,
        content,
    }));

    return (
        <>
            <ScReportTitle>{reportInfo.clientName}</ScReportTitle>
            <ScReportBasicInfo>
                <Descriptions
                    column={7}
                    title={
                        <p style={{ fontSize: '16px', height: '22px' }}>
                            <span style={{ marginRight: '8px' }}>基本信息</span>
                            <Tag color="error">{reportInfo.status}</Tag>
                        </p>
                    }
                >
                    <Descriptions.Item label="合同编号" span={2}>
                        {reportInfo.contractNo}
                    </Descriptions.Item>
                    <Descriptions.Item label="客户全称" span={3}>
                        {reportInfo.clientName}
                    </Descriptions.Item>
                    <Descriptions.Item label="报告作者" span={2}>
                        {reportInfo.reportUser}
                    </Descriptions.Item>
                    <Descriptions.Item label="项目创建时间" span={2}>
                        {reportInfo.projectCreateTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="报告提交时间" span={3}>
                        {reportInfo.submitTimeStr}
                    </Descriptions.Item>
                    <Descriptions.Item label="报告修改时间" span={2}>
                        {reportInfo.updateTime}
                    </Descriptions.Item>
                </Descriptions>
            </ScReportBasicInfo>
            <ScContentBox>
                <ScLeftMenu>
                    <p style={{ fontSize: '16px', marginBottom: '24px' }}>目录</p>
                    {leftMenu.map((item) => (
                        <p style={{ fontSize: '14px', marginBottom: '12px' }} key={item.name}>
                            {item.id}.{item.name}
                        </p>
                    ))}
                </ScLeftMenu>
                <ScRightContent>
                    {rightContent.map((item) => (
                        <>
                            <ScContentHeader>
                                {item.id}.{item.name}
                            </ScContentHeader>
                            <ScContentInfo>
                                {item.subContent.map((ele) => ele.content)}
                            </ScContentInfo>
                        </>
                    ))}
                </ScRightContent>
            </ScContentBox>
        </>
    );
};

ReportInfo.propTypes = {
    info: PropTypes.object,
    reportInfoRef: PropTypes.object,
};

export default ReportInfo;
