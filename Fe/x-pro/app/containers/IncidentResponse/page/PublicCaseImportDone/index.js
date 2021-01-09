import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { ScContent } from '../styled';

const PublicCaseImportDonePage = () => {
    const history = useHistory();
    const { location } = history;
    const [source] = useState(`${location.state.source}`);
    return (
        <>
            <ScContent style={{ paddingTop: '80px' }}>
                <Result
                    status="success"
                    title="应急案例导入成功"
                    subTitle="可通过下方“查看案例”按钮预览案例内容，返回列表后可通过“我的案例-查看”按钮预览案例内容。"
                    extra={[
                        <Button
                            type="primary"
                            key="console"
                            onClick={() => {
                                history.push({
                                    pathname: '/incident/publiccase/detail',
                                    state: {
                                        id: history.location.state.id || 0,
                                        source,
                                    },
                                });
                            }}
                        >
                            查看案例
                        </Button>,
                        <Button
                            key="buy"
                            onClick={() => {
                                history.push('/incident/publiccase');
                            }}
                        >
                            返回列表
                        </Button>,
                    ]}
                    style={{ height: '70vh' }}
                />
            </ScContent>
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

export default compose(withConnect, memo)(PublicCaseImportDonePage);
