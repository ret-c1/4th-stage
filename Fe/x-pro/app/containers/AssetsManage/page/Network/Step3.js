import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { Form } from 'antd';
import FormItem from '@components/FormItem';
import { FormItemSpace } from '../../styled';
import { basicFormconfigStep3 } from './config';

const NetworkStep3Page = () => {
    console.log('asdsad');
    return (
        <>
            {basicFormconfigStep3.map((item) => {
                if (item.name === 'intranetIp') {
                    return (
                        <FormItemSpace key={item.label}>
                            <FormItem
                                label={item.label}
                                name={item.name}
                                type={item.type}
                                options={item.options}
                                placeholder={item.placeholder}
                                rules={item.rules}
                                labelCol={item.labelCol}
                                wrapperCol={item.wrapperCol}
                            />
                        </FormItemSpace>
                    );
                }
                return (
                    <FormItem
                        key={item.label}
                        label={item.label}
                        name={item.name}
                        type={item.type}
                        options={item.options}
                        placeholder={item.placeholder}
                        rules={item.rules}
                        labelCol={item.labelCol}
                        wrapperCol={item.wrapperCol}
                    />
                );
            })}
        </>
    );
};

// ComputingDeviceStep3Page.propTypes = {
//     getFormStatus: PropTypes.func,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(NetworkStep3Page);
