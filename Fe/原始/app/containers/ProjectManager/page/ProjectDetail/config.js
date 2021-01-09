import assetBackground from '../assets/background-02.png';
import taskBackground from '../assets/background-01.png';
import reportBackground from '../assets/background-03.png';
// import levelBackground from '../assets/background-04.png';
import workBackground from '../assets/background-05.png';
import taskIcon from '../assets/icon-01.png';
import assetIcon from '../assets/icon-05.png';

export const renderlist = (data) => [
    {
        key: '',
        title: '仪表盘',
        background: taskBackground,
        icon: taskIcon,
        href: `/project/dashboad?id=${data.id}&name=${data.clientName}`,
    },
    {
        key: '',
        title: '资产管理',
        background: assetBackground,
        icon: taskIcon,
        href: `/project/AssetsManage?id=${data.id}&name=${data.clientName}`,
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
    {
        key: '',
        title: '工作量分析',
        background: workBackground,
        icon: assetIcon,
        href: `/project/workanalysis?id=${data.id}&&name=${data.clientName}`,
    },
    {
        key: '',
        title: '安全配置策略变更',
        background: reportBackground,
        icon: taskIcon,
        href: `/project/securitypolicy?id=${data.id}&name=${data.clientName}`,
    },
    {
        key: '',
        title: '安全设备升级更新记录',
        background: taskBackground,
        icon: assetIcon,
        href: `/project/saferecord?id=${data.id}&name=${data.clientName}`,
    },
];
