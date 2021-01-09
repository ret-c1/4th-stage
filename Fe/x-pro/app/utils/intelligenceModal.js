import { Modal } from 'antd';
let flag = 0;
const intelligenceModal = () => {
    const secondsToGo = 5;
    let modal;
    if (flag === 0) {
        modal = Modal.warning({
            title: '安全运营情报管理平台通知！！！',
            content:
                '可信度非100%、同时明确“仅对内”的情报严禁直接截图外发，如果需要跟友商交换情报或同步给客户，请自行做文字编辑和描述再发，不能带客户单位信息。',
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }
    flag += 1;
};

export default intelligenceModal;
