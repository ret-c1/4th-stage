import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    PageHeader,
    Button,
    Descriptions,
    Row,
    Col,
    Modal,
    Input,
    Form,
    message,
    Divider,
    Table,
} from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { InfoCircleOutlined, ShrinkOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { searchParams } from '@utils/searchParams';
import moment from 'moment';
import watermark from '@utils/watermark';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import IconDetail from '@assets/images/icon-detail.png';
import EditTable from '../../components/CommonCard/EditTable';
import UploadForm from '../../components/CommonCard/UploadForm';
import BasicInfo from '../../components/CommonCard/BasicInfo';
import OtherInfo from '../../components/CommonCard/OtherInfo';
import AssessInfo from '../../components/ApprovalProgress';
import { ScCardDetail } from '../../styled';
import { getStaffLog, viewOday, getLogPeople, getThreatProcess, threatDownload } from './api';

const ScShareModal = styled.div`
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    padding: 16px 64px;
`;
const ScShareModalInfo = styled.div`
    color: rgba(0, 0, 0, 0.45);
    background: rgba(0, 0, 0, 0.04);
    width: 100%;
    height: 32px;
    margin-top: 24px;
    padding: 5px 0 5px 12px;
`;
const ScHeaderInfo = styled.span`
    background: rgba(230, 247, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(145, 213, 255, 1);
    color: rgba(24, 144, 255, 1);
    font-weight: 400;
`;
const ScModalCount = styled.div`
    margin-left: 8px;
    text-align: center;
    width: 27px;
    height: 20px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
`;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const ThreatDetail0DayPage = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [isShowLook, changeIsShowLook] = useState(false);
    const [isShowShare, changeIsShowShare] = useState(false);
    const [cardStatus, changeCardStatus] = useState(true);
    const [currentModal, setCurrentModal] = useState('');
    const { id, sourceType, userIp, location } = searchParams();
    const [detail, setDetail] = useState({});
    const [threatProcess, setThreatProcess] = useState({});
    // 日志人员总数
    const [totalPeople, setTotalPeople] = useState({});
    const [type] = useState(history.location.pathname.indexOf('1') !== -1 ? 1 : 2);
    // 当前审核和发布状态
    const [statusStr, setStatusStr] = useState('待审核 未发布');
    useEffect(() => {
        getLogPeople({ targetId: id, searchType: 1 }).then((res) => {
            if (res.code === 200) {
                setTotalPeople(res.data);
            }
        });
        viewOday({
            id: parseInt(id, 10),
            sourceType: parseInt(sourceType, 10),
            userIp,
            location,
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
                form.setFieldsValue(res.data);
            } else {
                message.error(res.message);
            }
        });
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

    // 查看人员列表
    const [viewUserList, setViewUserList] = useState([]);
    const [staffParams, setStaffParams] = useState({
        limit: 10,
        offset: 0,
        param: {
            bizType: 1,
            targetId: id,
        },
    });
    const staffModal = (types) => {
        setCurrentModal(types);
        setStaffParams({
            ...staffParams,
            param: {
                ...staffParams.param,
                searchType: types,
            },
        });
        changeIsShowLook(true);
    };
    const pageChange = (page, pageSize) => {
        setStaffParams({ ...staffParams, offset: (page - 1) * pageSize });
    };
    const onShowSizeChange = (current, pageSize) => {
        setStaffParams({ ...staffParams, limit: pageSize, offset: 0 });
    };
    useEffect(() => {
        if (staffParams.param.searchType) {
            getStaffLog(staffParams).then((res) => {
                if (res.code === 200) {
                    setViewUserList(res.data);
                } else {
                    message.error(res.message);
                }
            });
        }
    }, [staffParams]);
    // 给网页添加水印
    useEffect(() => {
        watermark.load({
            watermark_txt: `${props.rxInfo.name} ${props.rxInfo.phone} 1 ${statusStr}`,
            watermark_width: 500,
            watermark_x: -140,
        });
        return () => {
            watermark.remove();
        };
    }, [statusStr]);

    // 给canvas添加水印
    const waterCanvas = (canvas) => {
        const div = document.createElement('div');
        // 这个地方是取水印的dom节点
        // html2canvas 获取不到 shadowdom
        // 所以手动获取节点并且通过节点里面的定位给canvas的加上水印
        div.innerHTML = document.getElementById('wm_div_id').shadowRoot.innerHTML;
        const len = div.childNodes.length;
        const cwarter = canvas.getContext('2d');
        cwarter.fillStyle = 'rgb(162, 162, 162)';
        cwarter.font = '100 18px 微软雅黑';
        cwarter.rotate(-0.1 * Math.PI);
        cwarter.translate(-200, 100);
        for (let index = 0; index < len; index += 1) {
            cwarter.fillText(
                // 替换用户信息
                `${props.rxInfo.name} ${props.rxInfo.phone} 1 ${statusStr}`,
                // 用style的left、top 来定位 x、y轴坐标
                parseInt(div.childNodes[index].style.left, 10),
                parseInt(div.childNodes[index].style.top, 10),
            );
        }
        return canvas;
    };

    // 1. 就是html2canvas把dom转换为canvas
    // 2. 把cavas传给waterCanvas 方法加上水印
    // 3. 判断页面高度 来给pdf加分页
    // 4. 输出pdf
    const html2pdf = () => {
        threatDownload({ id });
        // 这个是需要下载的 dom节点
        html2canvas(document.getElementById('0_day_pdf')).then((canvas) => {
            const wcanvas = waterCanvas(canvas);
            const contentWidth = canvas.width;
            const contentHeight = canvas.height;
            // 一页pdf显示html页面生成的canvas高度;
            const pageHeight = (contentWidth / 592.28) * 841.89;
            // 未生成pdf的html页面高度
            let offsetHeight = contentHeight;
            // 页面偏移
            let position = 0;
            // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            const imgWidth = 595.28;
            const imgHeight = (592.28 / contentWidth) * contentHeight;
            const pageData = wcanvas.toDataURL('image/jpeg', 1.0);

            const pdf = new JsPDF('', 'pt', 'a4');

            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            // 当内容未超过pdf一页显示的范围，无需分页
            if (offsetHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
                while (offsetHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                    offsetHeight -= pageHeight;
                    position -= 841.89;
                    // 避免添加空白页
                    if (offsetHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save(
                `${detail && detail.name}_${detail &&
                    detail.createTime &&
                    moment(detail.createTime).format('YYYY-MM-DD HH:mm:ss')}_${detail &&
                    detail.reportUnit}_${detail && detail.userName}.pdf`,
            );
        });
    };
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: currentModal === 2 ? '查看时间' : '下载时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
    ];
    let showEdit = false;
    if (
        detail &&
        detail.status &&
        detail.publishStatus &&
        detail.status === 1 &&
        detail.publishStatus === 0 &&
        location.pathname.indexOf('approved') !== -1
    ) {
        showEdit = true;
    }
    return (
        <div id="0_day_pdf">
            <PageHeader
                ghost={false}
                title="情报详情"
                avatar={{ src: `${IconDetail}` }}
                subTitle={<ScHeaderInfo>0/N day</ScHeaderInfo>}
                extra={
                    <>
                        {showEdit && (
                            <Button
                                type="primary"
                                onClick={() =>
                                    history.push(
                                        `/intelligence/approved-${type}th/even?stage=check&sourceType=0&id=${id}`,
                                    )
                                }
                            >
                                编辑
                            </Button>
                        )}
                        <Button onClick={() => history.go(-1)}>返回</Button>
                        <Button onClick={html2pdf}>下载</Button>
                        <Button type="primary" onClick={() => changeIsShowShare(true)}>
                            分享
                        </Button>
                    </>
                }
            >
                <Descriptions>
                    <Descriptions.Item label="上报时间" key="上报时间">
                        {detail &&
                            detail.createTime &&
                            moment(detail.createTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="发布时间" key="发布时间">
                        {detail &&
                            detail.publishTime &&
                            moment(detail.publishTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="上报来源" key="上报来源">
                        {detail && detail.userName}
                    </Descriptions.Item>
                    <Descriptions.Item label="已读人员" key="已读人员">
                        {totalPeople && totalPeople.readedCount}
                        <Button type="link" onClick={() => staffModal(2)}>
                            查看
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="下载人员" key="下载人员">
                        {totalPeople && totalPeople.downloadCount}
                        <Button type="link" onClick={() => staffModal(1)}>
                            查看
                        </Button>
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Form
                name="change"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                // style={{
                //     height: 'calc(100vh - 64px - 54px - 56px)',
                //     overflow: 'auto',
                // }}
            >
                <ScCardDetail title="基本信息">
                    <BasicInfo detail={detail} source="detail0day" threatProcess={threatProcess} />
                    <Row>
                        <Col span={24}>
                            <EditTable source="detail0day" detail={detail} />
                        </Col>
                    </Row>
                </ScCardDetail>
                <ScCardDetail title="公告信息">
                    <OtherInfo
                        source="detail0day"
                        detail={detail}
                        isNotice={detail && detail.status > 1}
                    />
                </ScCardDetail>
                <ScCardDetail title="验证工具文件">
                    <UploadForm source="detail0day" detail={detail} />
                </ScCardDetail>
                <ScCardDetail
                    title="审批进度"
                    extra={
                        <ShrinkOutlined
                            style={{ fontSize: 16 }}
                            onClick={() => changeCardStatus(true)}
                        />
                    }
                >
                    {cardStatus && <AssessInfo source="detail0day" detail={threatProcess} />}
                </ScCardDetail>
            </Form>
            <Modal
                title={
                    <div style={{ display: 'flex' }}>
                        {currentModal === 2 ? '已读' : '下载'}人员
                        <ScModalCount>
                            {currentModal === 2
                                ? totalPeople && totalPeople.readedCount
                                : totalPeople && totalPeople.downloadCount}
                        </ScModalCount>
                    </div>
                }
                visible={isShowLook}
                footer={null}
                onCancel={() => changeIsShowLook(false)}
            >
                <Table
                    dataSource={viewUserList ? viewUserList.records : []}
                    rowKey={(record, index) => index.toString()}
                    columns={columns}
                    pagination={{
                        pageSizeOptions: pageOptions,
                        onShowSizeChange,
                        showSizeChanger: true,
                        showTotal: () => `共 ${viewUserList && viewUserList.total} 条`,
                        total: viewUserList && viewUserList.total,
                        current: staffParams.offset / staffParams.limit + 1,
                        onChange: pageChange,
                    }}
                />
                <Divider />
                <Row justify="end">
                    <Col>
                        <Button onClick={() => changeIsShowLook(false)}>关闭</Button>
                    </Col>
                </Row>
            </Modal>
            <Modal
                title="链接分享"
                visible={isShowShare}
                onOk={() => changeIsShowShare(false)}
                onCancel={() => changeIsShowShare(false)}
                footer={null}
            >
                <ScShareModal>
                    <div>复制链接分享此情报</div>
                    <Row style={{ margin: '24px 0' }}>
                        <Col span={20}>
                            <Input
                                style={{ width: '100%' }}
                                id="text"
                                value={`${window.location.origin}/webapp/intelligence/threat/0daydetail?flag=${detail.stixBundleId}&id=${id}&stage=detail&sourceType=1`}
                            />
                        </Col>
                        <Col span={4}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    document.getElementById('text').select(); // 选中文本
                                    document.execCommand('copy'); // 执行浏览器复制命令
                                }}
                            >
                                复制
                            </Button>
                        </Col>
                    </Row>
                    <ScShareModalInfo>
                        <InfoCircleOutlined />
                        <span style={{ marginLeft: '12px' }}>对方需要登录平台后才能查看</span>
                    </ScShareModalInfo>
                </ScShareModal>
            </Modal>
        </div>
    );
};

ThreatDetail0DayPage.propTypes = {
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThreatDetail0DayPage);
