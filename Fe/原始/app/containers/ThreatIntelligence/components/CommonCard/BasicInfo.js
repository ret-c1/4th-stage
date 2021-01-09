import React from 'react';
import { Form, Row, Col, Input, DatePicker } from 'antd';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { searchParams } from '@utils/searchParams';
import RejectInside from '../../assets/reject-inside.png';
import PendingNoPublish from '../../assets/pending-nopublish.svg';
import Pending from '../../assets/pending.png';
import PassInside from '../../assets/pass_Inside.png';
import PassOutside from '../../assets/pass_outside.png';

const AssessConclusion = styled.div`
    width: 120px;
    height: 125px;
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 24px;
    background: ${(props) => {
        const { status, publishStatus } = props;
        // 未通过
        if (status === 3 && publishStatus === 1) {
            return `url(${RejectInside}) no-repeat left top / contain`;
        }
        // 通过&对外
        if (status === 4 && publishStatus === 2) {
            return `url(${PassOutside}) no-repeat left top / contain`;
        }
        // 通过&对内
        if ((status === 4 || status === 2) && publishStatus === 1) {
            return `url(${PassInside}) no-repeat left top / contain`;
        }
        // 待审核
        if (status < 2 && publishStatus !== 0) {
            return `url(${Pending}) no-repeat left top / contain`;
        }
        // // 未通过
        // if (status === 3 && publishStatus !== 1) {
        //     return `url(${RejectNoPublish}) no-repeat left top / contain`;
        // }
        return `url(${PendingNoPublish}) no-repeat left top / contain`;
    }};
`;
const BasicInfo = (props) => {
    const { stage } = searchParams();
    const { source, isEditBasic, isShowStatus, detail } = props;
    const editStatus = stage === 'add' || stage === 'edit' || isEditBasic;
    // const history = useHistory();
    // 审核check状态下可以编辑或者查看，
    return (
        <>
            {source.indexOf('0day') !== -1 ? (
                <>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                name="name"
                                label="漏洞名称"
                                rules={[
                                    {
                                        required: editStatus && true,
                                        message: '请输入漏洞名称！',
                                    },
                                ]}
                            >
                                {editStatus ? (
                                    <Input placeholder="如：钓鱼邮件" />
                                ) : (
                                    <span>{detail && detail.name}</span>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="reportUnit" label="上报单位">
                                {editStatus ? (
                                    <Input placeholder="如：1" />
                                ) : (
                                    <span>{detail && detail.reportUnit}</span>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="foundTime" label="发现时间">
                                {editStatus ? (
                                    <DatePicker
                                        showTime
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                    />
                                ) : (
                                    <span>
                                        {detail &&
                                            detail.foundTime &&
                                            moment(detail.foundTime).format('YYYY-MM-DD HH:mm:ss')}
                                    </span>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item name="cve" label="CVE编号">
                                {editStatus ? (
                                    <Input placeholder="如：CVE-202001-XXX" />
                                ) : (
                                    <span>{detail && detail.cve}</span>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="cnnvd" label="CNNVD编号">
                                {editStatus ? (
                                    <Input placeholder="如：CNNVD-202001-XXXX" />
                                ) : (
                                    <span>{detail && detail.cnnvd}</span>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="cnvd" label="CNVD编号">
                                {editStatus ? (
                                    <Input placeholder="如：CNVD-202001-XXXX" />
                                ) : (
                                    <span>{detail && detail.cnvd}</span>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ) : (
                <>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                name="name"
                                label="安全事件名称"
                                rules={[
                                    {
                                        required: editStatus && true,
                                        message: '请输入安全事件名称！',
                                    },
                                ]}
                            >
                                {editStatus ? (
                                    <Input placeholder="如：钓鱼邮件" />
                                ) : (
                                    <span>{detail && detail.name}</span>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="reportUnit" label="上报单位">
                                {editStatus ? (
                                    <Input placeholder="如：1" />
                                ) : (
                                    <span>{detail && detail.reportUnit}</span>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="foundTime" label="发现时间">
                                {editStatus ? (
                                    <DatePicker
                                        showTime
                                        placeholder="请选择"
                                        style={{ width: '100%' }}
                                    />
                                ) : (
                                    <span>
                                        {detail &&
                                            detail.foundTime &&
                                            moment(detail.foundTime).format('YYYY-MM-DD HH:mm:ss')}
                                    </span>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
            {(source.indexOf('detail') !== -1 ||
                isShowStatus ||
                (stage === 'detail' && detail && detail.publishStatus !== 0)) && (
                <AssessConclusion
                    status={detail && detail.status}
                    publishStatus={detail && detail.publishStatus}
                />
            )}
        </>
    );
};
BasicInfo.propTypes = {
    source: PropTypes.string,
    // threatProcess: PropTypes.object,
    isEditBasic: PropTypes.bool,
    isShowStatus: PropTypes.bool,
    detail: PropTypes.object,
};
export default BasicInfo;
