import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { Form, Radio, Row, Col, Button, Input, Modal, Avatar, message, Select } from 'antd';
import { FormOutlined, ExclamationCircleOutlined, ShrinkOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import { searchParams } from '@utils/searchParams';
import moment from 'moment';
import PropTypes from 'prop-types';
import watermark from '@utils/watermark';
import IconSave from '@assets/images/save_icon.png';
import EditTable from '../../components/CommonCard/EditTable';
import UploadForm from '../../components/CommonCard/UploadForm';
import BasicInfo from '../../components/CommonCard/BasicInfo';
import OtherInfo from '../../components/CommonCard/OtherInfo';
import AssessInfo from '../../components/ApprovalProgress';
import { ScCardDetail } from '../../styled';
import {
    viewOday,
    expertPass,
    expertRefuse,
    operatePass,
    updateOday,
    getThreatProcess,
    getDepartList,
} from './api';

const { Option } = Select;
// const { confirm } = Modal;
const Verify0DayPage = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const { checkFinish, id, sourceType, stage } = searchParams();
    const [isEditBasic, changeIsEditBasic] = useState(false);
    const [type] = useState(history.location.pathname.indexOf('1') !== -1 ? 1 : 2);
    const [detail, setDetail] = useState({});
    const [ips, setIps] = useState();
    const [threatProcess, setThreatProcess] = useState({});
    const [statusStr, setStatusStr] = useState('待审核 未发布');
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
            if (stage === 'detail') {
                watermark.remove();
            }
        };
    }, [statusStr]);
    useEffect(() => {
        if (id) {
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
    useEffect(() => {
        viewOday({ id: parseInt(id, 10), sourceType: parseInt(sourceType, 10) }).then((res) => {
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
                form.setFieldsValue({ ...res.data, foundTime: moment(res.data.foundTime) });
            } else {
                message.error(res.message);
            }
        });
    }, [isEditBasic]);

    const [cardStatus, changeCardStatus] = useState({
        card1: true,
        card2: true,
        card3: true,
    });
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
    const [actionType, setActionType] = useState();
    const [pushDepart, setPushDepart] = useState([]);
    const onOk = debounce(() => {
        let noPassParams = modalValue;
        if (detail.publishStatus === 1) {
            noPassParams = { ...modalValue, departIds: pushDepart };
        }
        if (actionType === 0) {
            expertRefuse(noPassParams).then((res) => {
                if (res.code === 200) {
                    history.push(
                        `/intelligence/approved-${type}th/0daydetail?stage=detail&sourceType=0&id=${id}`,
                    );
                    // window.location.replace(
                    //     `${history.location.pathname}${history.location.search}&checkFinish=true`,
                    // );
                } else {
                    // reviewConflict();
                    message.error(res.message);
                }
            });
            return;
        }
        if (type === 1) {
            expertPass({
                ...modalValue,
                publishType: actionType,
                departIds: pushDepart,
            }).then((res) => {
                if (res.code === 200) {
                    // window.location.replace(
                    //     `${history.location.pathname}${history.location.search}&checkFinish=true`,
                    // );
                    history.push(
                        `/intelligence/approved-${type}th/0daydetail?stage=detail&sourceType=0&id=${id}`,
                    );
                } else {
                    // reviewConflict();
                    message.error(res.message);
                }
            });
        } else {
            operatePass({
                ...modalValue,
                publishType: actionType,
            }).then((res) => {
                if (res.code === 200) {
                    history.push(
                        `/intelligence/approved-${type}th/0daydetail?stage=detail&sourceType=0&id=${id}`,
                    );
                    // window.location.replace(
                    //     `${history.location.pathname}${history.location.search}&checkFinish=true`,
                    // );
                } else {
                    // reviewConflict();
                    message.error(res.message);
                }
            });
        }
    }, 1000);
    // const reviewConflict = () => {
    //     confirm({
    //         title: '该情报已被其他情报专家审核！',
    //         okText: '查看详情',
    //         cancelText: '返回审核列表',
    //         onOk() {
    //             history.push(
    //                 `/intelligence/approved-${type}th/0daydetail?stage=detail&sourceType=0&id=${id}`,
    //             );
    //         },
    //         onCancel() {
    //             history.push(`/intelligence/approved-${type}th`);
    //         },
    //     });
    // };
    const onSubmit = debounce((action) => {
        form.validateFields().then((values) => {
            const formParams = {
                id,
                opinion: values.opinion,
                notice: values.notice,
                tips: values.tips,
                solution: values.solution,
                scope: values.scope,
                vulDesc: values.vulDesc,
            };
            setModalValue(formParams);
            setActionType(action);
            changeIsShowConfirm(true);
        });
    }, 1000);

    const onSaveBasic = debounce(() => {
        form.validateFields().then((values) => {
            if (ips && ips.length > 0) {
                ips.map((item) => {
                    const newItem = item;
                    delete newItem.key;
                    return newItem;
                });
            }
            updateOday({
                id,
                ips,
                name: values.name,
                reportUnit: values.reportUnit,
                foundTime: values.foundTime && moment(values.foundTime).valueOf(),
                // source: values.source && values.source.join(';'),
                cve: values.cve,
                cnnd: values.cnnd,
                cnnvd: values.cnnvd,
            }).then((res1) => {
                if (res1.code === 200) {
                    changeIsEditBasic(!isEditBasic);
                    viewOday({ id, sourceType }).then((res) => {
                        if (res.code === 200) {
                            setDetail(res.data);
                            setIps(res.detail && res.detail.ips);
                            form.setFieldsValue(res.data);
                        } else {
                            message.error(res.message);
                        }
                    });
                } else {
                    message.error(res1.message);
                }
            });
        });
    }, 1000);
    return (
        <Form
            form={form}
            name="change"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            initialValues={{ type: 1 }}
            style={{
                height: 'calc(100vh - 64px - 54px - 56px)',
                overflow: 'auto',
            }}
        >
            <Row
                style={{
                    background: '#ffffff',
                    borderTop: '1px solid rgba(0, 0, 0, 0.15)',
                    height: 54,
                    padding: '11px 24px',
                }}
                align="center"
                justify="space-around"
            >
                <Col span={18}>
                    <Form.Item
                        name="opinion"
                        label="审批意见"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                    >
                        <Input placeholder="请输入" disabled={checkFinish} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    {type === 1 && (
                        <Button
                            disabled={checkFinish || stage === 'detail'}
                            onClick={() => onSubmit(0)}
                        >
                            不通过
                        </Button>
                    )}
                    <Button
                        style={{ marginLeft: '8px' }}
                        disabled={checkFinish || stage === 'detail'}
                        onClick={() => onSubmit(1)}
                    >
                        对内发布
                    </Button>
                    <Button
                        style={{ marginLeft: '8px' }}
                        disabled={checkFinish || stage === 'detail'}
                        type="primary"
                        onClick={() => onSubmit(2)}
                    >
                        对外发布
                    </Button>
                </Col>
            </Row>
            <ScCardDetail>
                {!checkFinish ? (
                    <Form.Item label="情报类型" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                        <Radio.Group
                            value={1}
                            disabled={stage === 'detail' || 'check'}
                            onChange={(e) => {
                                if (e.target.value === 2) {
                                    history.push(
                                        `/intelligence/approved-${type}th/even${history.location.search}`,
                                    );
                                }
                            }}
                        >
                            <Radio value={1}>0/N day</Radio>
                            <Radio value={2}>安全事件</Radio>
                        </Radio.Group>
                    </Form.Item>
                ) : (
                    <Form.Item label="情报类型" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                        0/N day
                    </Form.Item>
                )}
            </ScCardDetail>
            <ScCardDetail
                title="基本信息"
                extra={
                    <Row style={{ width: 56 }}>
                        {!checkFinish && (
                            <Col span={12}>
                                {isEditBasic ? (
                                    <Avatar
                                        shape="square"
                                        size={16}
                                        src={IconSave}
                                        onClick={onSaveBasic}
                                    />
                                ) : (
                                    <FormOutlined
                                        style={{ fontSize: 16 }}
                                        onClick={() => changeIsEditBasic(!isEditBasic)}
                                    />
                                )}
                            </Col>
                        )}
                        <Col span={12}>
                            <ShrinkOutlined
                                style={{ fontSize: 16 }}
                                onClick={() =>
                                    changeCardStatus({ ...cardStatus, card1: !cardStatus.card1 })
                                }
                            />
                        </Col>
                    </Row>
                }
            >
                {cardStatus.card1 && (
                    <>
                        <BasicInfo
                            source="verify0day"
                            isEditBasic={isEditBasic}
                            isShowStatus={checkFinish}
                            threatProcess={threatProcess}
                            detail={detail}
                        />
                        <Row>
                            <Col span={24}>
                                <EditTable
                                    source="verify0day"
                                    isEditBasic={isEditBasic}
                                    detail={detail}
                                    onCallBack={(v) => setIps(v)}
                                />
                            </Col>
                        </Row>
                    </>
                )}
            </ScCardDetail>
            <ScCardDetail
                title="公告信息"
                extra={
                    <ShrinkOutlined
                        style={{ fontSize: 16 }}
                        onClick={() =>
                            changeCardStatus({ ...cardStatus, card2: !cardStatus.card2 })
                        }
                    />
                }
            >
                {cardStatus.card2 && (
                    <OtherInfo
                        source="verify0day"
                        detail={detail}
                        form={form}
                        isNotice={detail && detail.status > 1}
                    />
                )}
            </ScCardDetail>
            <ScCardDetail title="验证工具文件">
                <UploadForm source="verify0day" detail={detail} />
            </ScCardDetail>
            <ScCardDetail
                title="审批进度"
                extra={
                    <ShrinkOutlined
                        style={{ fontSize: 16 }}
                        onClick={() =>
                            changeCardStatus({ ...cardStatus, card3: !cardStatus.card3 })
                        }
                    />
                }
            >
                {cardStatus.card3 && <AssessInfo source="verify0day" detail={threatProcess} />}
            </ScCardDetail>
            <Modal
                title={null}
                visible={isShowConfirm}
                onOk={onOk}
                okText={actionType === 0 ? '不通过' : <>{actionType === 1 ? '对内' : '对外'}发布</>}
                okType={actionType === 0 && 'danger'}
                cancelText="取消"
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
                            {actionType === 0 ? (
                                <>确认"不通过"此情报吗?</>
                            ) : (
                                <>确认这条为{actionType === 1 ? '对内' : '对外'}发布的情报吗?</>
                            )}
                        </span>
                    </div>
                    {actionType === 0 ? (
                        <>
                            此情报
                            {detail.publishStatus === 0 ? '暂未发布' : '已预发布给公司内部成员'}，
                            如您审核未"不通过"，
                            {detail.publishStatus === 0
                                ? '此情报将不会发布，且只有您和提交人能查看此情报记录和详情，此时情报展示为"不通过-仅内部"的状态'
                                : '会更新发布此请情报为"不通过-仅内部"的状态，但用户仍可在通过分享的连接查看该情报'}
                            {detail.publishStatus === 1 && (
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
                                                onChange={(e) =>
                                                    setPushDepart([...pushDepart, ...e])
                                                }
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
                        </>
                    ) : (
                        <>
                            {type === 1 ? (
                                <>
                                    此情报
                                    {detail.publishStatus === 0
                                        ? '暂未发布，'
                                        : '已预发布给公司内部成员，'}
                                    如您审核为{actionType === 1 ? '对内' : '对外'}发布，
                                    {actionType === 1 ? (
                                        <>
                                            {detail.publishStatus === 0
                                                ? '此情报会更新在威胁列表但不会直接发布，如有需要用户可通过"威胁列表-查看"进入情报详情，也可复制链接分享给公司内部成员，此时情报为"通过-仅内部"的状态，'
                                                : '会更新发布次情报为"通过-仅内部"的状态，且用户仍可分享和查看此情报，'}
                                        </>
                                    ) : (
                                        <>
                                            {detail.publishStatus === 0
                                                ? '该情报会直接发布给公司内部成员，并显示为"情报-仅内部"的状态，'
                                                : '将会更新发布此情报为通过为"情报-仅内部"的状态，'}
                                            待运营专家审核确认可对外情报后才可对公司外部成员发布，
                                        </>
                                    )}
                                    请确认已验证该情报的准确性。
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
                                                    onChange={(e) =>
                                                        setPushDepart([...pushDepart, ...e])
                                                    }
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
                                </>
                            ) : (
                                <>
                                    此情报已发布给公司内部成员， 如您审核为
                                    {actionType === 1 ? '对内' : '对外'}发布，
                                    {actionType === 1
                                        ? '此情报将仍为"通过-仅内部"的状态，不可分享给公司外部人员。'
                                        : '会更新发布此情报为"通过-可对外"的状态，且可分享给公司外部人员，请确认已验证该情报的准确性。'}
                                </>
                            )}
                        </>
                    )}
                </div>
            </Modal>
        </Form>
    );
};

Verify0DayPage.propTypes = {
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Verify0DayPage);
