import { useState, useEffect } from 'react';

/**
 * 可选择Table
 * @param {*} rxChecked 选中的列表数组
 * @param {*} rxTabelcheck 单个选择方法
 * @param {*} rxTabelcheckall 全选方法
 */
export default function useTableSelect(
    rxChecked,
    rxTabelcheck,
    // rxTabelcheckall
) {
    const [selectedRowKeys, setSelectedRowKeys] = useState(rxChecked);
    const [selectRows, setSelectRows] = useState([]);

    useEffect(() => {
        setSelectedRowKeys(rxChecked);
    }, [rxChecked]);

    const onSelectChange = (value, newSelectRows) => {
        setSelectRows(newSelectRows);
        rxTabelcheck(value);
        // setSelectedRowKeys(value);
    };
    const onSelectAll = (selected, selectedRows, changeRows) => {
        setSelectRows([...selectRows, ...changeRows]);
        // const rowKeys = selectedRows.map((item) => item.id);
        // rxTabelcheckall(rowKeys);
        // setSelectedRowKeys(rowKeys);
    };
    const onSelectInvert = (selectedRows) => {
        selectedRows.forEach((item) => {
            selectRows.filter((list) => list.id !== item.id);
        });
    };
    // 返回rowSelection
    return {
        selectedRowKeys,
        selectRows,
        onChange: onSelectChange,
        onSelectAll,
        onSelectInvert,
    };
}
