import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { Steps, Button, PageHeader, Form } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { ScFooterToolbar, ScCard, ScSteps } from '../../styled';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
// import { addAsset } from './api';
const { Step } = Steps;

const ComputingDevicePage = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [isSubmit, changeIsSubmit] = useState(false);
    const [currentStep, changeStep] = useState(0);
    // 前两个的数据
    const [formDataStep1, setFormDataStep1] = useState({});
    const [formDataStep2, setFormDataStep2] = useState({});
    const changePage = (type) => {
        if (type === 'back') {
            if (currentStep === 0) {
                history.push('/project/assets');
            } else {
                changeStep(currentStep - 1);
            }
        } else {
            changeStep(currentStep + 1);
        }
    };
    const onFinish = (values) => {
        switch (currentStep) {
            case 0:
                setFormDataStep1(values);
                break;
            case 1:
                setFormDataStep2(values);
                break;
            default:
                break;
        }
        if (isSubmit) {
            const formDataStep3 = values;
            const formData = {
                businessType: 2, //  资产业务类型 1网站 2主机 3数据库 4软件 5网络设备 6代码
                name: formDataStep1.name, // 资产名称
                sn: formDataStep1.name, // 设备编号
                businessSystemIds: formDataStep1.businessSystemIds, // 业务系统id列表
                projectId: 549,
                personId: formDataStep3.personId, // 责任人id
                organizationId: formDataStep3.organizationId, // 责任部门id
                ...formDataStep2,
                computingDevice: {
                    address: formDataStep3.address, // 物理部署位置
                    region: formDataStep3.region, // 逻辑部署位置
                    intranetIp: formDataStep3.intranetIp, // 内网IP
                    intranetManagePort: formDataStep3.intranetManagePort, // 内网端口
                    internetIp: formDataStep3.internetIp, // 互联网IP
                    internetManagePort: formDataStep3.internetManagePort, // 互联网端口
                    ports: formDataStep3.ports, // 主要开放端口
                    product: formDataStep1.product, // 操作系统类型
                    version: formDataStep1.version, // 操作系统版本
                    antivirus: formDataStep1.antivirus, // 是否安装杀毒软件 0未安装 1安装
                    managerType: formDataStep1.managerType, // 远程管理方式
                    description: formDataStep1.description, // 服务器业务功能描述
                    remark: formDataStep1.remark, // 备注
                    status: formDataStep1.status, // 资产状态
                },
            };
            console.log(formData);
            // addAsset(formData).then((res) => {
            //     console.log(res);
            // });
        }
        changePage('go');
    };

    return (
        <>
            <PageHeader ghost={false} title="新增主机资产">
                <ScSteps>
                    <Steps current={currentStep}>
                        <Step title="主机信息" />
                        <Step title="安全属性信息" />
                        <Step title="责任人及位置信息" />
                        <Step title="完成" />
                    </Steps>
                </ScSteps>
            </PageHeader>
            <Form form={form} name="stepForm" onFinish={onFinish}>
                <ScCard>
                    <div style={{ width: '70%', margin: '0 auto' }}>
                        {currentStep === 0 && <Step1 />}
                        {currentStep === 1 && <Step2 />}
                        {currentStep === 2 && <Step3 />}
                        {currentStep === 3 && <Step4 />}
                    </div>
                </ScCard>
                {currentStep !== 3 && (
                    <ScFooterToolbar>
                        <div style={{ float: 'right', marginTop: '10px' }}>
                            <Button
                                style={{ marginRight: '10px' }}
                                onClick={() => changePage('back')}
                            >
                                取消
                            </Button>
                            {currentStep === 2 ? (
                                <Button
                                    type="primary"
                                    style={{ marginRight: '10px' }}
                                    htmlType="submit"
                                    onClick={() => changeIsSubmit(true)}
                                >
                                    提交
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    style={{ marginRight: '10px' }}
                                    htmlType="submit"
                                    onClick={() => changeIsSubmit(false)}
                                >
                                    下一步
                                </Button>
                            )}
                        </div>
                    </ScFooterToolbar>
                )}
            </Form>
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

export default compose(withConnect, memo)(ComputingDevicePage);
