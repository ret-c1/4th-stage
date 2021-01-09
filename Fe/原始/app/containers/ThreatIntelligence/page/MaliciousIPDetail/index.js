import React, { memo, useEffect, useState } from 'react';
import { PageHeader, Button, Descriptions, Typography, Divider, Table, Tag } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import IconDetail from '@assets/images/icon-detail.png';
import { ScContent } from '../../styled';
import { getIpBase, getIpDetail } from '../../api';

const { Title } = Typography;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const MaliciousIPDetail = () => {
    const history = useHistory();
    const [ipDetail, setIpDetail] = useState({});
    const [isShowTags, changeIsShowTags] = useState(false);
    const [newColumns, setColumns] = useState([]);
    const [total, setTotal] = useState(0);
    const [params, setParams] = useState({
        type: 'ip',
        value: history.location.state ? history.location.state.value : '',
        page: 0,
        size: 10,
    });
    const getTableList = (param) => {
        const columnsIn = [];
        getIpDetail(param).then((res) => {
            if (res.code === 200) {
                if (res.data.table) {
                    setTotal(res.data.table.total || 0);
                    if (res.data.table.body) {
                        setIpDetail(res.data.table.body);
                    }
                    if (res.data.table.header) {
                        res.data.table.header.forEach((item) => {
                            columnsIn.push({
                                title: item.name,
                                dataIndex: item.type,
                                key: item.type,
                                render: (text, record) => {
                                    if (item.type === 'threat_type') {
                                        return (
                                            <>
                                                {text &&
                                                    text.length > 5 &&
                                                    !isShowTags[`${record.x_ti_id}`] &&
                                                    text.slice(0, 5).map((item1) => (
                                                        <Tag
                                                            color="rgba(245,34,45,0.06)"
                                                            key={item1.name}
                                                        >
                                                            <span style={{ color: '#D9363F' }}>
                                                                {item1.name}
                                                            </span>
                                                        </Tag>
                                                    ))}
                                                {text &&
                                                    (text.length <= 5 ||
                                                        (text.length > 5 &&
                                                            isShowTags[`${record.x_ti_id}`])) &&
                                                    text.map((item1) => (
                                                        <Tag
                                                            color="rgba(245,34,45,0.06)"
                                                            key={item1.name}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: '#D9363F',
                                                                }}
                                                            >
                                                                {item1.name}
                                                            </span>
                                                        </Tag>
                                                    ))}
                                                {text && text.length > 5 && (
                                                    <Button
                                                        type="link"
                                                        style={{ fontSize: 12 }}
                                                        onClick={() => {
                                                            changeIsShowTags({
                                                                ...isShowTags,
                                                                [`${record.x_ti_id}`]: !isShowTags[
                                                                    `${record.x_ti_id}`
                                                                ],
                                                            });
                                                        }}
                                                    >
                                                        {isShowTags[`${record.x_ti_id}`] ? (
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
                                    if (item.type === 'extra_infor') {
                                        return <>{text.text}</>;
                                    }
                                    return text;
                                },
                            });
                        });
                        setColumns(columnsIn);
                    }
                }
            }
        });
    };
    useEffect(() => {
        getIpBase({ value: params.value }).then((res) => {
            if (res.code === 200) {
                setParams({ ...params, type: res.data.type });
                getTableList({
                    ...params,
                    type: res.data.type,
                });
            }
        });
    }, [history.location.state]);
    return (
        <>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    avatar={{ src: `${IconDetail}` }}
                    ghost={false}
                    onBack={() => history.go(-1)}
                    title="恶意IP/域名分析详情"
                    extra={[
                        <Button onClick={() => history.go(-1)} key="1">
                            返回
                        </Button>,
                    ]}
                >
                    <Descriptions size="small" column={2} style={{ padding: '0 30px' }}>
                        <Descriptions.Item label="IP/域名">{params.value}</Descriptions.Item>
                        <Descriptions.Item label="威胁情报标签">
                            {history.location.state &&
                                history.location.state.tiTags &&
                                history.location.state.tiTags.map((item) => (
                                    <Tag color="red" key={item}>
                                        {item}
                                    </Tag>
                                ))}
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            </div>
            <ScContent>
                <Title level={4} style={{ padding: '0 30px' }}>
                    情报信息
                </Title>
                <Divider />
                {ipDetail && ipDetail.length > 0 && total > 0 ? (
                    <Table
                        rowKey="x_ti_id"
                        columns={newColumns}
                        dataSource={ipDetail}
                        style={{ padding: '0 30px' }}
                        pagination={{
                            pageSizeOptions: pageOptions,
                            onShowSizeChange: (current, pageSize) =>
                                getTableList({
                                    ...params,
                                    page: current,
                                    size: pageSize,
                                }),
                            showSizeChanger: true,
                            showTotal: () => `共 ${total} 条`,
                            total,
                            onChange: (page, pageSize) =>
                                getTableList({
                                    ...params,
                                    page,
                                    size: pageSize,
                                }),
                        }}
                    />
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: 'red' }}>TI系统暂无此ip分析数据</h2>
                    </div>
                )}
            </ScContent>
        </>
    );
};

const withConnect = connect(null, null);

export default compose(withConnect, memo)(MaliciousIPDetail);
