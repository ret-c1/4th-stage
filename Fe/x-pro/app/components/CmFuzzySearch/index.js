import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
// import { getEmployee } from './api';
const { Option } = Select;

// let timeout;
// let currentValue;

// const fetch = (api, value, callback) => {
//     if (timeout) {
//         clearTimeout(timeout);
//         timeout = null;
//     }
//     currentValue = value;
//     const param = {
//         name: currentValue,
//     };
//     const fake = () => {
//         api(param).then((res) => {
//             if (res.code === 200 && currentValue === value) {
//                 const { data } = res;
//                 callback(data);
//             }
//         });
//     };
//     timeout = setTimeout(fake, 300);
// };

const CmFuzzySearch = (props) => {
    const { form, name, showValue, showLabel } = props;
    const [data, setData] = useState([]);
    const handleSearch = (val) => {
        if (val) {
            setMomValue(null);
            // fetch(getEmployee, val, (res) => setData([...res]));
        } else {
            setData([]);
        }
    };

    const handleChange = (val) => {
        form.setFieldsValue({ [name]: val });
    };

    const options = data.map((d) => <Option key={d.value}>{d.name}</Option>);

    const [momValue, setMomValue] = useState(showValue);
    if (momValue === null) {
        return (
            <Select
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
        );
    }
    return (
        <Select
            showSearch
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            optionLabelProp="label"
            defaultValue={[showLabel]}
        >
            <Option value={showLabel} label={showLabel} />
        </Select>
    );
};

CmFuzzySearch.propTypes = {
    name: PropTypes.string,
    form: PropTypes.object,
    showValue: PropTypes.string,
    showLabel: PropTypes.string,
};

export default CmFuzzySearch;
