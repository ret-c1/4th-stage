import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Form } from 'antd';
import { compose } from 'redux';
import FormItem from '@components/FormItem';
// // 引入初始化数据结构方法 - 非必须
// import { renderFromData } from '@components/FormItem/utils';
// 引入当前组件表单配置项
import { basicFormconfigStep1 } from './config';
const NetworkStep1Page = () => {
    console.log('asdsad');
    return (
        <>
            {basicFormconfigStep1.map((item) => (
                <FormItem
                    key={item.label}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                    options={item.options}
                    placeholder={item.placeholder}
                    rules={item.rules}
                />
            ))}
        </>
    );
};

// ComputingDeviceStep1Page.propTypes = {
//     getFormStatus: PropTypes.func,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(NetworkStep1Page);
