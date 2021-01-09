import { useState, useEffect } from 'react';

/**
 * 可选择Table
 * @param {*} rxChecked 选中的列表数组
 * @param {*} rxTabelcheck 单个选择方法
 * @param {*} rxTabelcheckall 全选方法
 */
export default function useTableSelect(rxChecked, rxTabelcheck, rxTabelcheckall) {
    const [selectedRowKeys, setSelectedRowKeys] = useState(rxChecked);
    const [selectRows, setSelectRows] = useState([]);
    useEffect(() => {
        // 把id作为key时的情况
        const rowKeys = rxChecked.map((item) => item.id);
        setSelectedRowKeys(rowKeys);
        setSelectRows(rxChecked);
    }, [rxChecked]);
    const onSelectChange = (value, selectedRows) => {
        // setSelectRows();
        rxTabelcheck(selectedRows);
    };
    const onSelectAll = (selected, selectedRows) => {
        // setSelectRows(selectedRows);
        // const rowKeys = selectedRows.map((item) => item.id);
        rxTabelcheckall(selectedRows);
    };
    // 返回rowSelection
    return {
        selectedRowKeys,
        selectRows,
        onChange: onSelectChange,
        onSelectAll,
    };
}
