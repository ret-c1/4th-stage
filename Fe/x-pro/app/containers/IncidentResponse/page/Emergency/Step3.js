import React from 'react';
import { InfoCircleFilled } from '@ant-design/icons';
// import { Select } from 'antd';
import PropTypes from 'prop-types';
import { ScTipWrapper, ScAssessPerson } from './styled';
import ReportInfo from '../../components/ReportInfo';

const Step3 = (props) => {
    const { info, manager } = props;
    return (
        <div style={{ marginBottom: '56px' }}>
            <div style={{ background: '#fff', paddingTop: '16px' }}>
                <ScTipWrapper>
                    <p style={{ marginBottom: '0px' }}>
                        <InfoCircleFilled
                            style={{
                                color: '#1890FF',
                                marginRight: '8px',
                                verticalAlign: 'middle',
                            }}
                        />
                        <span>
                            以下为本次应急报告信息，请确认报告内容和报告评审人无误后点击提交。
                        </span>
                    </p>
                </ScTipWrapper>
                <ReportInfo info={info} />
            </div>
            <ScAssessPerson>
                <span>报告评审人：</span>
                <span style={{ marginLeft: '10px' }}>{manager}</span>
            </ScAssessPerson>
        </div>
    );
};

Step3.propTypes = {
    info: PropTypes.object,
    manager: PropTypes.string,
};

export default Step3;
