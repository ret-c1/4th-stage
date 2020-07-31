// 签到
import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { scanQRCode } from '@utils/signature';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { login, userInfo, meetsign, code, hotelList } from '@services/api';
import PhoneForm from './PhoneForm';
import InfoForm from './InfoForm';
import SelectUse from './SelectUse';
import DialogError from '../SignUp/DialogError';
import {
    setTokenAction,
    setRoleAction,
    setSignTypeAction,
    setCodeStringAction,
    setUserIdAction,
    setHotelIdAction,
} from './action';
import Wrap from './Wrap';
import Logo from './Logo';
import Work from './Work';
import ShowCode from './ShowCode';

const styles = (theme) => ({
    button: {
        margin: 4 * theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    scanbutton: {
        marginBottom: '20px',
        width: '100%',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    selectLabel: {
        color: '#fff',
        top: '-6px',
    },
    ewm: {
        display: 'inline-block',
        marginBottom: '20px',
        marginTop: '-12px',
    },
    button2: {
        border: 'none',
        position: 'absolute',
        top: '20px',
        right: '10px',
    },
});

let timeId = 0;

class CheckIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            phone: '',
            phoneError: false,
            phoneMes: '',
            yzm: '',
            yzmError: false,
            yzmMes: '',
            Dialogerror: false,
            message: '',
            signtypeText: '',
            signtypeError: false,
            img: '',
            infoopen: false,
            MeetingId: '',
            userinfo: null,
            isgift: '是',
            snackopen: false,
            snackmes: '',
            selectUseState: false,
            disabled: false,
            yamData: '获取验证码',
            phoneqd: '',
            infoFormImg: '',
            hotelListarr: [
                {
                    Id: '0',
                    Name: '请选择',
                },
            ],
            hotelValue: '0',
            hotelText: '',
            hotelError: false,
        };
    }

    componentDidMount() {
        this.getUserCode();
    }

    componentDidUpdate() {
        clearTimeout(timeId);
        window.scrollTo(0, 0);
    }

    componentWillMount() {
        clearTimeout(timeId);
    }

    // 获取二维码
    getUserCode = () => {
        const { codeString } = this.props;
        if (codeString !== '') {
            fetch(`/ahopen/invitation_qr?x=${codeString}`, {
                method: 'GET',
                responseType: 'blob',
            })
                .then((res) => res.blob())
                .then((blob) => {
                    this.setState({
                        img: window.URL.createObjectURL(blob),
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    phonechange = (e) => {
        this.setState({
            phone: e.target.value,
        });
    };

    yzmchange = (e) => {
        const val = e.target.value;
        if (val.length > 6) return;
        this.setState({
            yzm: val,
        });
    };

    // 关闭按钮点击
    handleClose = () => {
        this.setState({ open: false });
    };

    // 提交按钮点击
    handleOkClick = () => {
        if (this.phonev() === true && this.yzmv() === true) {
            const { phone, yzm } = this.state;
            const param = {
                phone,
                code: yzm,
            };
            this.pushData(param);
        }
    };

    // 提交的登录信息
    pushData = (param) => {
        login(param).then((res) => {
            if (res && res.code === 200) {
                const { setToken, setRole, setCodeString, setUserId, setHotelId } = this.props;
                setToken(res.v.token);
                setUserId(res.v.accid);
                setHotelId(res.v.hotel_id);
                setCodeString(res.v.field0001);
                if (res.v.isStaffMember === true) {
                    setRole('staff');
                } else {
                    setRole('inviter');
                    this.getUserCode();
                }
                this.setState({ open: false });
            } else if (res && res.code !== 200) {
                this.setState({
                    Dialogerror: true,
                    message: `登录失败!${res.comment}`,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            } else {
                this.setState({
                    Dialogerror: true,
                    message: `登录失败!`,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            }
        });
    };

    // 检验验证码
    yzmv = () => {
        const { yzm } = this.state;
        if (yzm === '') {
            this.setState({
                yzmError: true,
                yzmMes: '验证码不能为空哦!',
            });
            return false;
        }
        if (yzm.length !== 6) {
            this.setState({
                yzmError: true,
                yzmMes: '验证码输入不正确哦!',
            });
            return false;
        }
        this.setState({
            yzmError: false,
            yzmMes: '',
        });
        return true;
    };

    // 检查手机号
    phonev = () => {
        const { phone } = this.state;
        const reg = /^1[3-9]\d{9}$/;
        if (phone === '') {
            this.setState({
                phoneError: true,
                phoneMes: '手机号不能为空哦!',
            });
            return false;
        }
        if (reg.test(phone) === false) {
            this.setState({
                phoneError: true,
                phoneMes: '手机号输入不正确哦!',
            });
            return false;
        }
        this.setState({
            phoneError: false,
            phoneMes: '',
        });
        return true;
    };

    // 扫一扫点击
    scanClick = () => {
        const { signType } = this.props;
        const { hotelValue } = this.state;
        if (signType === 0) {
            this.setState({
                Dialogerror: true,
                message: '请选择签到会场类型',
            });
        }
        if (this.signtypeblur() === false) {
            return;
        }
        if (signType === 2) {
            if (hotelValue === '0') {
                this.setState({
                    Dialogerror: true,
                    message: '请选择酒店名称',
                });
            }
            if (this.hotelnameblur() === false) {
                return;
            }
        }
        scanQRCode().then((res) => {
            this.getUserInfo(res, null);
            this.setState({
                MeetingId: res,
            });
        });
    };

    // 展示搜索框
    showSearchBox = () => {
        const { selectUseState, hotelValue } = this.state;
        const { signType } = this.props;
        if (signType === 0) {
            this.setState({
                Dialogerror: true,
                message: '请选择签到会场类型',
            });
        }
        if (this.signtypeblur() === false) {
            return;
        }
        if (signType === 2) {
            if (hotelValue === '0') {
                this.setState({
                    Dialogerror: true,
                    message: '请选择酒店名称',
                });
            }
            if (this.hotelnameblur() === false) {
                return;
            }
        }
        this.setState({
            selectUseState: !selectUseState,
        });
    };

    // 通过手机号码搜索信息
    searchPhone = (phone) => {
        const reg = /^1[3-9]\d{9}$/;
        if (!reg.test(phone)) return;
        this.getUserInfo(null, phone);
    };

    // 获取访客信息
    getUserInfo = (param, phone) => {
        const { hotelValue } = this.state;
        const { token, setRole, signType } = this.props;
        let data = {
            MeetingId: param,
            phone,
        };
        if (signType === 2) {
            data = {
                MeetingId: param,
                phone,
                HotelId: hotelValue,
            };
        }
        let t = 0;
        if (signType === 3) {
            t = 1;
        }
        userInfo(data, token, t).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    infoopen: true,
                    userinfo: res.v,
                    selectUseState: false,
                });
                if (signType === 1 && res.v.meeting_gift_count - res.v.meeting_gift_issued === 0) {
                    this.setState({
                        isgift: '否',
                    });
                }
                if (signType === 2 && res.v.hotel_gift_count - res.v.hotel_gift_issued === 0) {
                    this.setState({
                        isgift: '否',
                    });
                }
                if (res.v.user.IsStaffMember === true) {
                    this.setState({
                        isgift: '否',
                    });
                }
                this.setState({
                    phoneqd: phone,
                });
                fetch(`/ahopen/invitation_qr?x=${res.v.user.Field0001.String}`, {
                    method: 'GET',
                    responseType: 'blob',
                })
                    .then((resp) => resp.blob())
                    .then((blob) => {
                        this.setState({
                            infoFormImg: window.URL.createObjectURL(blob),
                        });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            } else if (res && res.code === 401) {
                this.setState({
                    Dialogerror: true,
                    message: '登录过期',
                    infoopen: false,
                    selectUseState: false,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
                setRole('no');
            } else if (res) {
                this.setState({
                    Dialogerror: true,
                    message: res.comment,
                    infoopen: false,
                    selectUseState: false,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            } else {
                this.setState({
                    Dialogerror: true,
                    message: '不在受邀名单之内',
                    selectUseState: false,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            }
        });
    };

    DialogClose = () => {
        this.setState({
            Dialogerror: false,
        });
    };

    // 签到类型选择
    signtypeChange = (event) => {
        const { setSignType } = this.props;
        setSignType(event.target.value);
        if (event.target.value === 3) {
            this.setState({
                isgift: '否',
            });
        }
    };

    // 酒店改变
    hotelnameChange = (event) => {
        this.setState({
            hotelValue: event.target.value,
        });
    };

    // 签到类型选择失焦
    signtypeblur = () => {
        const { signType } = this.props;
        if (signType === 0) {
            this.setState({
                signtypeText: '请选择',
                signtypeError: true,
            });
            return false;
        }
        this.setState({
            signtypeText: '',
            signtypeError: false,
        });
        return true;
    };

    infoCloseClick = () => {
        this.setState({
            infoopen: false,
        });
    };

    // 酒店失焦
    hotelnameblur = () => {
        const { hotelValue } = this.state;
        if (hotelValue === '0') {
            this.setState({
                hotelText: '请选择',
                hotelError: true,
            });
            return false;
        }
        this.setState({
            hotelText: '',
            hotelError: false,
        });
        return true;
    };

    infoOkClick = () => {
        const { signType, token } = this.props;
        const { MeetingId, isgift, phoneqd, hotelListarr, hotelValue } = this.state;
        let Gift = false;
        if (isgift === '否') Gift = true;
        let data = {
            SignType: signType,
            MeetingId,
            Gift,
            Phone: phoneqd,
        };
        if (signType === 2) {
            const newA = hotelListarr.filter((v) => v.Id === hotelValue);
            data = {
                SignType: signType,
                MeetingId,
                Gift,
                Phone: phoneqd,
                HotelId: newA[0].Id,
                HotelName: newA[0].Name,
            };
        }
        meetsign(data, token).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    snackopen: true,
                    infoopen: false,
                    snackmes: '签到成功',
                });
                timeId = setTimeout(() => {
                    this.setState({
                        snackopen: false,
                        snackmes: '',
                    });
                }, 1200);
            } else if (res && res.code === 1001) {
                this.setState({
                    Dialogerror: true,
                    message: '已签到，无需重复签到',
                    infoopen: false,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            } else if (res && res.code === 1006) {
                this.setState({
                    Dialogerror: true,
                    message: '大赛嘉宾，不能签到大会或酒店',
                    infoopen: false,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            } else if (res && res.code === 1007) {
                this.setState({
                    Dialogerror: true,
                    message: '大会嘉宾，不能签到大赛',
                    infoopen: false,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            } else if (res && res.code === 401) {
                const { setRole } = this.props;
                this.setState({
                    Dialogerror: true,
                    message: '登录过期',
                    infoopen: false,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
                setRole('no');
            } else if ((res && res.code === 1008) || (res && res.code === 1009)) {
                this.setState({
                    Dialogerror: true,
                    message: '该参会者已在大会或酒店签到,无需重复签到.',
                    infoopen: false,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            } else {
                this.setState({
                    Dialogerror: true,
                    message: '签到失败',
                    infoopen: false,
                });
                timeId = setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            }
        });
    };

    giftChange = (event, value) => {
        this.setState({
            isgift: value,
        });
    };

    // 获取验证码
    getCode = () => {
        const { phone } = this.state;
        this.setState({
            disabled: true,
        });
        const data = {
            phone,
        };
        code(data)
            .then((res) => {
                if (res && res.code !== 200) {
                    this.setState({
                        snackopen: true,
                        // snackmes: `验证码获取失败!${res.comment}`,
                        snackmes: `获取验证码失败!`,
                    });
                    const time = setTimeout(() => {
                        this.setState({
                            snackopen: false,
                            snackmes: '',
                        });
                        clearTimeout(time);
                    }, 1200);
                    this.setState({
                        disabled: false,
                    });
                }
                if (res && res.code === 200) {
                    this.setState({
                        disabled: true,
                        yamData: '120s后重发',
                    });
                    let counter = 120;
                    const t = setInterval(() => {
                        counter -= 1;
                        this.setState({
                            yamData: `${counter}s后重发`,
                        });
                        if (counter === 0) {
                            this.setState({
                                disabled: false,
                                yamData: '获取验证码',
                            });
                            clearInterval(t);
                        }
                    }, 1000);
                }
            })
            .catch(() => {
                this.setState({
                    snackopen: true,
                    // snackmes: `验证码获取失败!${res.comment}`,
                    snackmes: `获取验证码失败!`,
                });
                const time = setTimeout(() => {
                    this.setState({
                        snackopen: false,
                        snackmes: '',
                    });
                    clearTimeout(time);
                }, 1200);
                this.setState({
                    disabled: false,
                });
            });
    };

    handlelogotout = () => {
        const { history } = this.props;
        history.push('/logout');
    };

    render() {
        const { classes, role, signType } = this.props;
        const {
            open,
            phone,
            phoneError,
            phoneMes,
            Dialogerror,
            message,
            signtypeText,
            signtypeError,
            img,
            infoopen,
            userinfo,
            isgift,
            snackopen,
            snackmes,
            selectUseState,
            yzm,
            yzmError,
            yzmMes,
            disabled,
            yamData,
            infoFormImg,
            hotelListarr,
            hotelValue,
            hotelText,
            hotelError,
        } = this.state;
        const wz = { vertical: 'top', horizontal: 'center' };
        // const title = role === 'staff' || role === 'inviter' ? '签到' : '登录';
        let surplus = 0;
        let total = 0;
        if (signType === 1 && userinfo !== null) {
            surplus = userinfo.meeting_gift_count - userinfo.meeting_gift_issued;
            total = userinfo.meeting_gift_count;
        }
        if (signType === 2 && userinfo !== null) {
            surplus = userinfo.hotel_gift_count - userinfo.hotel_gift_issued;
            total = userinfo.hotel_gift_count;
        }
        if (hotelListarr.length <= 1 && signType === 2) {
            hotelList().then((res) => {
                if (res && res.code === 200) {
                    this.setState({
                        hotelListarr: hotelListarr.concat(res.v),
                    });
                }
            });
        }
        return (
            <Wrap full={role}>
                <Logo full={role} />
                <div
                    style={{
                        textAlign: 'center',
                        display: role === 'no' ? '' : 'none',
                    }}
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.handleClickOpen()}
                        className={classes.button}
                        size="large"
                    >
                        登录
                    </Button>
                </div>
                <Work style={{ display: role === 'staff' ? '' : 'none' }}>
                    <TextField
                        id="signtype"
                        select
                        label="签到类型"
                        value={signType}
                        onChange={(e) => this.signtypeChange(e)}
                        SelectProps={{
                            style: {
                                color: signType === 0 ? 'rgba(0, 0, 0, 0.54)' : '',
                                marginBottom: '20px',
                                backgroundColor: '#fff',
                            },
                        }}
                        InputLabelProps={{
                            className: classes.selectLabel,
                        }}
                        helperText={signtypeText}
                        fullWidth
                        margin="normal"
                        required
                        name="signtype"
                        error={signtypeError}
                        onBlur={() => this.signtypeblur()}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="hotel"
                        select
                        label="酒店名称"
                        value={hotelValue}
                        onChange={(e) => this.hotelnameChange(e)}
                        SelectProps={{
                            style: {
                                color: hotelValue === '0' ? 'rgba(0, 0, 0, 0.54)' : '',
                                marginBottom: '20px',
                                backgroundColor: '#fff',
                            },
                        }}
                        InputLabelProps={{
                            className: classes.selectLabel,
                        }}
                        helperText={hotelText}
                        fullWidth
                        margin="normal"
                        required
                        name="hotel"
                        error={hotelError}
                        onBlur={() => this.hotelnameblur()}
                        style={{ display: signType === 2 ? '' : 'none' }}
                    >
                        {hotelListarr.map((option) => (
                            <MenuItem key={option.Id} value={option.Id}>
                                {option.Name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={this.scanClick}
                        className={classes.scanbutton}
                    >
                        扫一扫
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={this.showSearchBox}
                        className={classes.scanbutton}
                    >
                        没有二维码？点我
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.handlelogotout()}
                        className={classes.button2}
                        size="large"
                    >
                        登出
                    </Button>
                </Work>
                {/* <div
                    style={{
                        textAlign: 'center',
                        display: role === 'inviter' ? '' : 'none',
                    }}
                >
                    <img alt="二维码" src={img} />
                </div> */}
                <ShowCode role={role}>
                    {img !== '' ? (
                        <img alt="二维码" src={img} className={classes.ewm} />
                    ) : (
                        <div>
                            <CircularProgress disableShrink />
                            <span>获取二维码</span>
                        </div>
                    )}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.handlelogotout()}
                        className={classes.button2}
                        size="large"
                    >
                        登出
                    </Button>
                </ShowCode>
                <PhoneForm
                    handleOkClick={this.handleOkClick}
                    handleClose={this.handleClose}
                    open={open}
                    phonechange={this.phonechange}
                    phone={phone}
                    phoneError={phoneError}
                    phoneMes={phoneMes}
                    phonev={this.phonev}
                    yzm={yzm}
                    yzmError={yzmError}
                    yzmMes={yzmMes}
                    yzmchange={this.yzmchange}
                    yzmv={this.yzmv}
                    getCode={this.getCode}
                    disabled={disabled}
                    yamData={yamData}
                />
                <InfoForm
                    infoopen={infoopen}
                    infoCloseClick={this.infoCloseClick}
                    infoOkClick={this.infoOkClick}
                    userinfo={userinfo}
                    isgift={isgift}
                    giftChange={this.giftChange}
                    surplus={surplus}
                    total={total}
                    infoFormImg={infoFormImg}
                />
                <DialogError
                    Dialogerror={Dialogerror}
                    message={message}
                    DialogClose={this.DialogClose}
                />
                <Snackbar
                    anchorOrigin={wz}
                    open={snackopen}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{snackmes}</span>}
                />
                <SelectUse
                    selectUseState={selectUseState}
                    searchPhone={this.searchPhone}
                    showSearchBox={this.showSearchBox}
                />
            </Wrap>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.setTokenReducer.token,
    role: state.setRoleReducer.role,
    signType: state.setSignTypeReducer.signType,
    codeString: state.setCodeStringReducer.codeString,
    userId: state.setUserIdReducer.userId,
});

const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => {
        dispatch(setTokenAction(token));
    },
    setRole: (role) => {
        dispatch(setRoleAction(role));
    },
    setSignType: (signType) => {
        dispatch(setSignTypeAction(signType));
    },
    setCodeString: (codeString) => {
        dispatch(setCodeStringAction(codeString));
    },
    setUserId: (userId) => {
        dispatch(setUserIdAction(userId));
    },
    setHotelId: (hotelId) => {
        dispatch(setHotelIdAction(hotelId));
    },
});

CheckIn.propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string,
    setToken: PropTypes.func,
    setRole: PropTypes.func,
    role: PropTypes.string,
    signType: PropTypes.number,
    setSignType: PropTypes.func,
    setCodeString: PropTypes.func,
    codeString: PropTypes.string,
    setUserId: PropTypes.func,
    setHotelId: PropTypes.func,
    history: PropTypes.object,
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(CheckIn),
);

const currencies = [
    {
        value: 0,
        label: '请选择',
    },
    {
        value: 1,
        label: '主会场',
    },
    {
        value: 2,
        label: '酒店',
    },
    {
        value: 3,
        label: '大赛',
    },
];
