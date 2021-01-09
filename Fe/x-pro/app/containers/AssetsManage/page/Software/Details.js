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

const SoftwareDetailsPage = () => {
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
            <ScCardDetail title="软件库信息" bordered={false}>
                <Descriptions>
                    <Descriptions.Item label="业务系统名称" key="业务系统名称">
                        oa系统
                    </Descriptions.Item>
                    <Descriptions.Item label="主机名称" key="主机名称">
                        这是
                    </Descriptions.Item>
                    <Descriptions.Item label="资产状态" key="资产状态">
                        使用中
                    </Descriptions.Item>
                    <Descriptions.Item label="远程管理方式" key="远程管理方式">
                        1.1.12.2
                    </Descriptions.Item>
                    <Descriptions.Item label="中间件名称" key="中间件名称">
                        1.1.12.2
                    </Descriptions.Item>
                    <Descriptions.Item label="具体版本" key="具体版本">
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="中间件内网端口号" key="中间件内网端口号">
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="中间件互联网端口号" key="中间件互联网端口号">
                        mac
                    </Descriptions.Item>
                    <Descriptions.Item label="备注" key="备注">
                        mac
                    </Descriptions.Item>
                </Descriptions>
            </ScCardDetail>
            <ScCardDetail title="责任人信息" bordered={false}>
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

export default compose(withConnect, memo)(SoftwareDetailsPage);
