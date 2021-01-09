import React, { useEffect, useState, useRef } from 'react';
import { Button, Spin } from 'antd';
import { searchParams } from '@utils/searchParams';
import { LoadingOutlined } from '@ant-design/icons';
// import moment from 'moment';
import ReportInfo from '../../components/ReportInfo';
import { ScItWrapper, ScFooterWrapper } from './styled';
// import { getEmergencyInfo, generator, generatorStatus } from '../api';

const ReportPage = () => {
    const { type, repordId, id } = searchParams();
    const [reportInfo] = useState({});
    console.log(id);

    // 获取报告详情和应急详情
    useEffect(() => {
        // getReportDetail({ id: parseInt(repordId, 10) }).then((res) => {
        //     if (res.code === 200) {
        //         setReportInfo({ ...reportInfo, ...res.data });
        //     } else {
        //         PubMessage('error', res.message);
        //     }
        // });
        // getEmergencyInfo(id).then((res) => {
        //     if (res.code === 200) {
        //         reportInfo.相关说明 = `本文档是由“1”于${moment(res.realDiscoverTime).format(
        //             'YYYY-MM-DD',
        //         )}针对${res.clientName || ''}${
        //             res.intranetSystem || ''
        //         }进行应急响应工作所提交的报告资料`;
        //         reportInfo.事件概述 = `${moment(res.realDiscoverTime).format(
        //             'YYYY-MM-DD',
        //         )},“1”接到${res.clientName || ''}相关工作人员电话，告知${
        //             res.introduction || ''
        //         }，请求对该系统进行应急响应，项目经理${res.emergencyManager || ''}派安全工程师${
        //             res.emergencyPerson ? res.emergencyPerson.split(',').join('、') : ''
        //         }进行远程应急，通过对服务器相关信息进行分析基本还原了大概过程。`;
        //         setReportInfo({ ...reportInfo, ...res.data });
        //     } else {
        //         message.error(res.message);
        //     }
        // });
    }, []);

    // 为了点击时获取子组件基本信息
    const reportInfoRef = useRef(null);
    // 生成报告链接
    const [reportUrl] = useState('');
    // 下载按钮状态
    const [buttonStatus] = useState(false);
    // 生成报告
    const generatorReport = (status) => {
        const { chapter, content } = reportInfoRef.current;
        const param = {
            id: repordId,
            type: 4,
            chapter,
            content,
            generator: status,
        };
        console.log(param);
        if (status) {
            setIsShow(true);
        }
        // 发起生成报告请求
        // generator(param).then((res) => {
        //     if (res.code === 200) {
        //         const downloadId = res.data;
        //         if (status) {
        //             let timer = setInterval(() => {
        //                 const statusParam = {
        //                     id: downloadId,
        //                     type: 4,
        //                 };
        //                 generatorStatus(statusParam).then((statusRes) => {
        //                     if (statusRes.code === 200) {
        //                         const { downloadStatus, downloadUrl } = statusRes.data;
        //                         if (downloadStatus === 1) {
        //                             setButtonStatus(true);
        //                             setIsShow(false);
        //                             setReportUrl(downloadUrl);
        //                             clearInterval(timer);
        //                             timer = null;
        //                         }
        //                     } else {
        //                         message.error(statusRes.message);
        //                         clearInterval(timer);
        //                         timer = null;
        //                         setIsShow(false);
        //                     }
        //                 });
        //             }, 10000);
        //         }
        //         message.success('成功');
        //     }
        // });
    };

    // 生成报告状态spin
    const [isShow, setIsShow] = useState(false);

    return (
        <ScItWrapper>
            <div style={{ background: '#fff' }}>
                <ReportInfo info={reportInfo} reportInfoRef={reportInfoRef} />
            </div>
            {type === 'generator' && (
                <ScFooterWrapper>
                    <div style={{ float: 'right' }}>
                        {isShow && (
                            <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                                <Spin
                                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                                    spinning
                                >
                                    报告生成中，生成后可在报告列表中下载，谢谢
                                </Spin>
                            </div>
                        )}
                        {buttonStatus && (
                            <Button type="link" href={`/api${reportUrl.split('/api')[1]}`}>
                                下载
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                generatorReport(true);
                            }}
                            style={{
                                marginLeft: '10px',
                                display: 'inline-block',
                            }}
                            type="primary"
                        >
                            生成
                        </Button>
                    </div>
                </ScFooterWrapper>
            )}
        </ScItWrapper>
    );
};

export default ReportPage;
