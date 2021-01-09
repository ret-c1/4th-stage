export const menuArray = () => [
    {
        title: '项目概览',
        link: `/project/dashboad${window.location.search}`,
    },
    {
        title: '任务排期',
        link: `/project/task${window.location.search}`,
    },
    // {
    //     title: '资产管理',
    //     link: '/assets',
    // },
    // {
    //     title: '漏洞列表',
    //     link: `/project/vul${window.location.search}`,
    // },
    // {
    //     title: '报告列表',
    //     link: `/project/report${window.location.search}`,
    // },
    {
        title: '工时信息',
        link: `/project/work${window.location.search}`,
    },
];
