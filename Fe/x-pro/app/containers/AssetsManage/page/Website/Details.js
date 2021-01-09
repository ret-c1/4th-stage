import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { PageHeader, Button, Descriptions, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import IconDetail from '@assets/images/icon-detail.png';
import { searchParams } from '@utils/searchParams';
import { ScCardDetail } from '../../styled';

export const ScCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px #1890ff solid;
`;

const WebsiteDetailsPage = () => {
    const history = useHistory();
    const { id } = searchParams();
    console.log(id);
    /* const [assetInfo, setAssetInfo] = useState({
        name: '',
        ...
    });
    useEffect(() => {
        getAssetInfo({ id }).then((res) => {
            if (res.code === 200) {
                setAssetInfo(res.data);
            } else {
                message.error(res.message);
            }
        });
    }, []); */
    return (
        <>
            <PageHeader
                ghost={false}
                title="资产详情"
                avatar={{ src: `${IconDetail}` }}
                subTitle={
                    <span
                        style={{
                            background: 'rgba(0, 0, 0, 0.04)',
                            fontSize: 12,
                            color: 'rgba(0, 0, 0, 0.65)',
                            borderRadius: 2,
                        }}
                    >
                        资产来源：导入
                    </span>
                }
                extra={[
                    <Button key="3" onClick={() => history.go(-1)}>
                        返回
                    </Button>,
                    <Button key="2" type="primary">
                        下载
                    </Button>,
                ]}
            >
                <Row style={{ marginLeft: '44px' }} align="middle">
                    <Col>
                        <ScCircle />
                    </Col>
                    <Col style={{ marginLeft: '7px' }}>2020年4月29日 xxx导入了该资产</Col>
                </Row>
            </PageHeader>
            <ScCardDetail title="网站信息" bordered={false}>
                <Descriptions>
                    <Descriptions.Item label="业务系统名称" key="业务系统名称">
                        oa系统
                    </Descriptions.Item>
                    <Descriptions.Item label="网站名称" key="网站名称">
                        这是
                    </Descriptions.Item>
                    <Descriptions.Item label="资产状态" key="资产状态">
                        使用中
                    </Descriptions.Item>
                    <Descriptions.Item label="系统开发商/维护商" key="系统开发商/维护商">
                        1.1.12.2
                    </Descriptions.Item>
                    <Descriptions.Item label="系统后端开发语言" key="系统后端开发语言">
                        1.1.12.2
                    </Descriptions.Item>
                    <Descriptions.Item label="开发语言版本" key="开发语言版本">
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="内网IP地址及端口" key="内网IP地址及端口">
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="内网域名" key="内网域名">
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="是否为互联网系统" key="是否为互联网系统">
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="互联网IP地址及端口" key="互联网IP地址及端口">
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="外网域名" key="外网域名" span={2}>
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="选入关联主机资产" key="选入关联主机资产" span={3}>
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="备注" key="备注">
                        mac
                    </Descriptions.Item>
                </Descriptions>
            </ScCardDetail>
            <ScCardDetail title="安全属性信息" bordered={false}>
                <div>
                    <span style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)' }}>资产价值：</span>
                    6.55
                </div>
                <Descriptions
                    style={{
                        background: 'rgba(0, 0, 0, 0.04)',
                        borderRadius: 2,
                        width: '100%',
                        height: '70px',
                        marginTop: 12,
                        padding: '24px 48px',
                    }}
                    column={4}
                >
                    <Descriptions.Item label="保密性" key="保密性">
                        $80.00
                    </Descriptions.Item>
                    <Descriptions.Item label="完整性" key="完整性">
                        $20.00
                    </Descriptions.Item>
                    <Descriptions.Item label="可用性" key="可用性">
                        $60.00
                    </Descriptions.Item>
                    <Descriptions.Item label="业务相关性" key="业务相关性">
                        $60.00
                    </Descriptions.Item>
                </Descriptions>
            </ScCardDetail>
            <ScCardDetail title="责任人及位置信息" bordered={false}>
                <Descriptions>
                    <Descriptions.Item label="资产所属部门" key="资产所属部门">
                        $80.00
                    </Descriptions.Item>
                    <Descriptions.Item label="资产负责人" key="资产负责人">
                        $20.00
                    </Descriptions.Item>
                    <Descriptions.Item label="责任人联系电话" key="责任人联系电话">
                        $60.00
                    </Descriptions.Item>
                    <Descriptions.Item label="开发商" key="开发商">
                        $60.00
                    </Descriptions.Item>
                    <Descriptions.Item label="维护商" key="维护商">
                        $60.00
                    </Descriptions.Item>
                    <Descriptions.Item label="维护商责任人" key="维护商责任人">
                        $60.00
                    </Descriptions.Item>
                </Descriptions>
            </ScCardDetail>
        </>
    );
};

// OperationPage.propTypes = {
//     rxInfo: PropTypes.object,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(WebsiteDetailsPage);
