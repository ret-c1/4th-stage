import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { signupMeeting } from '@services/api';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogActions from '@material-ui/core/DialogActions';
import DivWrap from './DivWrap';
import MlDiv from './MlDiv';
import DialogSuccess from './DialogSuccess';
import DialogError from './DialogError';

const styles = (theme) => ({
    textField: {
        marginRight: theme.spacing.unit,
        marginTop: '6px',
        marginBottom: '6px',
    },
    btn: {
        marginRight: theme.spacing.unit,
        width: '100%',
        marginTop: '20px',
    },
    formControl: {
        marginRight: theme.spacing.unit,
        width: '100%',
        marginTop: '6px',
        marginBottom: '6px',
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            industry: '请选择',
            theme: [],
            btndisabled: false,
            message: '',
            Dialogsuccess: false,
            Dialogerror: false,
            selectOpen: false,

            nameError: false,
            nameMes: '',
            unitError: false,
            unitMes: '',
            industryMes: '',
            industryError: false,
            deptMes: '',
            deptError: false,
            positionMes: '',
            positionError: false,
            phoneMes: '',
            phoneError: false,
            emailMes: '',
            emailError: false,
            themeMes: '',
            themeError: false,
        };
    }

    componentDidMount() {}

    // 值改变
    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };

    // 提交按钮点击
    bmmeeting = () => {
        this.setState({
            btndisabled: true,
        });
        setTimeout(() => {
            this.setState({
                btndisabled: false,
            });
        }, 2000);
        if (this.valadite() === false) {
            return;
        }
        const nameValue = this.formRef.name.value;
        const unitValue = this.formRef.unit.value;
        const industryValue = this.formRef.industry.value;
        const deptValue = this.formRef.dept.value;
        const positionValue = this.formRef.position.value;
        const phoneValue = this.formRef.phone.value;
        const emailValue = this.formRef.email.value;
        const { theme } = this.state;
        const expectValue = this.formRef.expect.value;
        const param = {
            info1: nameValue, // '姓名'
            info2: unitValue, // '单位名称（全称）'
            info3: industryValue, // '所属行业'
            info4: deptValue, // '所在部门'
            info5: positionValue, // '职位名称'
            info6: phoneValue, // '手机号码'
            info7: emailValue, // '公司邮箱'
            info8: theme.join(','), // '您对哪个论坛主题感兴趣'
            info9: expectValue, // '您对本次大会有哪些期待'
        };
        this.pushData(param);
    };

    pushData = (param) => {
        signupMeeting(param).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    Dialogsuccess: true,
                    industry: '请选择',
                    theme: [],
                });
                this.formRef.reset();
                setTimeout(() => {
                    this.setState({
                        Dialogsuccess: false,
                    });
                }, 3000);
            } else if (res && res.code === 403) {
                this.setState({
                    Dialogerror: true,
                    message: '提交失败,请勿重复提交',
                });
                setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            } else {
                this.setState({
                    Dialogerror: true,
                    message: '提交失败',
                });
                setTimeout(() => {
                    this.setState({
                        Dialogerror: false,
                        message: '',
                    });
                }, 3000);
            }
        });
    };

    // 所有的空值判断
    valadite = () => {
        let nameRet = true;
        let unitRet = true;
        let industryRet = true;
        let deptRet = true;
        let positionRet = true;
        let phoneRet = true;
        let emailRet = true;
        let themeRet = true;
        nameRet = this.nullvaladite('name');
        unitRet = this.nullvaladite('unit');
        industryRet = this.nullvaladite('industry');
        deptRet = this.nullvaladite('dept');
        positionRet = this.nullvaladite('position');
        phoneRet = this.phonev();
        emailRet = this.emailv();
        themeRet = this.nullTheme();
        return (
            nameRet &&
            unitRet &&
            industryRet &&
            deptRet &&
            positionRet &&
            phoneRet &&
            emailRet &&
            themeRet
        );
    };

    emailv = () => {
        let emailRet = true;
        emailRet = this.nullvaladite('email');
        if (emailRet === true) {
            emailRet = this.emailVal();
        }
        return emailRet;
    };

    // 手机号
    emailVal = () => {
        const emailValue = this.formRef.email.value;
        const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (reg.test(emailValue) === false) {
            this.setState({
                emailError: true,
                emailMes: '邮箱输入不正确哦!',
            });
            return false;
        }
        this.setState({
            emailError: false,
            emailMes: '',
        });
        return true;
    };

    phonev = () => {
        let phoneRet = true;
        phoneRet = this.nullvaladite('phone');
        if (phoneRet === true) {
            phoneRet = this.phoneVal();
        }
        return phoneRet;
    };

    // 手机号
    phoneVal = () => {
        const phoneValue = this.formRef.phone.value;
        const reg = /^1[3-9]\d{9}$/;
        if (reg.test(phoneValue) === false) {
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

    // 判断是否为空
    nullvaladite = (param) => {
        const textValue = this.formRef[param].value; // 姓名
        if (textValue === '' || textValue === '请选择') {
            this.setState({
                [`${param}Error`]: true,
                [`${param}Mes`]: '不能为空哦!',
            });
            return false;
        }
        this.setState({
            [`${param}Error`]: false,
            [`${param}Mes`]: '',
        });
        return true;
    };

    // 感兴趣的内容判断是否为空
    nullTheme = () => {
        const { theme } = this.state;
        if (theme.length <= 0) {
            this.setState({
                themeError: true,
                themeMes: '要选择的哦!',
            });
            return false;
        }
        this.setState({
            themeError: false,
            themeMes: '',
        });
        return true;
    };

    selectclick = () => {
        this.setState({
            selectOpen: true,
        });
    };

    selectclose = () => {
        this.setState({
            selectOpen: false,
        });
    };

    render() {
        const { classes } = this.props;
        const {
            industry,
            theme,
            btndisabled,
            message,
            nameError,
            nameMes,
            unitMes,
            unitError,
            industryMes,
            industryError,
            deptMes,
            deptError,
            positionMes,
            positionError,
            phoneMes,
            phoneError,
            emailMes,
            emailError,
            themeMes,
            themeError,
            Dialogsuccess,
            Dialogerror,
            selectOpen,
        } = this.state;
        return (
            <DivWrap>
                <MlDiv>
                    <form
                        ref={(ref) => {
                            this.formRef = ref;
                        }}
                        style={{ zIndex: 10 }}
                    >
                        <TextField
                            id="name"
                            label="姓名"
                            className={classes.textField}
                            fullWidth
                            required
                            name="name"
                            helperText={nameMes}
                            error={nameError}
                            onBlur={() => this.nullvaladite('name')}
                        />
                        <TextField
                            id="unit"
                            label="单位全称"
                            className={classes.textField}
                            fullWidth
                            margin="normal"
                            required
                            name="unit"
                            helperText={unitMes}
                            error={unitError}
                            onBlur={() => this.nullvaladite('unit')}
                        />
                        <TextField
                            id="industry"
                            select
                            label="所属行业"
                            className={classes.textField}
                            value={industry}
                            onChange={this.handleChange('industry')}
                            SelectProps={{
                                native: true,
                                style: {
                                    color: industry === '请选择' ? 'rgba(0, 0, 0, 0.54)' : '',
                                },
                            }}
                            fullWidth
                            margin="normal"
                            required
                            name="industry"
                            helperText={industryMes}
                            error={industryError}
                            onBlur={() => this.nullvaladite('industry')}
                        >
                            {industrys.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="dept"
                            label="所属部门"
                            className={classes.textField}
                            fullWidth
                            margin="normal"
                            required
                            name="dept"
                            helperText={deptMes}
                            error={deptError}
                            onBlur={() => this.nullvaladite('dept')}
                        />
                        <TextField
                            id="position"
                            label="职位名称"
                            className={classes.textField}
                            fullWidth
                            margin="normal"
                            required
                            name="position"
                            helperText={positionMes}
                            error={positionError}
                            onBlur={() => this.nullvaladite('position')}
                        />
                        <TextField
                            id="phone"
                            label="手机号码"
                            className={classes.textField}
                            type="tel"
                            fullWidth
                            margin="normal"
                            required
                            name="phone"
                            helperText={phoneMes}
                            error={phoneError}
                            onBlur={() => this.phonev()}
                        />
                        <TextField
                            id="email"
                            label="公司邮箱"
                            className={classes.textField}
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                            name="email"
                            helperText={emailMes}
                            error={emailError}
                            onBlur={() => this.emailv()}
                        />
                        <FormControl required className={classes.formControl} error={themeError}>
                            <InputLabel htmlFor="select-multiple-checkbox">
                                您对哪个论坛主题感兴趣?
                            </InputLabel>
                            <Select
                                multiple
                                value={theme}
                                onChange={this.handleChange('theme')}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                onBlur={() => this.nullTheme()}
                                open={selectOpen}
                                onOpen={this.selectclick}
                            >
                                <DialogActions>
                                    <Button color="primary" onClick={this.selectclose} autoFocus>
                                        选好了
                                    </Button>
                                </DialogActions>
                                {themes.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={theme.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{themeMes}</FormHelperText>
                        </FormControl>
                        <TextField
                            id="expect"
                            label="您对本次大会由哪些期待?"
                            className={classes.textField}
                            multiline
                            margin="normal"
                            fullWidth
                            name="expect"
                        />
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            className={classes.btn}
                            onClick={this.bmmeeting}
                            disabled={btndisabled}
                        >
                            提交
                        </Button>
                    </form>
                </MlDiv>
                <DialogSuccess Dialogsuccess={Dialogsuccess} />
                <DialogError Dialogerror={Dialogerror} message={message} />
            </DivWrap>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);

const industrys = [
    {
        value: '请选择',
        label: '请选择',
    },
    {
        value: '政府',
        label: '政府',
    },
    {
        value: '金融',
        label: '金融',
    },
    {
        value: '公安',
        label: '公安',
    },
    {
        value: '教育',
        label: '教育',
    },
    {
        value: '运营商',
        label: '运营商',
    },
    {
        value: '制造',
        label: '制造',
    },
    {
        value: '能源',
        label: '能源',
    },
    {
        value: '医疗',
        label: '医疗',
    },
    {
        value: '科研机构',
        label: '科研机构',
    },
    {
        value: '企业',
        label: '企业',
    },
];

const themes = [
    '工业互联网',
    '智慧医疗安全',
    '教育行业信息化与网络安全',
    '运营商网络安全',
    '技术前沿分论坛',
    '云安全',
    '首席安全官',
    '数据安全治理和个人信息保护',
    '智慧城市',
    '威胁情报及应急响应',
    '网络安全人才培养',
];
