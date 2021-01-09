import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Button, Badge, Typography, Table, Descriptions } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
// import { getDetail } from './api';

const { Paragraph } = Typography;
const { Column } = Table;

const messages = [
    {
        key: '1',
        name: '统一信息平台',
        status: 1,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '2',
        name: '资产管理系统',
        status: 2,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '3',
        name: 'OA平台',
        status: 1,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '4',
        name: '统一信息平台',
        status: 2,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '5',
        name: '统一信息平台',
        status: 1,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '6',
        name: '统一信息平台',
        status: 2,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '7',
        name: '统一信息平台',
        status: 1,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '8',
        name: '统一信息平台',
        status: 2,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '9',
        name: '统一信息平台',
        status: 1,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '10',
        name: '统一信息平台',
        status: 2,
        organizationName: '企信部',
        personName: '郭延朋',
    },
    {
        key: '11',
        name: '统一信息平台',
        status: 1,
        organizationName: '企信部',
        personName: '郭延朋',
    },
];
const statuss = ['使用中', '未使用', '注销', '报废'];
const types = ['生产作业', '指挥调度', '管理控制', '内部办公', '公众服务', '其他'];
const scope = ['全国', '跨省', '全省', '跨地', '地（市、区）内', '其他'];
const services = ['单位内部人员', '社会公众人员', '两者均包括', '其他'];
const coverage = ['局域网', '城域网', '广域网', '其他'];
const networks = ['业务专网', '互联网', '其他'];
const connets = ['与其他行业系统连接', '与本行业其他单位系统连接', '与本单位其他系统连接', '其他'];

const SystemDetail = (props) => {
    const [expand, setExpand] = useState(true);
    const [data] = useState({
        projectId: 0,
        name: '',
        type: 0,
        description: '',
        scopeOfServices: 0,
        serviceObject: 0,
        coverageArea: 0,
        network: 0,
        systemInterconnected: 0,
        remark: '',
    });

    const params = {
        id: props.id,
    };
    console.log(params);
    const fetchDetail = () => {
        // getDetail(params).then((res) => {
        //     if (res.code === 200) {
        //         /* console.log(res.data); */
        //         setData({ ...res.data });
        //     }
        // });
        /* getAsset(id).then((res) => {
            if (res.code === 200) {
                setData({
                    ...res.data,

                });
            }
        }) */
    };

    useEffect(() => {
        fetchDetail();
    }, []);

    const toggleForm = () => {
        setExpand(!expand);
    };

    const renderAll = () => (
        <>
            <Descriptions column={4}>
                <Descriptions.Item label="业务系统名称" style={{ paddingLeft: 122 }} span={2}>
                    {data.name}
                </Descriptions.Item>
                <Descriptions.Item label="业务类型" style={{ paddingLeft: 73.5 }} span={1}>
                    {types[data.type - 1]}
                </Descriptions.Item>
                <Descriptions.Item span={1} style={{ paddingLeft: 147 }}>
                    <Button type="link" onClick={toggleForm}>
                        收起
                        <UpOutlined />
                    </Button>
                </Descriptions.Item>
                <Descriptions span={4} style={{ paddingLeft: '150px' }} label="业务描述">
                    {data.description}
                </Descriptions>
                <Descriptions label="服务范围" span={2} style={{ paddingLeft: '150px' }}>
                    {scope[data.scopeOfServices - 1]}
                </Descriptions>
                <Descriptions label="服务对象" span={2} style={{ paddingLeft: 73.5 }}>
                    {services[data.serviceObject - 1]}
                </Descriptions>
                <Descriptions label="覆盖范围" span={2} style={{ paddingLeft: '150px' }}>
                    {coverage[data.coverageArea - 1]}
                </Descriptions>
                <Descriptions label="网络性质" span={2} style={{ paddingLeft: '73.5px' }}>
                    {networks[data.network - 1]}
                </Descriptions>
            </Descriptions>
            <Row height="22px">
                <Col span={14}>
                    <div
                        style={{ marginLeft: '122px', float: 'left', color: 'rgba(0, 0, 0, 0.85)' }}
                    >
                        系统互联情况：
                    </div>
                    <div>{connets[data.systemInterconnected - 1]}</div>
                </Col>
                <Col span={10} style={{ marginBottom: 12 }}>
                    <div style={{ marginLeft: '28px' }}>
                        <div style={{ float: 'left', color: 'rgba(0, 0, 0, 0.85)' }}>备注:</div>
                        <Paragraph
                            ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
                            style={{ marginLeft: 42 }}
                        >
                            {data.remark}
                        </Paragraph>
                    </div>
                </Col>
            </Row>
        </>
    );

    const renderSimple = () => (
        <Descriptions column={4}>
            <Descriptions.Item label="业务系统名称" style={{ paddingLeft: 122 }} span={2}>
                OA系统
            </Descriptions.Item>
            <Descriptions.Item label="业务类型" style={{ paddingLeft: 73.5 }} span={1}>
                生产作业
            </Descriptions.Item>
            <Descriptions.Item span={1} style={{ paddingLeft: 147 }}>
                <Button type="link" onClick={toggleForm}>
                    展开
                    <DownOutlined />
                </Button>
            </Descriptions.Item>
        </Descriptions>
    );

    const renderMessage = () => (expand ? renderAll() : renderSimple());

    return (
        <Modal
            title="业务系统信息详情"
            visible={props.visible}
            footer={<Button onClick={props.onCancel}>关闭</Button>}
            width="880px"
            onCancel={props.onCancel}
        >
            <div
                style={{
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    width: 880,
                    marginLeft: -24,
                    marginTop: -24,
                    paddingTop: 12,
                }}
            >
                {renderMessage()}
            </div>
            <div>
                <div style={{ fontSize: 16, float: 'left', marginTop: 24 }}>关联资产列表</div>
                <Badge count={43} style={{ backgroundColor: 'rgba(0,0,0,0.45)', marginTop: 26 }} />
            </div>
            <Table size="small" dataSource={messages}>
                <Column title="资产名称" dataIndex="name" key="name" />
                <Column
                    title="资产状态"
                    dataIndex="status"
                    key="status"
                    render={(text) => {
                        if (text === 1) {
                            return <Badge status="success" text={statuss[0]} />;
                        }
                        if (text === 2) {
                            return <Badge status="default" text={statuss[1]} />;
                        }
                        if (text === 3) {
                            return <Badge status="default" text={statuss[2]} />;
                        }
                        return <Badge status="default" text={statuss[3]} />;
                    }}
                />
                <Column title="资产所属部门" dataIndex="organizationName" key="organizationName" />
                <Column title="资产负责人" dataIndex="personName" key="personName" />
            </Table>
        </Modal>
    );
};

SystemDetail.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    id: PropTypes.number,
};

export default SystemDetail;
