import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, DatePicker, Radio, Checkbox } from 'antd';
import {
    TYPE_INPUT,
    TYPE_TEXTAREA,
    TYPE_SELECT,
    TYPE_MULTIPLE_SELECT,
    TYPE_SEARCH_SELECT,
    // TYPE_CHECKBOX,
    TYPE_CHECKBOX_GROUP,
    TYPE_RADIO,
    TYPE_DATEPICKER,
    TYPE_DATEPICKERTIME,
    TYPE_RANGEPICKER,
} from './utils';

const { TextArea } = Input;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const { RangePicker } = DatePicker;

const renderType = (type, label, options, placeholder) => {
    switch (type) {
        case TYPE_INPUT:
            return <Input placeholder={placeholder} />;
        case TYPE_TEXTAREA:
            return <TextArea placeholder={placeholder} rows={4} />;
        case TYPE_SELECT:
            return (
                <Select placeholder={placeholder} width="100%">
                    {options.map((item) => (
                        <Option key={item.value} value={item.value}>
                            {item.text}
                        </Option>
                    ))}
                </Select>
            );
        case TYPE_MULTIPLE_SELECT:
            return (
                <Select mode="multiple" placeholder={placeholder} width="100%">
                    {options.map((item) => (
                        <Option key={item.value} value={item.value}>
                            {item.text}
                        </Option>
                    ))}
                </Select>
            );
        // 搜索下拉 见下判断
        // next
        case TYPE_CHECKBOX_GROUP:
            return (
                <Checkbox.Group style={{ width: '100%' }}>
                    {options.map((item) => (
                        <Checkbox key={item.value} value={item.value}>
                            {item.text}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            );
        case TYPE_RADIO:
            return (
                <Radio.Group>
                    {options.map((item) => (
                        <Radio key={item.value} value={item.value}>
                            {item.text}
                        </Radio>
                    ))}
                </Radio.Group>
            );
        case TYPE_DATEPICKER:
            return (
                <DatePicker
                    style={{ width: '100%' }}
                    format={dateFormat}
                    placeholder={placeholder}
                />
            );
        case TYPE_DATEPICKERTIME:
            return (
                <DatePicker
                    showTime
                    style={{ width: '100%' }}
                    format={dateTimeFormat}
                    placeholder={placeholder}
                />
            );
        case TYPE_RANGEPICKER:
            return <RangePicker style={{ width: '100%' }} placeholder={placeholder} />;
        default:
            return <Input placeholder={placeholder} />;
    }
};

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

const FormItem = (props) => {
    // 搜索下拉框
    const [value, setValue] = useState();
    const [data, setData] = useState([]);
    const handleSearch = (val) => {
        if (val) {
            fetch(props.fetchFunc, val, (res) => setData([...res]));
        } else {
            setData([]);
        }
    };

    const handleChange = (val) => {
        setValue(val);
    };

    const options = data.map((d) => <Option key={d.value}>{d.name}</Option>);

    if (props.type === TYPE_SEARCH_SELECT) {
        return (
            <Form.Item
                label={props.label}
                name={props.name}
                rules={props.rules}
                wrapperCol={props.wrapperCol}
                labelCol={props.labelCol}
            >
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
            </Form.Item>
        );
    }
    return (
        <Form.Item
            label={props.label}
            name={props.name}
            rules={props.rules}
            wrapperCol={props.wrapperCol}
            labelCol={props.labelCol}
        >
            {renderType(props.type, props.label, props.options, props.placeholder)}
        </Form.Item>
    );
};

FormItem.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    options: PropTypes.array,
    rules: PropTypes.array,
    wrapperCol: PropTypes.object,
    labelCol: PropTypes.object,
    fetchFunc: PropTypes.func,
};

export default FormItem;
