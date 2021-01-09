import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { Radio, Row, DatePicker } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

const ScRadio = styled(Radio.Group)`
    label {
        border: 0 !important;
        padding: 0 !important;
        margin: 0 15px !important;
        background: transparent !important;
        ::selection {
            background: none !important;
        }
    }
    label:before {
        width: 0 !important;
        border: 0 !important;
    }
`;

const SelectDateRange = (props) => {
    const { handleChange = () => {} } = props;
    const onChange = (e) => {
        const val = e.target.value;
        let date = '';
        if (val === '1') {
            date = moment().subtract(1, 'days').format('YYYY-MM-DD');
        }
        if (val === '3') {
            date = moment().subtract(2, 'days').format('YYYY-MM-DD');
        }
        if (val === '7') {
            date = moment().subtract(6, 'days').format('YYYY-MM-DD');
        }
        handleChange(date);
    };

    const onRangeChange = (value, dateString) => {
        console.log(value);
        handleChange(dateString);
    };

    return (
        <Row justify="end">
            <ScRadio defaultValue="1" onChange={onChange}>
                <Radio.Button value="1">24小时</Radio.Button>
                <Radio.Button value="3">3天</Radio.Button>
                <Radio.Button value="7">近一周</Radio.Button>
                <Radio.Button value="0">
                    <RangePicker onChange={onRangeChange} />
                </Radio.Button>
            </ScRadio>
        </Row>
    );
};

SelectDateRange.propTypes = {
    handleChange: PropTypes.func,
};

export default SelectDateRange;
