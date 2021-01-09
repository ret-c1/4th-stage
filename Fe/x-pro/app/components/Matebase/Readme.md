## `ckeditor` 编辑器

#### `props`

- `id` `metabaseID`

- `starttime` 起始时间默认前一天

- `endtime` 结束时间默认当前日期

- `height` 高度

#### 用法

```
···    
// 日期区间段选择
const [dateRange, setDateRange] = useState({
    starttime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    endtime: moment(new Date()).format('YYYY-MM-DD'),
});
const handleSelectDateRange = (date) => {
    if (Array.isArray(date)) {
        setDateRange({
            ...dateRange,
            starttime: date[0],
            endtime: date[1],
        });
        setTableParams1({
            ...tableParams1,
            param: {
                type: 1,
                startSubmitTime: date[0],
                endSubmitTime: date[1],
            },
        });
        setTableParams2({
            ...tableParams2,
            param: {
                type: 2,
                startSubmitTime: date[0],
                endSubmitTime: date[1],
            },
        });
    } else {
        setDateRange({
            ...dateRange,
            starttime: date,
        });
        setTableParams1({
            ...tableParams1,
            param: {
                type: 1,
                startSubmitTime: new Date(date),
                endSubmitTime: moment.now(),
            },
        });
        setTableParams2({
            ...tableParams2,
            param: {
                type: 2,
                startSubmitTime: new Date(date),
                endSubmitTime: moment.now(),
            },
        });
    }
};

// 调用组建

<SelectDateRange handleChange={handleSelectDateRange} />
<Matebase
    id={7}
    starttime={dateRange.starttime}
    endtime={dateRange.endtime}
    height={900}
/>
```
