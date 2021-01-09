import React from 'react';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ScRWrapper = styled.div`
    margin: 21px 24px 16px 24px;
    background: #fff;
    height: 100%;
    min-height: 550px;
    box-sizing: border-box;
    padding-top: 96px;
`;

const Step4 = (props) => {
    const history = useHistory();
    const { id, reportId } = props;
    return (
        <ScRWrapper>
            <Result
                status="success"
                title="提交成功"
                extra={[
                    <Button
                        key="check"
                        onClick={() => {
                            history.push(`/incident/report?id=${id}&repordId=${reportId}`);
                        }}
                    >
                        查看报告
                    </Button>,
                    <Button
                        key="continue"
                        type="primary"
                        onClick={() => {
                            history.push('/incident');
                        }}
                    >
                        继续处置
                    </Button>,
                ]}
            />
        </ScRWrapper>
    );
};

Step4.propTypes = {
    id: PropTypes.string,
    reportId: PropTypes.number,
};

export default Step4;
