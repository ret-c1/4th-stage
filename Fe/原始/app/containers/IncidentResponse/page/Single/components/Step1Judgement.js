import React from 'react';
import { Descriptions, Tag } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ScCustomDescriptions = styled(Descriptions)`
    & th {
        width: 104px;
    }
`;

const Step1Judgement = (props) => {
    const { info } = props;
    let result = '';
    switch (info.result) {
        case 0:
            result = '有效事件';
            break;
        case 1:
            result = '隐患事件';
            break;
        case 2:
            result = '无效事件';
            break;
        default:
            result = '暂无';
            break;
    }
    return (
        <ScCustomDescriptions bordered column={1}>
            <Descriptions.Item label="事件研判" key={1}>
                <Tag color="error">{result}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="结论" key={2}>
                {info.conclusion}
            </Descriptions.Item>
            <Descriptions.Item label="分析结果" key={3}>
                {info.suggestion}
            </Descriptions.Item>
        </ScCustomDescriptions>
    );
};
Step1Judgement.propTypes = {
    info: PropTypes.object,
};

export default Step1Judgement;
