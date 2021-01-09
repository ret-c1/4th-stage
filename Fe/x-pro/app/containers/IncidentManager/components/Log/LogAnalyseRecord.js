import React from 'react';
import { Descriptions, Divider } from 'antd';
import PropTypes from 'prop-types';

const LogAnalyseRecord = (props) => {
    const { logRecord } = props;
    return (
        <>
            <Descriptions title="事件总结" column={{ md: 2 }}>
                <Descriptions.Item label="事件名称" key="事件名称">
                    {logRecord && logRecord.eventName}
                </Descriptions.Item>
                <Descriptions.Item label="事件级别" key="事件级别">
                    {logRecord && logRecord.eventLevel}
                </Descriptions.Item>
                <Descriptions.Item label="目的IP" key="目的IP">
                    {logRecord && logRecord.destIps}
                </Descriptions.Item>
                <Descriptions.Item label="目的系统" key="目的系统">
                    {logRecord && logRecord.destSystem}
                </Descriptions.Item>
                <Descriptions.Item label="来源IP" key="来源IP">
                    {logRecord && logRecord.sourceIps}
                </Descriptions.Item>
                <Descriptions.Item label="攻击来源" key="攻击来源">
                    {logRecord && logRecord.attachSource}
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions column={{ md: 1 }} title="排查信息">
                {logRecord &&
                    logRecord.infos &&
                    logRecord.infos.map((item) => {
                        if (item || logRecord.contents) {
                            return [
                                <Descriptions.Item label="监控类型" key={`监控类型${item.id}`}>
                                    {item && item.monitorType}
                                </Descriptions.Item>,
                                <Descriptions.Item label="监控设备" key={`监控设备${item.id}`}>
                                    {item && item.monitorDevice}
                                </Descriptions.Item>,
                                <Descriptions.Item label="监控地址" key={`监控地址${item.id}`}>
                                    {item && item.monitorAddress}
                                </Descriptions.Item>,
                                <>
                                    {logRecord.contents &&
                                        logRecord.contents.map((item2) => {
                                            if (item2) {
                                                return [
                                                    <Descriptions.Item
                                                        label="排查内容"
                                                        key={`排查内容${item2.id}`}
                                                    >
                                                        {item2.investContent
                                                            ? item2.investContent
                                                            : null}
                                                    </Descriptions.Item>,
                                                    <Descriptions.Item
                                                        label="取证"
                                                        key={`取证${item2.id}`}
                                                    >
                                                        {item2.evidenceContent && (
                                                            <div
                                                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                                                    __html: item.evidenceContent,
                                                                }}
                                                            />
                                                        )}
                                                    </Descriptions.Item>,
                                                    <Descriptions.Item
                                                        label="结论"
                                                        key={`结论${item2.id}`}
                                                    >
                                                        {item2.investConclusion
                                                            ? item2.investConclusion
                                                            : null}
                                                    </Descriptions.Item>,
                                                ];
                                            }
                                            return null;
                                        })}
                                </>,
                            ];
                        }
                        return null;
                    })}
            </Descriptions>
            <Divider />
            <Descriptions title="分析结论" column={{ md: 1 }}>
                <Descriptions.Item label="分析结果" key="分析结果">
                    {logRecord && logRecord.result}
                </Descriptions.Item>
                <Descriptions.Item label="结论" key="结论">
                    {logRecord && logRecord.conclusion === 0 && <span>有效攻击</span>}
                    {logRecord && logRecord.conclusion === 1 && <span>隐患 </span>}
                    {logRecord && logRecord.conclusion === 2 && <span>误报</span>}
                </Descriptions.Item>
                <Descriptions.Item label="处置建议" key="处置建议">
                    {logRecord && logRecord.suggestion}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};

LogAnalyseRecord.propTypes = {
    logRecord: PropTypes.object,
};
export default LogAnalyseRecord;
