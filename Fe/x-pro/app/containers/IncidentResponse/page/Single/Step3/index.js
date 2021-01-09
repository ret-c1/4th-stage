import React, { useState } from 'react';
import { Form, Steps, Button } from 'antd';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import EmergencyCheckLists from '@containers/IncidentResponse/components/EmergencyCheckLists';
import { steps } from '../config';
import { ScStepWrapper, ScEmergencySteps, ScItWrapper, ScFooterWrapper } from '../styled';
import { formAction } from '../utils';
// import { createEmergency } from '../../api';

const { Step } = Steps;

const cleanID = (res) => {
    const arr = [];
    res.forEach((list, idx) => {
        arr.push({
            ...list,
        });
        delete arr[idx].id;
        list.data.forEach((item, i) => {
            delete arr[idx].data[i].id;
        });
    });

    return arr;
};

const SingleStep3Page = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const action = formAction.get(); // 获取localstroage的表单
    let step3 = [];
    if (action && action.step3) {
        step3 = action.step3;
    }
    const arr = step3.checkLists || [];
    const [formdata] = useState([...arr]);
    const handleFinish = (fieldsValue) => {
        // history.push('/incident/single/step3');
        const from = {
            ...action,
            step3: {
                checkLists: cleanID(fieldsValue.checkLists || formdata),
            },
        };
        formAction.set(from);
        create();
    };

    const create = debounce(() => {
        const params = {
            ...formAction.get().step1,
            ...formAction.get().step2,
            ...formAction.get().step3,
        };
        console.log(params);
        // createEmergency(params).then((res) => {
        //     if (res.code === 200) {
        //         formAction.remove();
        //         history.push('/incident/single/step4');
        //     }
        // });
    }, 1000);

    return (
        <>
            <ScStepWrapper>
                <ScEmergencySteps current={2} style={{ width: '70%', margin: '20px auto' }}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </ScEmergencySteps>
            </ScStepWrapper>
            <ScItWrapper>
                <Form form={form} name="basicInfo" onFinish={handleFinish}>
                    <Form.Item name="checkLists">
                        <EmergencyCheckLists
                            checkLists={{
                                checklistDTOS: formdata,
                            }}
                            isNeedEdit
                            form={form}
                        />
                    </Form.Item>
                    <ScFooterWrapper>
                        <div className="steps-action" style={{ float: 'right' }}>
                            <Button
                                onClick={() => {
                                    history.push('/incident/event');
                                }}
                            >
                                取消
                            </Button>
                            <Button
                                onClick={() => {
                                    history.push('/incident/single/step2');
                                }}
                                style={{ marginLeft: 8 }}
                            >
                                保存并返回上一步
                            </Button>
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                                提交
                            </Button>
                        </div>
                    </ScFooterWrapper>
                </Form>
            </ScItWrapper>
        </>
    );
};

SingleStep3Page.propTypes = {
    // // id: PropTypes.string,
    // info: PropTypes.object,
    // formInfoRef: PropTypes.object,
};

export default SingleStep3Page;
