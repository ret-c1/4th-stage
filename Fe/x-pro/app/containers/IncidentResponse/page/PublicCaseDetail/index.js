import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ShrinkOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {
    PageHeader,
    Button,
    Descriptions,
    Divider,
    Row,
    Col,
    Modal,
    Input,
    List,
    // message,
    Form,
} from 'antd';
import styled from 'styled-components';
import { searchParams } from '@utils/searchParams';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import IconDetail from '@assets/images/icon-detail.png';
import CaseCheckLists from '../../components/CaseCheckLists';
import { ScContent, ScGray, ScCopy } from '../styled';
import useWatermark from '../../hooks/useWatermark';
// import { getCaseDetail, getStaffLog, emergencyDownload } from './api';

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

const PublicCaseDetailPage = (props) => {
    const history = useHistory();
    const { location } = history;
    const [isOpen, setIsOpen] = useState({
        card1: true,
        card2: true,
        card3: true,
        card4: true,
        card5: true,
    });

    const [targetId] = useState(location.state.id || searchParams().id);
    const [source] = useState(`${location.state.source}`);

    const shrinkFunc = (val) => {
        setIsOpen({
            ...isOpen,
            [`card${val}`]: !isOpen[`card${val}`],
        });
    };
    // 详情
    const [descriptData] = useState([]);
    useEffect(() => {
        // getCaseDetail({ id: parseInt(targetId, 10), sourceType: 0 }).then((res) => {
        //     setDescriptData(res.data);
        // });
    }, []);

    // 人员访问数据集
    const [viewVisible, setViewVisible] = useState(false);
    const [viewListType, setViewListType] = useState(1); // 1-下载 2-已读
    const [viewListRes] = useState({
        total: 0,
        records: [],
    });
    const closeModal = () => {
        setViewVisible(false);
    };
    const staffModal = (type) => {
        setViewVisible(true);
        setViewListType(type);
        // getStaffLog({
        //     limit: 100,
        //     offset: 0,
        //     param: { bizType: 2, targetId, searchType: type },
        // }).then((res) => {
        //     if (res.code === 200) {
        //         setViewListRes({
        //             total: res.data.total,
        //             records: [...res.data.records],
        //         });
        //     } else {
        //         message.error(res.message);
        //     }
        // });
    };

    // 给网页添加水印
    const phone = `${props.rxInfo.phone.substr(0, 3)}****${props.rxInfo.phone.substr(7)}`;
    useWatermark(props.rxInfo.chPinyin || props.rxInfo.name, phone);

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
                `${props.rxInfo.name} ${props.rxInfo.phone} 1`,
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
        // 发送日志
        // emergencyDownload({ id: targetId }).then((status) => {
        //     if (status.code === 200) {
        //         // 重新请求详情
        //         getCaseDetail({ id: parseInt(targetId, 10), sourceType: 0 }).then((res) => {
        //             setDescriptData(res.data);
        //         });
        //     }
        // });
        // 这个是需要下载的 dom节点
        html2canvas(document.getElementById('emergency_pdf')).then((canvas) => {
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

            pdf.save('应急案例详情.pdf');
        });
    };

    // 分享框
    const [showShareModal, setShowShareModal] = useState(false);
    const handleShareModal = () => {
        setShowShareModal(false);
    };

    return (
        <>
            <PageHeader
                ghost={false}
                avatar={{ src: `${IconDetail}` }}
                title="案例详情"
                extra={[
                    <Button
                        key="3"
                        onClick={() => {
                            history.go(-1);
                        }}
                    >
                        返回
                    </Button>,
                    <Button
                        key="2"
                        onClick={() => {
                            html2pdf();
                        }}
                        style={{ display: 'none' }}
                    >
                        下载
                    </Button>,
                    <Button
                        key="1"
                        type="primary"
                        onClick={() => {
                            setShowShareModal(true);
                        }}
                    >
                        分享
                    </Button>,
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="上传时间">
                        {descriptData &&
                            descriptData.createTime &&
                            moment(descriptData.createTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="发布时间">
                        {descriptData &&
                            descriptData.happenTime &&
                            moment(descriptData.happenTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="案例来源">
                        {descriptData && descriptData.createUserName}
                    </Descriptions.Item>
                    <Descriptions.Item label="已读人员">
                        {descriptData.readedCount}
                        <Button
                            type="link"
                            onClick={() => {
                                staffModal(2);
                            }}
                        >
                            查看
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="下载人员" style={{ display: 'none' }}>
                        {descriptData.downloadCount}
                        <Button
                            type="link"
                            onClick={() => {
                                staffModal(1);
                            }}
                        >
                            查看
                        </Button>
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <div id="emergency_pdf">
                <ScContent>
                    <Row>
                        <Col span={4}>
                            <h3 style={{ paddingLeft: '50px' }}>应急信息</h3>
                        </Col>
                        <Col span={20} style={{ textAlign: 'right', paddingRight: '40px' }}>
                            <ShrinkOutlined onClick={() => shrinkFunc(1)} />
                        </Col>
                    </Row>
                    <Divider />
                    {isOpen && isOpen.card1 === true && (
                        <Descriptions bordered size="middle" style={{ padding: '0 40px' }}>
                            <Descriptions.Item label="事件关键字">
                                {descriptData && descriptData.keyword}
                            </Descriptions.Item>
                            <Descriptions.Item label="事件类型" span={2}>
                                {descriptData && descriptData.type}
                            </Descriptions.Item>
                            <Descriptions.Item label="事件名称">
                                {descriptData && descriptData.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="事件级别">
                                {descriptData && descriptData.level}
                            </Descriptions.Item>
                            <Descriptions.Item label="事件紧急度">
                                {descriptData && descriptData.urgency}
                            </Descriptions.Item>
                            <Descriptions.Item label="事件描述" span={3}>
                                {descriptData && descriptData.description}
                            </Descriptions.Item>
                            <Descriptions.Item label="事件发现时间">
                                {descriptData &&
                                    descriptData.discoverTime &&
                                    moment(descriptData.discoverTime).format('YYYY-MM-DD HH:mm:ss')}
                            </Descriptions.Item>
                            <Descriptions.Item label="事件发生时间" span={2}>
                                {descriptData &&
                                    descriptData.happenTime &&
                                    moment(descriptData.happenTime).format('YYYY-MM-DD HH:mm:ss')}
                            </Descriptions.Item>
                            <Descriptions.Item label="来源IP">
                                {descriptData && descriptData.targetIp}
                            </Descriptions.Item>
                            <Descriptions.Item label="攻击来源">
                                {descriptData && descriptData.attack}
                            </Descriptions.Item>
                            <Descriptions.Item label="攻击所属业务系统">
                                {descriptData && descriptData.IntranetSystem}
                            </Descriptions.Item>
                            <Descriptions.Item label="目的IP">
                                {descriptData && descriptData.aimIp}
                            </Descriptions.Item>
                            <Descriptions.Item label="目的来源">
                                {descriptData && descriptData.aimSecurityDomain}
                            </Descriptions.Item>
                            <Descriptions.Item label="目的所属业务系统">
                                {descriptData && descriptData.InternetSystem}
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                    <br />
                </ScContent>
                {source === '2' ? (
                    <ScContent>
                        <Row>
                            <Col span={4}>
                                <h3 style={{ paddingLeft: '50px' }}>应急报告</h3>
                            </Col>
                            <Col span={20} style={{ textAlign: 'right', paddingRight: '40px' }}>
                                <ShrinkOutlined onClick={() => shrinkFunc(2)} />
                            </Col>
                        </Row>
                        <Divider />
                        {isOpen.card2 && descriptData.reportUrl ? (
                            <iframe
                                title="bar"
                                src={`${window.location.origin}/kkfileview/onlinePreview?url=${window.location.origin}${descriptData.reportUrl}`}
                                frameBorder="0"
                                width="100%"
                                height="1000"
                            />
                        ) : null}
                    </ScContent>
                ) : null}
                {source !== '2' ? (
                    <>
                        <ScContent>
                            <Row>
                                <Col span={4}>
                                    <h3 style={{ paddingLeft: '50px' }}>排查记录</h3>
                                </Col>
                                <Col span={20} style={{ textAlign: 'right', paddingRight: '40px' }}>
                                    <ShrinkOutlined onClick={() => shrinkFunc(3)} />
                                </Col>
                            </Row>
                            <Divider />

                            {isOpen && isOpen.card3 === true && (
                                <Form.Item style={{ padding: '0 40px' }}>
                                    <CaseCheckLists
                                        checkLists={
                                            descriptData && Object.keys(descriptData).length > 0
                                                ? descriptData.checklistDTOS
                                                : {}
                                        }
                                        isNeedEdit={false}
                                    />
                                </Form.Item>
                            )}
                        </ScContent>
                        <ScContent>
                            <Row>
                                <Col span={4}>
                                    <h3 style={{ paddingLeft: '50px' }}>排查结果</h3>
                                </Col>
                                <Col span={20} style={{ textAlign: 'right', paddingRight: '40px' }}>
                                    <ShrinkOutlined onClick={() => shrinkFunc(4)} />
                                </Col>
                            </Row>
                            <Divider />

                            {isOpen && isOpen.card4 === true && (
                                <Descriptions column={1} style={{ padding: '0 40px' }}>
                                    <Descriptions.Item label="分析结果">
                                        {descriptData && descriptData.result}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="结论">
                                        {descriptData && descriptData.result}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="安全加固建议">
                                        {descriptData && descriptData.securityAdvice}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="实施方式">
                                        {descriptData && descriptData.way}
                                    </Descriptions.Item>
                                </Descriptions>
                            )}
                        </ScContent>
                        <ScContent>
                            <Row>
                                <Col span={4}>
                                    <h3 style={{ paddingLeft: '50px' }}>处置记录</h3>
                                </Col>
                                <Col span={20} style={{ textAlign: 'right', paddingRight: '40px' }}>
                                    <ShrinkOutlined onClick={() => shrinkFunc(5)} />
                                </Col>
                            </Row>
                            <Divider />

                            {isOpen && isOpen.card5 === true && (
                                <Descriptions column={1} style={{ padding: '0 40px' }}>
                                    <Descriptions.Item label="处置开始时间">
                                        {descriptData &&
                                            descriptData.startHandleTime &&
                                            moment(descriptData.startHandleTime).format(
                                                'YYYY-MM-DD HH:MM:SS',
                                            )}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="处置过程">
                                        {descriptData && descriptData.handle}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="事件处置结果">
                                        {descriptData && descriptData.handleResult}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="可行性建议">
                                        {descriptData && descriptData.feasibilityAdvice}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="实施方式">
                                        {descriptData && descriptData.hanleWay}
                                    </Descriptions.Item>
                                </Descriptions>
                            )}
                        </ScContent>
                    </>
                ) : null}
            </div>
            <Modal
                title="链接分享"
                visible={showShareModal}
                footer={null}
                onCancel={handleShareModal}
                width="35%"
            >
                <Row justify="center">
                    <Col span={20}>
                        <ScCopy>复制链接分享此情报</ScCopy>
                        <Row style={{ margin: '24px 0' }}>
                            <Col span={20}>
                                <Input
                                    style={{ width: '100%' }}
                                    id="text"
                                    value={`${window.location.origin}/webapp/incident/publiccase/detail?id=${targetId}`}
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
                        <ScGray>
                            <InfoCircleOutlined style={{ margin: '0 10px' }} />
                            对方需要登录平台才能查看
                        </ScGray>
                    </Col>
                </Row>
            </Modal>
            <Modal
                title={
                    <div style={{ display: 'flex' }}>
                        {viewListType === 1 ? '下载' : '已读'}人员
                        <ScModalCount>{viewListRes.total}</ScModalCount>
                    </div>
                }
                visible={viewVisible}
                footer={null}
                onCancel={closeModal}
                width="35%"
            >
                <List
                    size="small"
                    bordered
                    dataSource={viewListRes.records}
                    renderItem={(item) => (
                        <List.Item>
                            {item.name}
                            {item.phone}
                        </List.Item>
                    )}
                />
                <Divider />
                <Row justify="end">
                    <Col>
                        <Button
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            关闭
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

PublicCaseDetailPage.propTypes = {
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PublicCaseDetailPage);
