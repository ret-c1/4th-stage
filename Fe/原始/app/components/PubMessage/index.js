import { message } from 'antd';

const PubMessage = (type, info) => {
    switch (type) {
        case 'success':
            message.success(info);
            break;
        case 'error':
            message.error(info);
            break;
        case 'warning':
            message.warning(info);
            break;
        default:
            message.success(info);
    }
};

export default PubMessage;
