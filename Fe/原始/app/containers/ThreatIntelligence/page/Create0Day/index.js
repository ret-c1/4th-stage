import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { Form, Radio, Row, Col, Button, Modal, message, Checkbox, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import { searchParams } from '@utils/searchParams';
import PropTypes from 'prop-types';
import watermark from '@utils/watermark';
import moment from 'moment';
import EditTable from '../../components/CommonCard/EditTable';
import UploadForm from '../../components/CommonCard/UploadForm';
import BasicInfo from '../../components/CommonCard/BasicInfo';
import AssessInfo from '../../components/ApprovalProgress';
import OtherInfo from '../../components/CommonCard/OtherInfo';
import { ScCardDetail, ScFooterToolbar } from '../../styled';
import {
    viewOday,
    addOday,
    updateOday,
    engineerSubmit,
    getThreatProcess,
    getDepartList,
} from './api';

const { Option } = Select;

const Create0DayPage = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const { id, stage, sourceType, publishStatus } = searchParams();
    const [threatId, setThreatId] = useState(id);
    const [detail, setDetail] = useState({});
    const [ips, setIps] = useState();
    const [files, setFiles] = useState();
    const [threatProcess, setThreatProcess] = useState({});
    // 当前审核和发布状态
    const [statusStr, setStatusStr] = useState('待审核 未发布');
    useEffect(() => {
        if (publishStatus !== '0' && id) {
            getThreatProcess(parseInt(id, 10)).then((res) => {
                if (res.code === 200) {
                    setThreatProcess(res.data);
                }
            });
            // getThreatProcess({ id: parseInt(id, 10) }).then((res) => {
            //     if (res.code === 200) {
            //         setThreatProcess(res.data);
            //     }
            // });
        }
    }, []);
    // 给网页添加水印
    useEffect(() => {
        if (stage === 'detail') {
            watermark.load({
                watermark_txt: `${props.rxInfo.name} ${props.rxInfo.phone} 1 ${statusStr}`,
                watermark_width: 500,
                watermark_x: -140,
            });
        }
        return () => {
            if (stage === 'detail' && detail.publishStatus !== 0) {
                watermark.remove();
            }
        };
    }, [detail, statusStr]);
    useEffect(() => {
        if (stage && stage !== 'add') {
            viewOday({
                id: parseInt(threatId, 10),
                sourceType: parseInt(sourceType, 10),
            }).then((res) => {
                if (res.code === 200) {
                    if (res.data && res.data.status === 3 && res.data.publishStatus !== 1) {
                        setStatusStr('不通过');
                    }
                    if (res.data && res.data.status === 3 && res.data.publishStatus === 1) {
                        setStatusStr('不通过 仅对内');
                    }
                    if (res.data && res.data.status < 2 && res.data.publishStatus === 1) {
                        setStatusStr('待审核 仅对内');
                    }
                    if (
                        res.data &&
                        res.data.publishStatus === 1 &&
                        (res.data.status === 4 || res.data.status === 2)
                    ) {
                        setStatusStr('通过 仅对内');
                    }
                    if (
                        res.data &&
                        res.data.publishStatus === 2 &&
                        (res.data.status === 4 || res.data.status === 2)
                    ) {
                        setStatusStr('通过 可对外');
                    }
                    setDetail(res.data);
                    setIps(res.data && res.data.ips);
                    setFiles(res.data && res.data.files);
                    form.setFieldsValue({ ...res.data, foundTime: moment(res.data.foundTime) });
                } else {
                    message.error(res.message);
                }
            });
        }
    }, []);
    const [departList, setDepartList] = useState([]);
    const handleInputChange = (e) => {
        getDepartList({
            parentId: 1201,
            name: e,
        }).then((res) => {
            if (res.code === 200) {
                setDepartList(res.data);
            }
        });
    };
    const [isShowConfirm, changeIsShowConfirm] = useState(false);
    const [modalValue, setModalValue] = useState({});
    const [isPublish, setIsPublish] = useState(false);
    const [pushDepart, setPushDepart] = useState([]);
    const onOk = debounce(() => {
        let submitParams = {};
        if (isPublish) {
            submitParams = {
                id: modalValue ? modalValue.threatId : null,
                publishStatus: 0,
            };
        } else {
            submitParams = {
                id: modalValue ? modalValue.threatId : null,
                publishStatus: 1,
                departIds: pushDepart,
            };
        }
        engineerSubmit(submitParams).then((res) => {
            if (res.code === 200) {
                history.push(
                    `/intelligence/list/createdone?id=${modalValue &&
                        modalValue.threatId}&name=${modalValue && modalValue.name}&fileNum=${
                        files && files.length > 0 ? files.length : 0
                    }&page=oday`,
                );
                changeIsShowConfirm(false);
            }
        });
    }, 1000);
    const onSubmit = debounce((type) => {
        form.validateFields().then((values) => {
            if (ips && ips.length > 0) {
                ips.map((item) => {
                    const newItem = item;
                    delete newItem.key;
                    return newItem;
                });
            }
            const formParams = {
                ...values,
                foundTime: values.foundTime && values.foundTime.valueOf(),
                // source: values.source && values.source.join(';'),
                ips,
                files,
            };
            // 去掉文件特征列表-files的类型字段
            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i += 1) {
                    delete formParams[`filestype-${i}`];
                }
            }
            // if (!threatId) {
            if (!threatId || (detail && detail.status && detail.status === 3)) {
                addOday({ ...formParams, threatExpertId: 154, operateExpertId: 20 }).then((res) => {
                    if (res.code === 200) {
                        setThreatId(res.data.id);
                        if (type === 1) {
                            changeIsShowConfirm(true);
                            setModalValue({ ...values, threatId: res.data && res.data.id });
                        } else {
                            history.push('/intelligence/list');
                        }
                    } else {
                        message.error(res.message);
                    }
                });
            } else {
                updateOday({ id: parseInt(threatId, 10), ...formParams }).then((res) => {
                    if (res.code === 200) {
                        if (type === 1) {
                            changeIsShowConfirm(true);
                            setModalValue({ ...values, threatId });
                        } else {
                            history.push('/intelligence/list');
                        }
                    } else {
                        message.error(res.message);
                    }
                });
            }
        });
    }, 1000);
    return (
        <Form
            form={form}
            name="change"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            style={{
                height: 'calc(100vh - 64px - 54px - 56px)',
                overflow: 'auto',
            }}
        >
            <ScCardDetail>
                <Form.Item label="情报类型" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                    <Radio.Group
                        disabled={stage === 'detail' || stage === 'edit'}
                        onChange={(e) => {
                            if (e.target.value === 2) {
                                history.push(
                                    `/intelligence/list/createeven${history.location.search}`,
                                );
                            }
                        }}
                        value={1}
                    >
                        <Radio value={1}>0/N day</Radio>
                        <Radio value={2}>安全事件</Radio>
                    </Radio.Group>
                </Form.Item>
            </ScCardDetail>
            <ScCardDetail title="基本信息">
                <BasicInfo source="create0day" detail={detail} />
                <Row>
                    <Col span={24}>
                        <EditTable
                            source="create0day"
                            detail={detail}
                            onCallBack={(v) => setIps(v)}
                        />
                    </Col>
                </Row>
            </ScCardDetail>
            <ScCardDetail title="公告信息">
                <OtherInfo
                    source="create0day"
                    detail={detail}
                    form={form}
                    isNotice={detail && detail.status > 1}
                />
            </ScCardDetail>
            <ScCardDetail title="验证工具文件">
                <UploadForm source="create0day" detail={detail} onCallBack={(v) => setFiles(v)} />
            </ScCardDetail>
            {stage === 'detail' && (
                <ScCardDetail title="审批进度">
                    <AssessInfo source="create0day" detail={threatProcess} />
                </ScCardDetail>
            )}
            {(stage === 'add' || stage === 'edit') && (
                <ScFooterToolbar>
                    <Row style={{ float: 'right', marginTop: '10px' }}>
                        <Col>
                            <Button style={{ marginRight: '10px' }} onClick={() => history.go(-1)}>
                                取消
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => onSubmit(0)} style={{ marginRight: '10px' }}>
                                暂存
                            </Button>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button
                                    onClick={() => onSubmit(1)}
                                    type="primary"
                                    style={{ marginRight: '10px' }}
                                >
                                    提交
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </ScFooterToolbar>
            )}
            {isShowConfirm && (
                <Modal
                    title={null}
                    visible={isShowConfirm}
                    onOk={() => onOk()}
                    cancelText="取消"
                    okText="确定"
                    maskClosable={false}
                    onCancel={() => changeIsShowConfirm(false)}
                >
                    <div style={{ padding: 30 }}>
                        <div style={{ marginLeft: '-38px' }}>
                            <ExclamationCircleOutlined
                                style={{ fontSize: 22, color: 'rgb(250, 173, 20)' }}
                            />
                            <span
                                style={{
                                    marginLeft: 17,
                                    color: 'rgba(0, 0, 0, 0.85)',
                                    fontSize: 16,
                                }}
                            >
                                确认要提交这条情报吗！
                            </span>
                        </div>
                        提交的情报将会发布给所有成员，提交前请确认已初步验证该情报的准确性，如非紧急情报可勾选"待专家审核完成后发布"。
                        <Checkbox onChange={(e) => setIsPublish(e.target.checked)}>
                            待专家审核完成后发布
                        </Checkbox>
                        {!isPublish && (
                            <div style={{ marginTop: 50 }}>
                                <div style={{ marginLeft: '-38px' }}>
                                    <ExclamationCircleOutlined
                                        style={{ fontSize: 22, color: 'rgb(250, 173, 20)' }}
                                    />
                                    <span
                                        style={{
                                            marginLeft: 17,
                                            color: 'rgba(0, 0, 0, 0.85)',
                                            fontSize: 16,
                                        }}
                                    >
                                        请确定短信通知范围！
                                    </span>
                                </div>
                                <Row>
                                    <Col>请输入需要通知的部门，不输入则不会通知</Col>
                                    <Col span={24}>
                                        <Select
                                            showSearch
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="请选择部门"
                                            onSearch={handleInputChange}
                                            onChange={(e) => setPushDepart([...pushDepart, ...e])}
                                            defaultActiveFirstOption={false}
                                            showArrow={false}
                                            filterOption={false}
                                            notFoundContent={null}
                                        >
                                            {departList &&
                                                departList.length > 0 &&
                                                departList.map((item) => (
                                                    <Option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </Form>
    );
};

Create0DayPage.propTypes = {
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Create0DayPage);
