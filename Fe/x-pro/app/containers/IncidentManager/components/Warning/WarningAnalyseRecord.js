import React from 'react';
import { Descriptions, Divider } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const WarningAnalyseRecord = (props) => {
    const { warningRecord } = props;
    return (
        <>
            <Descriptions title="基础信息" column={{ md: 2 }} key="告警">
                <Descriptions.Item label="名称" key="名称">
                    {warningRecord && warningRecord.deviceName}
                </Descriptions.Item>
                <Descriptions.Item label="监控人员" key="监控人员">
                    {warningRecord && warningRecord.monitorUser}
                </Descriptions.Item>
                <Descriptions.Item label="监控设备" key="监控设备">
                    {warningRecord && warningRecord.monitorDevice}
                </Descriptions.Item>
                <Descriptions.Item label="监控地点" key="监控地点">
                    {warningRecord && warningRecord.monitorAddress}
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions column={{ md: 2 }} title="告警事件信息">
                <Descriptions.Item label="告警名称" key="告警名称">
                    {warningRecord && warningRecord.name}
                </Descriptions.Item>
                <Descriptions.Item label="告警关键字" key="告警关键字">
                    {warningRecord && warningRecord.warnKeyword}
                </Descriptions.Item>
                <Descriptions.Item label="告警级别" key="告警级别">
                    {warningRecord && warningRecord.level}
                </Descriptions.Item>
                <Descriptions.Item label="告警次数" key="告警次数">
                    {warningRecord && warningRecord.count}
                </Descriptions.Item>
                <Descriptions.Item label="来源IP" key="来源IP">
                    {warningRecord && warningRecord.sourceIps}
                </Descriptions.Item>
                <Descriptions.Item label="目的IP" key="目的IP">
                    {warningRecord && warningRecord.destIps}
                </Descriptions.Item>
                <Descriptions.Item label="发现时间" key="发现时间">
                    {warningRecord &&
                        warningRecord.foundTime &&
                        moment(warningRecord.foundTime).format('YYYY-MM-DD HH:mm:ss')}
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions column={{ md: 1 }} title="排查信息">
                {warningRecord &&
                    warningRecord.infos &&
                    warningRecord.infos.length > 0 &&
                    warningRecord.infos.map((item) => {
                        if (item.investContent || item.evidenceContent || item.investConclusion) {
                            return (
                                <div key={item.id}>
                                    <Descriptions.Item label="排查内容" key="排查内容">
                                        {item.investContent ? item.investContent : null}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="取证" key="取证">
                                        {item.evidenceContent && (
                                            <div
                                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                                    __html: item.evidenceContent,
                                                }}
                                            />
                                        )}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="结论" key="结论">
                                        {item.investConclusion ? item.investConclusion : null}
                                    </Descriptions.Item>
                                </div>
                            );
                        }
                        return null;
                    })}
            </Descriptions>
            <Divider />
            <Descriptions title="分析结论" column={{ md: 1 }}>
                <Descriptions.Item label="结果" key="结果">
                    {warningRecord && warningRecord.result === 0 && <span>有效攻击</span>}
                    {warningRecord && warningRecord.result === 1 && <span>隐患</span>}
                    {warningRecord && warningRecord.result === 2 && <span>误报</span>}
                </Descriptions.Item>
                <Descriptions.Item label="结论" key="结论">
                    {warningRecord && warningRecord.conclusion}
                </Descriptions.Item>
                <Descriptions.Item label="处置建议" key="处置建议">
                    {warningRecord && warningRecord.suggestion}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};
WarningAnalyseRecord.propTypes = {
    warningRecord: PropTypes.object,
};
export default WarningAnalyseRecord;
