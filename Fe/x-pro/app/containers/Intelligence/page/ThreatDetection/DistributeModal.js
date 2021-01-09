import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Form, Select, DatePicker, Tree, message } from 'antd';
import { UpOutlined, DownOutlined, FolderOutlined, FileTextOutlined } from '@ant-design/icons';
import FormItem from '@components/FormItem';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { modalFormConfig } from './formconfig';
import { CustomModal, BasicInfoWrapper, GrayDiv, AssetDiv, ExtraButton } from './modalStyle';
// import { InfoItem } from '../../component/InfoItem';
import { AssetsType, allUser, queryProjects, distributeTask } from '../api';
import useAllPersonRemoteSelect from '../../hooks/useAllPersonRemoteSelect';
// import useProjectRemoteSelect from '../../hooks/useProjectRemoteSelect';

const { Option } = Select;
const { RangePicker } = DatePicker;

let options = [];

const convertAssetData = (data) => {
    const arr = [];
    if (!data.length) return [];
    data.forEach((item) => {
        const obj = {
            title: `${item.type}(${item.count})`,
            key: item.type,
            icon: <FolderOutlined />,
            children: item.assets.map((ele) => ({
                title: ele,
                icon: <FileTextOutlined />,
            })),
        };
        arr.push(obj);
    });
    return arr;
};

const DistributeModal = (props) => {
    const history = useHistory();
    const ipAssetIds = props.selectRows.map((item) => item.id);
    // 项目经理已选的项目,转换为数据
    const optionValue = props.selectRows.map((item) => ({
        value: item.id,
        text: item.assetName,
    }));
    // const optionId = props.selectRows.map((item) => item.id);
    // const assetOptions = optionValue.map((d) => <Option key={d.value}>{d.text}</Option>);
    modalFormConfig[0].options = optionValue;

    // 表单相关
    const { handleCancel, visible, infoId, projectIds } = props;
    const [form] = Form.useForm();
    const [loading] = useState(false);

    // 资产信息
    const [assetData, setAssetData] = useState({});
    const [assetIds, setAssetIds] = useState(ipAssetIds);
    useEffect(() => {
        AssetsType({ ipAssetIds: assetIds }).then((res) => {
            if (res.code === 200) {
                const treeData = convertAssetData(res.data.typeRecords);
                setAssetData(treeData);
            } else {
                message.error(res.message);
            }
        });
    }, [assetIds]);

    // 资产列表展开与关闭
    const [assetActive, setAssetActive] = useState(true);
    const handleActive = () => {
        setAssetActive(!assetActive);
    };

    // 提交失败
    const onFinishFailed = ({ errorFields }) => {
        message.error('请填写完整的表单信息');
        form.scrollToField(errorFields[0].name);
    };

    // 查询所选项目
    const [allProjectOptions, setAllprojectData] = useState([]);
    useEffect(() => {
        queryProjects({ projectIds }).then((res) => {
            if (res.code === 200) {
                const { data } = res;
                const allProjectData = data.map((item) => ({
                    value: item.id,
                    text: item.projectName,
                }));
                setAllprojectData(allProjectData);
            }
        });
    }, []);

    // 查询所有用户
    const remoteSelectParam = useAllPersonRemoteSelect(allUser);
    const { remoteData, handleSearch } = remoteSelectParam;
    const optionsId = options.map((item) => item.key);
    options = options.concat(
        remoteData
            .filter((item) => !optionsId.includes(`${item.value}`))
            .map((d, index) => (
                <Option key={`${d.value}_${index.toString()}`} value={d.value}>
                    {d.text}
                </Option>
            )),
    );

    const { handleType } = props;
    // 提交
    const handleOk = () => {
        form.validateFields().then((allValue) => {
            const scheduledStartDate = moment(allValue.exetime[0]).valueOf();
            const scheduledEndDate = moment(allValue.exetime[1]).valueOf();
            const requestParam = {
                ...allValue,
                scheduledStartDate,
                scheduledEndDate,
                threatId: infoId,
            };
            delete requestParam.exetime;
            distributeTask(requestParam).then((res) => {
                if (res.code === 200) {
                    if (handleType === 'distribute') {
                        message.success('派发成功');
                        handleCancel();
                    }
                    if (handleType === 'self' && res.data.projectId) {
                        history.push(
                            `/intelligence/threatdetection/process?threatId=${infoId}&projectId=${res.data.projectId}&planId=${res.data.planId}`,
                        );
                    }
                } else {
                    message.error(res.message);
                }
            });
        });
    };
    return (
        <CustomModal
            visible={visible}
            title="派发排查任务"
            onOk={handleOk}
            onCancel={handleCancel}
            width={762}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    {handleType === 'distribute' ? '派发' : '排查'}
                </Button>,
            ]}
        >
            <BasicInfoWrapper>
                <Form
                    wrapperCol={{
                        span: 18,
                    }}
                    labelCol={{ span: 3, offset: 1 }}
                    name="forgetPassword"
                    autoComplete="off"
                    form={form}
                    layout="horizontal"
                    onFinish={handleOk}
                    onFinishFailed={onFinishFailed}
                    onValuesChange={(changedValues) => {
                        if (changedValues.ipAssetIds) {
                            setAssetIds(changedValues.ipAssetIds);
                        }
                    }}
                >
                    <Form.Item
                        label="项目名称"
                        name="projectId"
                        rules={[
                            {
                                required: true,
                                message: '请选择项目名称',
                            },
                        ]}
                    >
                        <Select placeholder="请选择">
                            {allProjectOptions.map((d, index) => (
                                <Option key={`${d.value}_${index.toString()}`} value={d.value}>
                                    {d.text}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {modalFormConfig.map((item) => {
                        if (item.label === '执行者') {
                            return (
                                <Form.Item
                                    key={item.label}
                                    label={item.label}
                                    name={item.name}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择执行人',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="请选择"
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        onSearch={handleSearch}
                                        notFoundContent={null}
                                    >
                                        {options}
                                    </Select>
                                </Form.Item>
                            );
                        }
                        if (item.label === '执行时间') {
                            return (
                                <Form.Item
                                    key={item.label}
                                    label={item.label}
                                    name={item.name}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择执行时间',
                                        },
                                    ]}
                                >
                                    <RangePicker
                                        placeholder={['请输入执行开始时间', '请输入执行结束时间']}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            );
                        }
                        return (
                            <FormItem
                                key={item.label}
                                label={item.label}
                                name={item.name}
                                type={item.type}
                                options={item.options}
                                placeholder={item.placeholder}
                                rules={item.rules}
                            />
                        );
                    })}
                </Form>
            </BasicInfoWrapper>

            <BasicInfoWrapper style={{ borderBottom: 'none' }}>
                <Row xl={{ span: 24 }} style={{ marginBottom: '24px' }}>
                    <Col xl={{ span: 3, offset: 1 }}>任务模版:</Col>
                    <Col xl={{ span: 18 }}>
                        <Select
                            placeholder="请选择"
                            disabled
                            style={{ width: '100%' }}
                            defaultValue="预警排查"
                        >
                            <Option key="预警排查" value="预警排查">
                                预警排查
                            </Option>
                        </Select>
                    </Col>
                </Row>

                <Row xl={{ span: 24 }} style={{ marginBottom: '24px' }}>
                    <Col xl={{ span: 3, offset: 1 }}>排查资产:</Col>
                    <Col xl={{ span: 18 }}>
                        <GrayDiv>
                            <AssetDiv>
                                <span>总数：{assetData.totalCount}</span>
                                <ExtraButton onClick={handleActive}>
                                    <span
                                        style={{
                                            marginRight: 5,
                                            color: '#1890FF',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {assetActive ? '收起' : '更多'}
                                    </span>
                                    {assetActive ? (
                                        <UpOutlined
                                            style={{ color: '#1890FF', fontSize: '14px' }}
                                        />
                                    ) : (
                                        <DownOutlined
                                            style={{ color: '#1890FF', fontSize: '14px' }}
                                        />
                                    )}
                                </ExtraButton>
                            </AssetDiv>
                            <div style={{ padding: '10px 25px' }}>
                                {assetActive && assetData.length && (
                                    <Tree
                                        style={{ background: 'rgba(0,0,0,0.04)' }}
                                        showIcon
                                        defaultExpandAll
                                        switcherIcon={<DownOutlined />}
                                        treeData={assetData}
                                    />
                                )}
                            </div>
                        </GrayDiv>
                    </Col>
                </Row>
                <Row xl={{ span: 24 }} style={{ marginBottom: '24px' }}>
                    <Col xl={{ span: 3, offset: 1 }}>任务列表:</Col>
                    <Col xl={{ span: 18 }}>
                        <GrayDiv style={{ padding: '13px 32px', height: '48px' }}>
                            <p style={{ color: 'rgba(0,0,0,0.65)' }}>
                                告警分析 &nbsp;<span style={{ color: 'rgba(0,0,0,0.15)' }}>——</span>
                                &nbsp; 日志分析&nbsp;{' '}
                                <span style={{ color: 'rgba(0,0,0,0.15)' }}>——</span> &nbsp;事件研判
                                &nbsp;<span style={{ color: 'rgba(0,0,0,0.15)' }}>——</span>
                                &nbsp;排查完成
                            </p>
                        </GrayDiv>
                    </Col>
                </Row>
            </BasicInfoWrapper>
        </CustomModal>
    );
};
DistributeModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    selectRows: PropTypes.array,
    infoId: PropTypes.string,
    projectIds: PropTypes.array,
    handleType: PropTypes.string,
};
export default DistributeModal;
