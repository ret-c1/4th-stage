import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const { Option } = Select;

let timeout;
let currentValue;

const fetch = (api, value, callback) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    const param = {
        name: currentValue,
    };
    const fake = () => {
        api(param).then((res) => {
            if (res.code === 200 && currentValue === value) {
                const { data } = res;
                callback(data);
            }
        });
    };
    timeout = setTimeout(fake, 300);
};

const SearchInput = (props) => {
    const { api, form, name, needValue } = props;
    const [value, setValue] = useState();
    const [data, setData] = useState([]);
    const handleSearch = (val) => {
        if (val) {
            fetch(api, val, (res) => setData([...res]));
        } else {
            setData([]);
        }
    };

    const handleChange = (val) => {
        form.setFieldsValue({ [name]: val });
        setValue(val);
    };

    const options = data.map((d) => (
        <Option key={d.value} value={needValue === 'name' ? d.name : d.value}>
            {d.name}
        </Option>
    ));
    return (
        <Select
            showSearch
            value={value}
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
};

SearchInput.propTypes = {
    name: PropTypes.string,
    api: PropTypes.func,
    form: PropTypes.object,
    needValue: PropTypes.string,
};

export default SearchInput;
