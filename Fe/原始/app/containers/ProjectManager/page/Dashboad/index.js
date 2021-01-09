import React, { useEffect, useState } from 'react';
import { Typography, Button, Row, Col } from 'antd';
import {
    FileSearchOutlined,
    DownOutlined,
    FolderViewOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import jwt from 'jsonwebtoken';
import { searchParams } from '@utils/searchParams';
import PubDrawer from '@components/PubDrawer';
import { pubModalTips } from '@components/PubModal';
import { ScContent, ScHeader, ScTree } from '../styled';
import { doctaskTree, filePreview } from '../api';

const { Title, Text } = Typography;

/**
 * 处理树结构的函数,返回包含name和id的对象数组
 * @param {*} data 传入树结构
 * @param {*} fatherStage 传入当前stage
 * @param {*} fatherId 传入当前父类id
 */
const pickTree = (data, download, preview) => {
    const arr = [];
    data.forEach((list, idx) => {
        arr.push({
            title: list.planStageName,
            id: list.planStageId,
            key: idx,
            children: [],
        });
        if (list.planList) {
            list.planList.forEach((item, ix) => {
                arr[idx].children.push({
                    title: item.typeName,
                    id: item.id,
                    key: `${idx}-${ix}`,
                    children: [],
                });
                if (item.planDocList) {
                    item.planDocList.forEach((dt, i) => {
                        arr[idx].children[ix].children.push({
                            title: (
                                <>
                                    <Row>
                                        <Col span={22}>
                                            <Text>{dt.name}</Text>
                                        </Col>
                                        <Col span={1}>
                                            <FolderViewOutlined onClick={() => preview(dt.id)} />
                                        </Col>
                                        <Col span={1}>
                                            <DownloadOutlined onClick={() => download(dt.id)} />
                                        </Col>
                                    </Row>
                                </>
                            ),
                            id: dt.id,
                            key: `${idx}-${ix}-${i}`,
                            children: [],
                        });
                    });
                }
            });
        }
    });
    return arr;
};

const DashboadPage = () => {
    const { id, name } = searchParams();
    const [iframeUrl, setIframeUrl] = useState(null);
    useEffect(() => {
        const METABASE_SITE_URL = '/metabase';
        const METABASE_SECRET_KEY =
            'cc5c2be75c80c6c318d1e0057ed24782e108d0c6aefac795aae29ed1f6a0305e';
        const payload = {
            resource: { dashboard: 3 },
            params: {
                id,
            },
            exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
        };
        const token = jwt.sign(payload, METABASE_SECRET_KEY);
        setIframeUrl(`${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=false&titled=false`);
    }, []);

    const [visible, setVisible] = useState(false);
    // 定义回调
    const handleDvisibleOk = () => {
        // 点击确定回调
        setVisible(!visible);
    };
    // 定义回调
    const handleDvisibleClose = () => {
        // 点击遮罩层或右上角叉或取消按钮的回调
        setVisible(!visible);
    };

    // 计划类型树
    // 实施阶段所有阶段
    const [allStage, setAllStage] = useState([]);
    useEffect(() => {
        const param = {
            id,
        };
        doctaskTree(param).then((res) => {
            if (res.code === 200) {
                setAllStage(pickTree(res.data, download, preview));
                // const t1 = pickTree(res.data);
            } else {
                pubModalTips('error', '获取失败', res.message, 2);
            }
        });
    }, []);

    // 下载
    const download = (did) => {
        const a = document.createElement('a');
        a.setAttribute('href', `/api/doc/download/${did}`);
        a.setAttribute('referrerpolicy', 'origin');
        a.click();
    };

    // 表格预览
    const preview = (did) => {
        filePreview({ id: did }).then((res) => {
            if (res.code === 200) {
                window.open(
                    `/kkfileview/onlinePreview?url=${window.location.origin}/api/img${res.message}`,
                    '预览',
                    'channelmode=yes,left=200,screenX=200,toolbar=no,status=no,scrollbars=no,location=no,menubar=no,width=1200,height=800',
                );
            } else {
                pubModalTips('error', '预览失败', res.message, 2);
            }
        });
    };

    return (
        <>
            <ScHeader>
                <Title level={4} style={{ display: 'inline-block' }}>
                    {decodeURIComponent(name)}
                </Title>
                <Button type="link" icon={<FileSearchOutlined />} onClick={handleDvisibleOk}>
                    项目文档目录
                </Button>
            </ScHeader>
            <ScContent>
                <iframe title="bar" src={iframeUrl} frameBorder="0" width="100%" height="4800" />
            </ScContent>
            <PubDrawer
                title="查看项目文档目录"
                visible={visible}
                onOk={handleDvisibleOk}
                onClose={handleDvisibleClose}
                okText=""
                closeText=""
            >
                <ScTree
                    showIcon
                    defaultExpandAll
                    switcherIcon={<DownOutlined />}
                    treeData={allStage}
                />
            </PubDrawer>
        </>
    );
};
export default DashboadPage;
