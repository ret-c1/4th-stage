import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Result, Button, Descriptions } from 'antd';

const WebsiteStep4Page = () => {
    const history = useHistory();
    return (
        <>
            <Result
                status="success"
                title="提交成功"
                extra={[
                    <Descriptions key="descr" bordered style={{ marginBottom: '54px' }}>
                        <Descriptions.Item label="业务系统名称" key="业务系统名称">
                            oa系统
                        </Descriptions.Item>
                        <Descriptions.Item label="主机名称" key="主机名称">
                            这是
                        </Descriptions.Item>
                        <Descriptions.Item label="资产状态" key="资产状态">
                            使用中
                        </Descriptions.Item>
                        <Descriptions.Item label="内网IP地址" key="内网IP地址">
                            1.1.12.2
                        </Descriptions.Item>
                        <Descriptions.Item label="操作系统类型" key="操作系统类型">
                            mac
                        </Descriptions.Item>
                        <Descriptions.Item label="资产价值" key="资产价值">
                            42
                        </Descriptions.Item>
                        <Descriptions.Item label="资产所属部门" key="资产所属部门">
                            $80.00
                        </Descriptions.Item>
                        <Descriptions.Item label="资产负责人" key="资产负责人">
                            $20.00
                        </Descriptions.Item>
                        <Descriptions.Item label="负责人电话" key="负责人电话">
                            $60.00
                        </Descriptions.Item>
                        <Descriptions.Item span={3} key="更多详情">
                            更多详情
                        </Descriptions.Item>
                    </Descriptions>,
                    <Button key="console" onClick={() => history.push('/project/assets')}>
                        返回资产列表
                    </Button>,
                    <Button
                        key="buy"
                        type="primary"
                        onClick={() => history.push('/project/assets/computingdevice')}
                    >
                        继续新增资产
                    </Button>,
                ]}
            />
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

export default compose(withConnect, memo)(WebsiteStep4Page);
