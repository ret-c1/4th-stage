import React, { useState, useEffect } from 'react';
import {
    List,
    Button,
    Upload,
    message,
    Form,
    Row,
    Col,
    Tag,
    Input,
    Tooltip,
    Alert,
    Popconfirm,
} from 'antd';
import PropTypes from 'prop-types';
import { UploadOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import styled from 'styled-components';
import AnalyseInfo from './AnalyseInfo';
import { tiUrlUpload, getTiUrl } from '../../api';
import logo360 from '../../assets/logo_360.png';
import logoAnheng from '../../assets/logo_anheng.png';
import logoQianxin from '../../assets/logo_qianxin.png';
import logoVT from '../../assets/logo_VT.png';
import logoWeibu from '../../assets/logo_weibu.png';
const AlertMessage = [
    { name: '1', url: 'https://ti.x.com.cn/' },
    { name: 'VIRUSTOTAL', url: 'https://www.virustotal.com/' },
    { name: 'Threat Book 微步在线', url: 'https://x.threatbook.cn/' },
    { name: '奇安信威胁情报中心', url: 'https://ti.qianxin.com/' },
    { name: '360威胁情报中心', url: 'https://ti.360.cn/' },
];
const renderImg = (type) => {
    switch (type) {
        case '360威胁情报平台':
            return logo360;
        case '奇安信威胁情报平台':
            return logoQianxin;
        case 'virustotal':
            return logoVT;
        case '微步':
            return logoWeibu;
        default:
            return logoAnheng;
    }
};
const renderColor = (type, controlLight) => {
    if (controlLight && controlLight.name && controlLight.name === type) {
        return 'rgba(24, 144, 255, 1)';
    }
    return 'rgba(0, 0, 0, 0.45)';
};
const ScLogo = styled.span`
    background: url(${(props) => renderImg(props.type)}) no-repeat;
    background-size: 36px 36px;
    background-color: ${(props) => renderColor(props.type, props.controlLight)};
    border-radius: 36px;
    width: 36px;
    height: 36px;
`;
const Analyse = (props) => {
    const { detail, onCallBack } = props;
    const { stage } = searchParams();
    const editStatus = stage === 'add' || stage === 'edit';
    const [checkIndex, changeCheckIndex] = useState(0); // 当前展开详情的文件index
    const [fileLists, setFileLists] = useState([]); // 上报恶意样本文件列表
    const [isShowCopy, changeIsShowCopy] = useState(false);
    const [inputValue, setInputValue] = useState(false);
    const [isShowDetail, changeIsShowDetail] = useState({});
    const [controlLight, setControlLight] = useState('');
    useEffect(() => {
        if (detail && detail.analysisResults) {
            setFileLists(detail.analysisResults);
        }
    }, [detail]);

    const onChange = (info) => {
        if (info.file.response) {
            if (info.file.response.code === 200) {
                setFileLists([...fileLists, info.file.response.data]);
                onCallBack([...fileLists, info.file.response.data]);
            } else {
                message.error(info.file.response.message);
            }
        }
    };
    const [isShowAlert, changeIsShowAlert] = useState(false);
    const submitUrl = () => {
        tiUrlUpload({ value: inputValue }).then((res) => {
            if (res.code === 200) {
                setFileLists([...fileLists, res.data]);
                onCallBack([...fileLists, res.data]);
                changeIsShowCopy(false);
            } else {
                changeIsShowAlert(true);
            }
        });
    };
    const changeLight = (name) => {
        if (name) {
            setControlLight({ name });
        }
    };
    const [isShowTags, changeIsShowTags] = useState({});
    return (
        <>
            <List
                dataSource={fileLists}
                header={
                    editStatus && (
                        <>
                            <div>
                                <Upload
                                    name="attach"
                                    action="/api/ti/upload"
                                    showUploadList={false}
                                    onChange={onChange}
                                >
                                    <Button type="primary">
                                        <UploadOutlined /> 上传文件
                                    </Button>
                                </Upload>
                                <Button
                                    type="link"
                                    style={{ marginLeft: '8px' }}
                                    onClick={() => changeIsShowCopy(true)}
                                >
                                    直接添加分析结果链接/HASH
                                </Button>
                            </div>
                            {isShowAlert && (
                                <Alert
                                    type="error"
                                    showIcon
                                    closable
                                    onClose={() => changeIsShowAlert(false)}
                                    message={
                                        <>
                                            该URL不合法，请选择以下情报分析平台
                                            {AlertMessage.map((item1) => (
                                                <Button
                                                    key={item1.name}
                                                    type="link"
                                                    onClick={() => window.open(item1.url, '_blank')}
                                                >
                                                    {item1.name}
                                                </Button>
                                            ))}
                                        </>
                                    }
                                />
                            )}
                            {isShowCopy && (
                                <Row style={{ marginTop: '16px' }}>
                                    <Col span={22}>
                                        <Form.Item label="链接/HASH" labelCol={2} wrapperCol={21}>
                                            <Input
                                                placeholder="请将文件分析链接粘贴到此处"
                                                onChange={(e) => {
                                                    setInputValue(e.target.value);
                                                    changeIsShowAlert(false);
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1} style={{ marginLeft: '5px' }}>
                                        <Button type="primary" onClick={() => submitUrl()}>
                                            提交
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </>
                    )
                }
                renderItem={(item, index) => {
                    let extensions = {};
                    let tags = [];
                    if (fileLists && fileLists[index] && fileLists[index].extensions) {
                        extensions = fileLists[index].extensions;
                    }
                    if (
                        extensions &&
                        extensions.x_ti_x_com_cn &&
                        extensions.x_ti_x_com_cn.x_tip_info &&
                        extensions.x_ti_x_com_cn.x_tip_info.length > 0 &&
                        extensions.x_ti_x_com_cn.x_tip_info[0].tags
                    ) {
                        tags = extensions.x_ti_x_com_cn.x_tip_info[0].tags;
                    }
                    return (
                        <>
                            <Row justify="start">
                                <Col span={1}>
                                    <Button
                                        disabled={
                                            (!extensions ||
                                                (extensions &&
                                                    !extensions.x_ti_x_com_cn)) &&
                                            !tags
                                        }
                                        type="link"
                                        onClick={() => {
                                            // changeCheckIndex(index);
                                            changeIsShowDetail({
                                                ...isShowDetail,
                                                [`${index}`]: !isShowDetail[`${index}`],
                                            });
                                        }}
                                    >
                                        {isShowDetail[`${index}`] ? (
                                            <UpOutlined />
                                        ) : (
                                            <DownOutlined />
                                        )}
                                    </Button>
                                </Col>
                                <Col span={23}>
                                    <Form.Item
                                        style={{
                                            width: '100%',
                                            fontSize: 14,
                                            fontWeight: 400,
                                            color: 'rgba(0, 0, 0, 0.45)',
                                        }}
                                        labelCol={{ span: 2 }}
                                        label="HASH"
                                    >
                                        <Button
                                            type="link"
                                            value={item.hashes[`sha-256`]}
                                            onClick={() => {
                                                if (item.hashes[`sha-256`]) {
                                                    getTiUrl({
                                                        value: item.hashes[`sha-256`],
                                                    }).then((res) => {
                                                        if (res.code === 200) {
                                                            window.open(res.data.url, '_blank');
                                                        } else {
                                                            message.info(res.message);
                                                        }
                                                    });
                                                }
                                            }}
                                        >
                                            {item.hashes[`sha-256`]}
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ marginLeft: 40 }}>
                                <Col span={16}>
                                    <Form.Item
                                        labelCol={{ span: 2 }}
                                        wrapperCol={{ span: 22 }}
                                        label="其他参考链接"
                                    >
                                        <Row>
                                            {extensions &&
                                                extensions.external_references &&
                                                extensions.external_references.length > 0 &&
                                                extensions.external_references.map((item1) => (
                                                    <Col span={1} key={item1.source_name}>
                                                        <Tooltip title={item1.source_name}>
                                                            <Button
                                                                type="link"
                                                                onClick={() =>
                                                                    window.open(item1.url, '_blank')
                                                                }
                                                            >
                                                                <ScLogo
                                                                    type={item1.source_name}
                                                                    onMouseEnter={() => {
                                                                        changeCheckIndex(index);
                                                                        changeLight(
                                                                            item1.source_name,
                                                                        );
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        changeCheckIndex(index);
                                                                        changeLight(null);
                                                                    }}
                                                                    controlLight={
                                                                        checkIndex === index &&
                                                                        controlLight
                                                                    }
                                                                />
                                                            </Button>
                                                        </Tooltip>
                                                    </Col>
                                                ))}
                                        </Row>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    {tags.length > 0 && (
                                        <>
                                            <Form.Item
                                                label="威胁情报标签"
                                                labelCol={{ span: 8 }}
                                                style={{ marginBottom: '-24px' }}
                                            >
                                                {tags.length > 5 &&
                                                    !isShowTags[`${index}`] &&
                                                    tags.splice(0, 5).map((item1) => (
                                                        <Tag color="red" key={item1}>
                                                            {item1}
                                                        </Tag>
                                                    ))}
                                                {(tags.length <= 5 ||
                                                    (tags.length > 5 && isShowTags[`${index}`])) &&
                                                    tags.map((item1) => (
                                                        <Tag color="red" key={item1}>
                                                            {item1}
                                                        </Tag>
                                                    ))}
                                            </Form.Item>
                                            {tags && tags.length > 5 && (
                                                <Button
                                                    type="link"
                                                    onClick={() => {
                                                        changeIsShowTags({
                                                            ...isShowTags,
                                                            [`${index}`]: !isShowTags[`${index}`],
                                                        });
                                                    }}
                                                >
                                                    {isShowTags[`${index}`] ? (
                                                        <>
                                                            <UpOutlined />
                                                            收起
                                                        </>
                                                    ) : (
                                                        <>
                                                            <DownOutlined />
                                                            展开
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </Col>
                                <Col span={1}>
                                    {editStatus && (
                                        <Popconfirm
                                            title="是否确认删除?"
                                            onConfirm={() => {
                                                fileLists.splice(index, 1);
                                                setFileLists([...fileLists]);
                                            }}
                                        >
                                            <Button type="link">删除</Button>
                                        </Popconfirm>
                                    )}
                                </Col>
                            </Row>
                            <Row style={{ marginLeft: 40 }}>
                                <Col span={24}>
                                    <Form.Item
                                        labelCol={{ span: 2 }}
                                        wrapperCol={{ span: 22 }}
                                        label="文件名称"
                                    >
                                        {editStatus ? (
                                            <Input
                                                placeholder="请输入文件名称"
                                                defaultValue={item.name}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    const newData = fileLists;
                                                    newData[index].name = e.target.value;
                                                    setFileLists([...newData]);
                                                    onCallBack([...newData]);
                                                }}
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <List.Item>
                                {isShowDetail[`${index}`] && (
                                    <AnalyseInfo
                                        style={{ background: 'rgba(0, 0, 0, 0.02)' }}
                                        fileHash={item.hashes[`sha-256`]}
                                        content={extensions && extensions.x_ti_x_com_cn}
                                    />
                                )}
                            </List.Item>
                        </>
                    );
                }}
            />
        </>
    );
};
Analyse.propTypes = {
    detail: PropTypes.object,
    onCallBack: PropTypes.func,
};
export default Analyse;
