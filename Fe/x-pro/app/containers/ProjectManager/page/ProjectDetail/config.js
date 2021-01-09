import assetBackground from '../assets/background-02.png';
import taskBackground from '../assets/background-01.png';
import reportBackground from '../assets/background-03.png';
// import levelBackground from '../assets/background-04.png';
import workBackground from '../assets/background-05.png';
import taskIcon from '../assets/icon-01.png';
import assetIcon from '../assets/icon-05.png';
const config = (data) => [
    {
        key: '',
        title: '工作量分析',
        background: workBackground,
        icon: assetIcon,
        href: `/project/workanalysis?id=${data.id}&&name=${data.clientName}`,
    },
    {
        key: '',
        title: '资产管理',
        background: assetBackground,
        icon: taskIcon,
        href: `/project/assets?id=${data.id}&name=${data.clientName}`,
    },
    {
        key: '',
        title: '工作计划',
        background: taskBackground,
        icon: assetIcon,
        href: `/project/task?id=${data.id}`,
    },
    {
        key: '',
        title: '项目报告',
        background: reportBackground,
        icon: taskIcon,
        href: `/project/reportlist?id=${data.id}&name=${data.clientName}`,
    },
];

export const renderlist = (data) => {
    const newConfig = config(data);
    return newConfig;
};
