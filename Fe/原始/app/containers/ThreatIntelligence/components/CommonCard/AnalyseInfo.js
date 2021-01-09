import React, { useState, useEffect } from 'react';
import { Tabs, Table, Tag, Button } from 'antd';
import PropTypes from 'prop-types';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { getIntelligenceInfo, getIpInfo, getDomainInfo, getFileInfo } from '../../api';

const { TabPane } = Tabs;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const color = {
    error: ['rgba(245, 34, 45, 0.06)', '#D9363F'], // 高
    warning: ['rgba(250, 173, 20, 0.09)', '#DE9A12'], // 低
    success: ['rgba(47, 194, 91, 0.08)', '#32B85A'], // 成功
    danger: ['rgba(24, 144, 255, 0.08)', '#1890FF'], // 中
};
const AnalyseInfo = (props) => {
    const { fileHash, content } = props;
    const [params, setParams] = useState({
        page: 1,
        size: 5,
    });
    const [dataSource, setDataSource] = useState({});
    const [total, setTotal] = useState(0);
    const [newColumns, setNewColumns] = useState([]);
    const [tabsVal, setTabsVal] = useState([]);

    const [key, setActiveKey] = useState('1');
    const [isTags, changeIsInnerShowTags] = useState({});
    useEffect(() => {
        if (fileHash) {
            setParams({
                ...params,
                value: fileHash,
            });
        }
        const newTabs = [];
        if (content) {
            if (content.x_tip_releated_detail) {
                newTabs.push({
                    key: '1',
                    name: content.x_tip_releated_detail.name,
                    url: content.x_tip_releated_detail.url,
                });
            }
            if (content.x_tip_releated_domain) {
                newTabs.push({
                    key: '2',
                    name: content.x_tip_releated_domain.name,
                    url: content.x_tip_releated_domain.url,
                });
            }
            if (content.x_tip_releated_file) {
                newTabs.push({
                    key: '3',
                    name: content.x_tip_releated_file.name,
                    url: content.x_tip_releated_file.url,
                });
            }
            if (content.x_tip_releated_ip) {
                newTabs.push({
                    key: '4',
                    name: content.x_tip_releated_ip.name,
                    url: content.x_tip_releated_ip.url,
                });
            }
            setTabsVal(newTabs);
        }
    }, [fileHash, content]);
    const getList = () => {
        if (key === '1') {
            getIntelligenceInfo({ ...params, type: 'hash' }).then((res) => {
                if (res.code === 200) {
                    setDataSource(res.data);
                }
            });
        }
        if (key === '2') {
            getDomainInfo(params).then((res) => {
                if (res.code === 200) {
                    setDataSource(res.data);
                }
            });
        }
        if (key === '3') {
            getIpInfo(params).then((res) => {
                if (res.code === 200) {
                    setDataSource(res.data);
                }
            });
        }
        if (key === '4') {
            getFileInfo(params).then((res) => {
                if (res.code === 200) {
                    setDataSource(res.data);
                }
            });
        }
    };
    useEffect(() => {
        if (params.value) {
            getList();
        }
    }, [params, key]);
    useEffect(() => {
        const columns = [];
        if (dataSource && dataSource.table) {
            setTotal(dataSource.table.total);
            if (dataSource.table.header && dataSource.table.header.length > 0) {
                dataSource.table.header.forEach((item) => {
                    columns.push({
                        title: item.name,
                        dataIndex: item.type,
                        key: item.type,
                        render: (text, record1) => {
                            if (
                                item.type === 'threat_type' ||
                                item.type === 'intelligenceInfor' ||
                                item.type === 'tags'
                            ) {
                                return (
                                    <>
                                        {text &&
                                            text.length > 3 &&
                                            !isTags[`${record1.value}`] &&
                                            text.slice(0, 3).map((item1) => (
                                                <Tag
                                                    color={
                                                        color[`${item1.grade}`] &&
                                                        color[`${item1.grade}`][0]
                                                    }
                                                    key={item1.name}
                                                >
                                                    <span
                                                        style={{
                                                            color:
                                                                color[`${item1.grade}`] &&
                                                                color[`${item1.grade}`][1],
                                                        }}
                                                    >
                                                        {item1.name}
                                                    </span>
                                                </Tag>
                                            ))}
                                        {text &&
                                            (text.length <= 3 ||
                                                (text.length > 3 && isTags[`${record1.value}`])) &&
                                            text.map((item1) => (
                                                <Tag
                                                    color={
                                                        color[`${item1.grade}`] &&
                                                        color[`${item1.grade}`][0]
                                                    }
                                                    key={item1.name}
                                                >
                                                    <span
                                                        style={{
                                                            color:
                                                                color[`${item1.grade}`] &&
                                                                color[`${item1.grade}`][1],
                                                        }}
                                                    >
                                                        {item1.name}
                                                    </span>
                                                </Tag>
                                            ))}
                                        {text && text.length > 3 && (
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    changeIsInnerShowTags({
                                                        ...isTags,
                                                        [`${record1.value}`]: !isTags[
                                                            `${record1.value}`
                                                        ],
                                                    });
                                                }}
                                            >
                                                {isTags[`${record1.value}`] ? (
                                                    <>
                                                        <UpOutlined />
                                                        收起
                                                    </>
                                                ) : (
                                                    <>
                                                        <DownOutlined />
                                                        展开
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </>
                                );
                            }
                            if (item.type === 'grade') {
                                switch (text) {
                                    case 'error':
                                        return <Tag color="#F5222D">高危</Tag>;
                                    case 'warning':
                                        return <Tag color="#FAAD14">低危</Tag>;
                                    case 'danger':
                                        return <Tag color="#1890FF">中危</Tag>;
                                    case 'success':
                                        return <Tag color="#2FC25B">安全</Tag>;
                                    default:
                                        return null;
                                }
                            }
                            if (item.type === 'extra_infor') {
                                return <>{text && text.text}</>;
                            }
                            if (item.type === 'family') {
                                return <>{text && text.family}</>;
                            }
                            if (item.type === 'score') {
                                return <>{text && text.score}</>;
                            }
                            return text;
                        },
                    });
                });
                setNewColumns(columns);
            }
        }
    }, [dataSource && dataSource.table && dataSource.table.header, key]);
    return (
        <Tabs
            type="card"
            style={{ width: '100%' }}
            activeKey={key}
            onChange={(activeKey) => setActiveKey(activeKey)}
        >
            {tabsVal.map((item) => (
                <TabPane tab={item.name} key={item.key}>
                    {dataSource && dataSource.table && dataSource.table.body && total > 0 ? (
                        <Table
                            footer={() => '1'}
                            rowKey="x_ti_id"
                            columns={newColumns}
                            dataSource={dataSource.table.body}
                            pagination={{
                                pageSizeOptions: pageOptions,
                                onShowSizeChange: (current, pageSize) =>
                                    setParams({ ...params, page: current, size: pageSize }),
                                showSizeChanger: true,
                                showTotal: () => `共 ${total} 条`,
                                total,
                                onChange: (page, pageSize) =>
                                    setParams({ ...params, page, size: pageSize }),
                            }}
                        />
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ color: 'red' }}>TI系统暂无此ip分析数据</h2>
                        </div>
                    )}
                </TabPane>
            ))}
        </Tabs>
    );
};
AnalyseInfo.propTypes = {
    fileHash: PropTypes.string,
    content: PropTypes.object,
};
export default AnalyseInfo;
