import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { ScContent } from '../styled';

const PublicCaseImportDonePage = () => {
    const history = useHistory();
    return (
        <>
            <ScContent style={{ paddingTop: '80px' }}>
                <Result
                    status="error"
                    title="应急案例导入失败"
                    subTitle="这是导入失败的具体原因，需要给出具体的排查/操作建议。"
                    extra={[
                        <Button
                            type="primary"
                            key="console"
                            onClick={() => history.push('/incident/publiccase/import')}
                        >
                            重新导入
                        </Button>,
                        <Button key="buy" onClick={() => history.push('/incident/publiccase')}>
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
