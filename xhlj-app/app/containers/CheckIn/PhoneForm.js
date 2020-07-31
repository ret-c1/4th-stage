// 签到
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = () => ({
    btn: {
        marginTop: '20px',
    },
    text: {
        display: 'inlin-block',
        width: '50%',
        marginRight: '4px',
    },
    scrollPaper: {
        alignItems: [['start'], '!important'],
    },
});

class PhoneForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { classes } = this.props;
        const {
            open,
            handleClose,
            handleOkClick,
            phone,
            phonechange,
            phoneError,
            phoneMes,
            phonev,
            yzm,
            yzmError,
            yzmMes,
            yzmchange,
            yzmv,
            getCode,
            disabled,
            yamData,
        } = this.props;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                classes={{
                    scrollPaper: classes.scrollPaper,
                }}
            >
                <DialogTitle id="form-dialog-title">用户登录</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tel"
                        label="手机号"
                        type="tel"
                        fullWidth
                        value={phone}
                        onChange={phonechange}
                        helperText={phoneMes}
                        error={phoneError}
                        onBlur={phonev}
                    />
                    <div>
                        <TextField
                            className={classes.text}
                            margin="dense"
                            id="num"
                            label="验证码"
                            type="number"
                            value={yzm}
                            error={yzmError}
                            helperText={yzmMes}
                            onChange={yzmchange}
                            onBlur={yzmv}
                        />
                        <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            className={classes.btn}
                            onClick={() => {
                                const v = phonev();
                                if (v === true) {
                                    getCode();
                                }
                            }}
                            disabled={disabled}
                        >
                            {yamData}
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        关闭
                    </Button>
                    <Button onClick={() => handleOkClick()} color="primary">
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

PhoneForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleOkClick: PropTypes.func,
    phone: PropTypes.string,
    phonechange: PropTypes.func,
    phoneError: PropTypes.bool,
    phoneMes: PropTypes.string,
    phonev: PropTypes.func,
    yzm: PropTypes.string,
    yzmError: PropTypes.bool,
    yzmMes: PropTypes.string,
    yzmchange: PropTypes.func,
    yzmv: PropTypes.func,
    getCode: PropTypes.func,
    disabled: PropTypes.bool,
    yamData: PropTypes.string,
};

export default withStyles(styles)(PhoneForm);
