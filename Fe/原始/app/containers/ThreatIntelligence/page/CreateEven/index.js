import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Radio, Row, Col, Button, Modal, message, Checkbox, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import { searchParams } from '@utils/searchParams';
import moment from 'moment';
import watermark from '@utils/watermark';
import EditTable from '../../components/CommonCard/EditTable';
import BasicInfo from '../../components/CommonCard/BasicInfo';
import OtherInfo from '../../components/CommonCard/OtherInfo';
import Analyse from '../../components/CommonCard/Analyse';
import AssessInfo from '../../components/ApprovalProgress';
import { ScCardDetail, ScFooterToolbar } from '../../styled';
import {
    addSecurityEvent,
    updateSecurityEvent,
    viewSecurityEvent,
    engineerSubmit,
    getThreatProcess,
    getDepartList,
} from './api';
const { Option } = Select;
const CreateEvenPage = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const { id, stage, sourceType, publishStatus } = searchParams();
    const [detail, setDetail] = useState({});
    const [threatId, setThreatId] = useState(id);
    const [ips, setIps] = useState();
    const [analysisResults, setAnalysisResults] = useState();
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
            viewSecurityEvent({
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
                    setAnalysisResults(res.data && res.data.analysisResults);
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
                        analysisResults && analysisResults.length > 0 ? analysisResults.length : 0
                    }&page=even`,
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
                analysisResults,
            };
            // if (!threatId) {
            if (!threatId || (detail && detail.status && detail.status === 3)) {
                addSecurityEvent({
                    ...formParams,
                    operateExpertId: 20,
                    threatExpertId: 154,
                }).then((res) => {
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
                updateSecurityEvent({ id: parseInt(threatId, 10), ...formParams }).then((res) => {
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
                        value={2}
                        disabled={stage === 'detail' || stage === 'edit'}
                        onChange={(e) => {
                            if (e.target.value === 1) {
                                history.push(
                                    `/intelligence/list/create0day${history.location.search}`,
                                );
                            }
                        }}
                    >
                        <Radio value={1}>0/N day</Radio>
                        <Radio value={2}>安全事件</Radio>
                    </Radio.Group>
                </Form.Item>
            </ScCardDetail>
            <ScCardDetail title="基本信息">
                <BasicInfo source="createeven" detail={detail} />
                <Row>
                    <Col span={24}>
                        <EditTable
                            source="createeven"
                            detail={detail}
                            onCallBack={(v) => setIps(v)}
                        />
                    </Col>
                </Row>
            </ScCardDetail>
            <ScCardDetail title="公告信息">
                <OtherInfo
                    source="createeven"
                    form={form}
                    detail={detail}
                    isNotice={detail && detail.status > 1}
                />
            </ScCardDetail>
            <ScCardDetail
                title={
                    <>
                        恶意样本分析结果
                        <span
                            style={{
                                fontSize: 14,
                                color: 'rgba(0, 0, 0, 0.65)',
                                marginLeft: '17px',
                            }}
                        >
                            若需要进行样本分析，请移步
                            <Button
                                type="link"
                                onClick={() =>
                                    window.open('https://ti.x.com.cn/', '_blank')
                                }
                            >
                                1
                            </Button>
                        </span>
                    </>
                }
            >
                <Analyse
                    source="createeven"
                    detail={detail}
                    onCallBack={(v) => setAnalysisResults(v)}
                />
            </ScCardDetail>
            {stage === 'detail' && (
                <ScCardDetail title="审批进度">
                    <AssessInfo source="createeven" detail={threatProcess} />
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
                                            mode="multiple"
                                            showSearch
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

CreateEvenPage.propTypes = {
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CreateEvenPage);
