import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Tag, Row, Col, Button, Form, Select, Input, Table, Tooltip, Drawer } from 'antd';
import { InfoCircleFilled, UpOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import PubMessage from '@components/PubMessage';
import { useHistory } from 'react-router-dom';
import { ItWrapper, CustomCard, ExtraButton, TipsCol, TagRow } from './indexStyle';
import AssessBasicInfo from '../../components/AssessBasicInfo';
import DistributeModal from './DistributeModal';
import {
    threatInfo,
    clientListReq,
    threatAssetsList,
    queryProjects,
    allProject,
    getAssetInfo,
} from './api';
import useTableParam from '../../hooks/useTableParam';
import CircleDot from '../../components/CircleDot';
import useProjectRemoteSelect from '../../hooks/useProjectRemoteSelect';
import useTableSelect from '../../hooks/useTableSelect';
import { AddProjectModal } from './AddProjectModal';
import CreateProject from './CreateProject';
import AssetInfo from './AssetInfo';
import { tabelcheckAction, tabelallcheckAction } from '../../action';

const { CheckableTag } = Tag;
const { Option } = Select;

const columns = [
    {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
        width: 162,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '销售联系人',
        dataIndex: 'seller',
        key: 'seller',
        width: 140,
    },
    {
        title: '资产名称',
        dataIndex: 'assetName',
        key: 'assetName',
        width: 130,
    },
    {
        title: '资产类型',
        dataIndex: 'assetType',
        key: 'assetType',
    },
    {
        title: '资产版本',
        dataIndex: 'assetVersion',
        key: 'assetVersion',
        width: 130,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '内网IP地址',
        dataIndex: 'assetIp',
        key: 'assetIp',
    },
    {
        title: '是否排查',
        dataIndex: 'statusStr',
        key: 'statusStr',
        render: (text) => {
            if (text === '已排查') {
                return (
                    <div>
                        <CircleDot size={8} backgroundColor="rgba(0,0,0,0.45)" />
                        <span style={{ marginLeft: '8px' }}>{text}</span>
                    </div>
                );
            }
            return (
                <div>
                    <CircleDot size={8} backgroundColor="#FAAD14" />
                    <span style={{ marginLeft: '8px' }}>{text}</span>
                </div>
            );
        },
    },
];

const requestParam = { param: { status: 0, type: 0 } };

const ThreatDetection = (props) => {
    const history = useHistory();
    // 获取传递过来的情报id和projectIds
    const { id, project } = searchParams();
    const projectIds = project && project.split(',').map((item) => parseInt(item, 10));
    // 改变projectIds
    const changeProjectIds = (pid) => {
        let newProjectIds = [];
        newProjectIds = [...projectIds, parseInt(pid, 10)];
        history.replace(`/intelligence/threatdetection?id=${id}&project=${newProjectIds}`);
        setFormdata({
            ...formdata,
            projectIds: newProjectIds,
        });
        rxTabelcheckall([]);
    };
    // 项目经理的项目
    const allProjectData = useTableParam(allProject, requestParam);
    const [projectModalVisible, setProjectModalVisible] = useState(false);
    const projectModalCancel = () => {
        setProjectModalVisible(false);
    };
    // 模态框表格选择项
    const projectModalRowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            let newProjectIds = [];
            newProjectIds = [...new Set([...projectIds, ...selectedRowKeys])];
            setFormdata({
                ...formdata,
                projectIds: newProjectIds,
            });
        },
    };

    const projectModalOk = () => {
        history.replace(`/intelligence/threatdetection?id=${id}&project=${formdata.projectIds}`);
        setSearchStatus(!searchStatus);
        setProjectModalVisible(false);
        PubMessage('success', '添加成功');
        handleProjectSearch();
        rxTabelcheckall([]);
        clientListReq({ projectIds: formdata.projectIds }).then((res) => {
            if (res.code === 200) {
                setCheckList(res.data);
            }
        });
    };

    // const history = useHistory();
    const [createModal, setCreateModal] = useState(false);
    const createModalCancel = () => {
        setCreateModal(false);
    };

    // 获取基本信息和资产
    const [basicInfo, setBasicInfo] = useState({});
    useEffect(() => {
        threatInfo(id).then((res) => {
            if (res.code === 200) {
                setBasicInfo(res.data);
            }
        });
    }, []);

    // 远程搜索下拉框
    const remoteSelectParam = useProjectRemoteSelect(queryProjects, projectIds);
    const { remoteData, handleSearch } = remoteSelectParam;
    const options = remoteData.map((d) => <Option key={d.value}>{d.text}</Option>);

    // 表格查询项
    const action = {
        title: '操作',
        width: 180,
        align: 'center',
        render: (text, record) => (
            <div>
                <Button
                    size="small"
                    type="link"
                    onClick={() => {
                        getAssetInfo({ id: record.id }).then((res) => {
                            if (res.code === 200) {
                                setAssetInfo(res.data);
                                setAssetInfoVisible(true);
                            }
                        });
                    }}
                >
                    查看
                </Button>
                <span style={{ color: '#E9E9E9' }}>|</span>
                <Button
                    size="small"
                    type="link"
                    // createTroubleShooting({
                    //     threatId: id,
                    //     uid: props.rxInfo.id,
                    //     troubleAssets: [
                    //         { threatAssetId: record.threatAssetId, ipAssetId: record.id },
                    //     ],
                    // }).then((res) => {
                    //     if (res.code === 200) {
                    //         history.push(
                    //             `/intelligence/threatdetection/process?threatId=${id}`,
                    //         );
                    //     } else {
                    //         PubMessage('error', res.message);
                    //     }
                    // });
                    onClick={() => {
                        onSelectRowChange([record.id], [record]);
                        setHandleType('self');
                        setVisible(true);
                    }}
                >
                    排查
                </Button>
                <span style={{ color: '#E9E9E9' }}>|</span>
                <Button
                    size="small"
                    type="link"
                    onClick={() => {
                        onSelectRowChange([record.id], [record]);
                        setVisible(true);
                    }}
                >
                    派发
                </Button>
            </div>
        ),
    };
    // 表单查询
    const [formdata, setFormdata] = useState({
        clientName: checkedClient,
        projectIds,
        assetName: '',
        assetIp: '',
    });
    // 查询状态，改变查询状态来判断是否查询, useCallback将此参数作为是否吊起查询的依赖
    const [searchStatus, setSearchStatus] = useState(true);
    // 初始化表格数据
    const fetchThreatList = useCallback((params) => threatAssetsList(params), [searchStatus]);
    const tableParams = useTableParam(fetchThreatList, { param: formdata });
    const { loading, pagination } = tableParams;
    const { onChange } = pagination;
    const { dataSource } = tableParams;
    const handleFormChange = (fields) => {
        // 对查询项目名称做特殊处理，不能为空
        if (fields.projectIds && fields.projectIds.length === 0) {
            setFormdata({
                ...formdata,
                projectIds,
            });
        } else {
            setFormdata({
                ...formdata,
                ...fields,
            });
        }
    };
    const handleProjectSearch = () => {
        // 回到第一页
        onChange(1, 10);
        setSearchStatus(!searchStatus);
    };

    // 获取项目信息下的客户列表
    // 所有的客户列表
    const [clientList, setCheckList] = useState([]);
    const [clientInfo, setClientInfo] = useState({});
    const [checkedClient, setClient] = useState('');
    // tag展开与否
    const [tagActive, setTagActive] = useState(false);
    const handleActive = () => {
        setTagActive(!tagActive);
    };
    useEffect(() => {
        clientListReq({ projectIds }).then((res) => {
            if (res.code === 200) {
                setCheckList(res.data);
            }
        });
    }, []);
    // 客户列表tag发生改变
    const handleChange = (tag, checked) => {
        const tagName = checked ? tag : '';
        if (tagName) {
            clientList.forEach((item) => {
                if (item.clientName === tagName) {
                    setClientInfo(item);
                }
            });
        } else {
            setClientInfo({});
        }
        setClient(tagName);
        setFormdata({
            ...formdata,
            clientName: tagName,
        });
        // 吊起查询
        onChange(1, 10);
        setSearchStatus(!searchStatus);
    };

    // 列表选择项
    const { rxChecked, rxTabelcheck, rxTabelcheckall } = props;
    const rowSelection = useTableSelect(rxChecked, rxTabelcheck, rxTabelcheckall);
    const { selectedRowKeys, selectRows, onChange: onSelectRowChange } = rowSelection;
    // 标签可控的选择项
    const handleClose = (removedTag) => {
        const tags = selectedRowKeys.filter((tag) => tag !== removedTag);
        rxTabelcheck(tags);
    };

    // 模态框相关
    const [visible, setVisible] = useState(false);
    const handleCancel = () => {
        setVisible(false);
    };

    // 判断是我要排查还是派发排查
    const [handleType, setHandleType] = useState('distribute');

    // 我要排查
    // const handleTroubleShooting = () => {
    //     if (!rxChecked.length) {
    //         PubMessage('error', '请选择你要排查的项目');
    //         return;
    //     }
    //     const troubleAssets = selectRows.map((item) => ({
    //         ipAssetId: item.id,
    //     }));
    //     createTroubleShooting({ threatId: id, uid: props.rxInfo.id, troubleAssets }).then((res) => {
    //         if (res.code === 200) {
    //             history.push(`/intelligence/threatdetection/process?threatId=${id}`);
    //         } else {
    //             PubMessage('error', res.message);
    //         }
    //     });
    // };

    // 资产详情
    const [assetInfovisible, setAssetInfoVisible] = useState(false); // 抽屉状态
    const [assetInfo, setAssetInfo] = useState({});
    const assetInfoClose = () => {
        setAssetInfoVisible(false);
    };

    useEffect(
        // 清除状态
        () => () => {
            rxTabelcheckall([]);
        },
        [],
    );

    return (
        <>
            <ItWrapper>
                <AssessBasicInfo allInfo={basicInfo} />
            </ItWrapper>
            <CustomCard bordered={false}>
                <TagRow
                    style={{ borderBottom: '1px dashed #E9E9E9' }}
                    isactive={tagActive.toString()}
                >
                    <Col xl={{ span: 1 }}>客户：</Col>
                    <Col xl={{ span: 18 }} style={{ overflow: 'hidden' }}>
                        {clientList.map((item, index) => (
                            <CheckableTag
                                checked={checkedClient === item.clientName}
                                onChange={(checked) => handleChange(item.clientName, checked)}
                                key={`${item.clientName}_${index.toString()}`}
                            >
                                {item.clientName}
                            </CheckableTag>
                        ))}
                        <Tag className="site-tag-plus" onClick={() => setProjectModalVisible(true)}>
                            <PlusOutlined /> 添加
                        </Tag>
                    </Col>
                    <Col xl={{ span: 2, offset: 3 }}>
                        <ExtraButton onClick={handleActive} type="link">
                            {tagActive ? '收起' : '更多'}
                            {tagActive ? (
                                <UpOutlined style={{ color: '#1890FF', fontSize: '14px' }} />
                            ) : (
                                <DownOutlined style={{ color: '#1890FF', fontSize: '14px' }} />
                            )}
                        </ExtraButton>
                    </Col>
                </TagRow>
                <Form
                    layout="horizon"
                    style={{ marginTop: '16px' }}
                    onValuesChange={(fields) => {
                        handleFormChange(fields, 'type');
                    }}
                >
                    <Row style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Col xl={{ span: 7 }}>
                            <Form.Item name="projectIds" label="项目名称">
                                <Select
                                    showSearch
                                    placeholder="请选择"
                                    defaultActiveFirstOption={false}
                                    value={formdata.projectIds}
                                    showArrow={false}
                                    filterOption={false}
                                    style={{ width: '224px' }}
                                    onSearch={handleSearch}
                                    notFoundContent={null}
                                    mode="multiple"
                                >
                                    {options}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={{ span: 7 }}>
                            <Form.Item name="assetName" label="资产名称">
                                <Input placeholder="资产名称" style={{ width: '224px' }} />
                            </Form.Item>
                        </Col>
                        <Col xl={{ span: 7 }}>
                            <Form.Item name="assetIp" label="资产IP地址">
                                <Input placeholder="资产IP地址" style={{ width: '224px' }} />
                            </Form.Item>
                        </Col>
                        <Col xl={{ span: 1, offset: 1 }} style={{ textAlign: 'center' }}>
                            <Button onClick={handleProjectSearch}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Row style={{ paddingRight: '33px', marginTop: '24.7px' }}>
                    <Col xl={{ span: 19 }}>
                        <Button
                            type="primary"
                            onClick={() => {
                                if (!rxChecked.length) {
                                    PubMessage('error', '请选择你要派发的项目');
                                    return;
                                }
                                setVisible(true);
                            }}
                        >
                            派发排查
                        </Button>
                        <Button
                            style={{ marginLeft: '8px' }}
                            onClick={() => {
                                if (!rxChecked.length) {
                                    PubMessage('error', '请选择你要派发的项目');
                                    return;
                                }
                                setHandleType('self');
                                setVisible(true);
                            }}
                        >
                            我要排查
                        </Button>
                    </Col>
                    <Col
                        xl={{ span: 2 }}
                        style={{ textAlign: 'center', marginRight: '8px', marginLeft: 'auto' }}
                    >
                        <Button
                            onClick={() => {
                                setCreateModal(true);
                            }}
                        >
                            导入项目
                        </Button>
                    </Col>
                </Row>
                {clientInfo.clientAttention && (
                    <Row style={{ marginTop: '16px', marginRight: '16px' }}>
                        <TipsCol xl={{ span: 24 }}>
                            <p style={{ marginBottom: '0px' }}>
                                <InfoCircleFilled
                                    style={{
                                        color: '#1890FF',
                                        marginRight: '8px',
                                        verticalAlign: 'middle',
                                    }}
                                />
                                <span>
                                    请确认已联系客户授权进行排查工作。客户联系人：
                                    {clientInfo.clientAttention}，联系电话：
                                    {clientInfo.clientMobilePhone
                                        ? clientInfo.clientMobilePhones
                                        : '暂无'}
                                </span>
                            </p>
                        </TipsCol>
                    </Row>
                )}
                <div style={{ height: '32px', lineHeight: '32px' }}>
                    <div style={{ margin: '17px 0 16px 0' }}>
                        <span style={{ color: '#0C0000', marginRight: '8px' }}>
                            已选
                            <span style={{ color: '#1890FF', margin: '0px 3px' }}>
                                {selectedRowKeys.length}
                            </span>
                            项{selectedRowKeys.length ? ':' : ''}
                        </span>
                        {selectedRowKeys &&
                            selectedRowKeys.map((item) => {
                                const tagElem = selectRows.filter((ele) => {
                                    if (ele && ele.id === item) {
                                        return ele;
                                    }
                                    return null;
                                });
                                if (tagElem[0]) {
                                    const isLongTag =
                                        tagElem[0].projectName &&
                                        tagElem[0].projectName.length > 10;
                                    const tagShow = (
                                        <Tag
                                            key={`${item}`}
                                            onClose={() => handleClose(tagElem[0].id)}
                                            closable
                                        >
                                            {isLongTag
                                                ? `${tagElem[0].projectName.slice(0, 10)}...`
                                                : tagElem[0].projectName}
                                        </Tag>
                                    );
                                    return tagShow;
                                }
                                return null;
                            })}
                        {selectedRowKeys.length ? (
                            <ExtraButton
                                type="link"
                                size="small"
                                onClick={() => {
                                    onSelectRowChange([], []);
                                    rxTabelcheckall([]);
                                }}
                            >
                                清空
                            </ExtraButton>
                        ) : null}
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns.concat(action)}
                        dataSource={dataSource}
                        pagination={pagination}
                        loading={loading}
                        rowKey="id"
                    />
                </div>
            </CustomCard>
            <Drawer
                title="资产详情"
                placement="right"
                closable={false}
                width={640}
                onClose={assetInfoClose}
                visible={assetInfovisible}
            >
                <AssetInfo assetInfo={assetInfo} />
            </Drawer>
            {visible ? (
                <DistributeModal
                    visible={visible}
                    handleCancel={handleCancel}
                    ids={selectedRowKeys}
                    selectRows={selectRows}
                    infoId={id}
                    projectIds={formdata.projectIds}
                    handleType={handleType}
                />
            ) : null}
            {projectModalVisible ? (
                <AddProjectModal
                    data={allProjectData}
                    visible={projectModalVisible}
                    handleCancel={projectModalCancel}
                    rowSelection={projectModalRowSelection}
                    onOk={projectModalOk}
                />
            ) : null}
            {createModal ? (
                <CreateProject
                    visible={createModal}
                    handleCancel={createModalCancel}
                    projectIds={formdata.projectIds}
                    id={id}
                    changeProjectIds={changeProjectIds}
                    handleProjectSearch={handleProjectSearch}
                />
            ) : null}
        </>
    );
};

ThreatDetection.propTypes = {
    rxTabelcheck: PropTypes.func,
    rxTabelcheckall: PropTypes.func,
    rxChecked: PropTypes.array,
    // rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxChecked: state.intelligence.checked,
    rxInfo: state.global.useinfo,
});

const mapDispatchToProps = (dispatch) => ({
    rxTabelcheck: (id) => {
        dispatch(tabelcheckAction(id));
    },
    rxTabelcheckall: (ids) => {
        dispatch(tabelallcheckAction(ids));
    },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThreatDetection);
