import { authAction } from '@utils/authority';
// img url替换token
const replaceToken = (html) => {
    console.log(html);
    const res = html ? html.replace(/\?token=[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/,`?token=${authAction.get()}`) : '<p />';  // eslint-disable-line
    return res;
};

export default replaceToken;
