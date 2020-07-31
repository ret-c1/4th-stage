import wx from 'wx';
import dd from 'dd';
import { wxSignature, ddSignature } from '@services/api';

export const isWX = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
};

const wxStage = isWX();
const ddStage = dd.env.platform !== 'notInDingTalk';

// 微信签名
export const signature = async () => {
    const param = {
        url: encodeURIComponent(window.location.href.split('#')[0]),
    };
    if (wxStage) {
        wxSignature(param)
            .then((res) => {
                if (res && res.code === 200)
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx79270db229525417', // 必填，公众号的唯一标识
                        timestamp: res.v.signature.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.v.signature.noncestr, // 必填，生成签名的随机串
                        signature: res.v.signature.sign, // 必填，签名
                        jsApiList: [
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline',
                            'updateTimelineShareData',
                            'updateAppMessageShareData',
                            'scanQRCode',
                            'previewImage',
                        ], // 必填，需要使用的JS接口列表
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    if (ddStage) {
        ddSignature()
            .then((res) => {
                dd.config({
                    agentId: '', // 必填，微应用ID
                    corpId: '', // 必填，企业ID
                    timeStamp: res.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature, // 必填，签名
                    jsApiList: [], // 必填，需要使用的jsapi列表，注意：不要带dd。
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

// 分享朋友圈
export const updateAppShare = ({ title, desc, link, imgUrl }) => {
    wx.ready(() => {
        wx.onMenuShareTimeline({
            title, // 分享标题
            desc,
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            success: () => {
                console.log('success');
            },
        });
    });
};

// 分享朋友
export const updateTimelineShare = ({ title, desc, link, imgUrl }) => {
    wx.ready(() => {
        wx.onMenuShareAppMessage({
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            success: () => {
                console.log('success');
            },
        });
    });
};

// dd分享
export const ddShare = ({ title, desc, link, imgUrl }) => {
    dd.biz.navigation.setRight({
        show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
        control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
        showIcon: true, // 是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
        onSuccess: () => {
            dd.biz.util.share({
                type: 0, // 分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
                url: link,
                title,
                content: desc,
                image: imgUrl,
                onSuccess: () => {
                    // onSuccess将在调起分享组件成功之后回调
                },
                onFail: (err) => {
                    console.log(err);
                },
            });
        },
    });
};

// 对外暴露分享
export const selectShare = (shareData) => {
    if (wxStage) {
        updateAppShare(shareData);
        updateTimelineShare(shareData);
    }
    if (ddStage) {
        ddShare(shareData);
    }
};

// 预览图片
export const previewImage = (current, list) => {
    if (wxStage) {
        wx.previewImage({
            current, // 当前显示图片的http链接
            urls: list, // 需要预览的图片http链接列表
        });
    }
    if (ddStage) {
        dd.biz.util.previewImage({
            urls: list, // 图片地址列表
            current, // 当前显示的图片链接
            onSuccess: () => {
                /**/
            },
            onFail: () => {},
        });
    }
};

// 获取位置
export const getLocation = () => {
    const promise = new Promise((resolve, reject) => {
        if (wxStage) {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: (res) => {
                    // const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    // const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    // const speed = res.speed; // 速度，以米/每秒计
                    // const accuracy = res.accuracy; // 位置精度
                    resolve(res);
                },
                cancel: (err) => {
                    // 用户拒绝定位
                    reject(err);
                },
            });
        }
        if (ddStage) {
            dd.device.geolocation.get({
                targetAccuracy: Number,
                coordinate: Number,
                withReGeocode: Boolean,
                useCache: true, // 默认是true，如果需要频繁获取地理位置，请设置false
                onSuccess: (res) => {
                    // https://open-doc.dingtalk.com/microapp/dev/ed7zyv#a-namenlw2dza%E8%8E%B7%E5%8F%96%E5%BD%93%E5%89%8D%E5%9C%B0%E7%90%86%E4%BD%8D%E7%BD%AE%E5%8D%95%E6%AC%A1%E5%AE%9A%E4%BD%8D
                    resolve(res);
                },
                onFail: (err) => {
                    // 用户拒绝定位
                    reject(err);
                },
            });
        }
    });
    return promise;
};

// 扫一扫
export const scanQRCode = () => {
    const promise = new Promise((resolve, reject) => {
        if (wxStage) {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: (res) => {
                    const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    resolve(result);
                },
                fail: (err) => {
                    reject(err);
                },
            });
        }
        if (ddStage) {
            dd.biz.util.scan({
                type: String, // type 为 all、qrCode、barCode，默认是all。
                onSuccess: (res) => {
                    resolve(res);
                },
                onFail: (err) => {
                    reject(err);
                },
            });
        }
    });
    return promise;
};
