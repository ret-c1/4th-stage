// 签到
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import UserList from './UserList';
import ListTitle from './ListTitle';
import ShowCode2 from './ShowCode2';

const styles = () => ({
    paper: {
        width: '96%',
        maxWidth: 'none',
        margin: '24px',
    },
    btroot: {
        width: '100%',
    },
    count: {
        position: 'absolute',
        zIndex: 1,
        right: '20px',
        top: '34px',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '12px',
    },
    radio: {
        display: 'inline-block',
    },
    dialogtitle: {
        padding: '18px 24px',
    },
    diaglogcontent: {
        padding: '0 24px',
    },
});

class InfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const {
            infoopen,
            infoCloseClick,
            infoOkClick,
            userinfo,
            isgift,
            giftChange,
            surplus,
            total,
            classes,
            signType,
            infoFormImg,
        } = this.props;
        let qd = '未签到';
        if (userinfo !== null) {
            if (signType === 1 && userinfo.user.Field0134.String === '-4042019823879696592') {
                qd = '用户已签到';
            }
            if (signType === 2 && userinfo.user.Field0133.String === '-4042019823879696592') {
                qd = '用户已签到';
            }
            if (signType === 3 && userinfo.user.Field0152.String === '-4042019823879696592') {
                qd = '用户已签到';
            }
        }
        return (
            <Dialog
                open={infoopen}
                onClose={(e) => {
                    e.preventDefault();
                    infoCloseClick();
                }}
                aria-labelledby="form-dialog-title"
                classes={{ paper: classes.paper }}
            >
                <DialogTitle className={classes.dialogtitle}>参会者信息</DialogTitle>
                <DialogContent className={classes.diaglogcontent}>
                    <div className={classes.count}>
                        <span>奖品数量: {`${surplus}/${total}`}</span>
                    </div>
                    <UserList>
                        <ListTitle>姓名：</ListTitle>
                        <span>{userinfo !== null ? userinfo.user.Field0009.String : ''}</span>
                    </UserList>
                    <UserList>
                        <ListTitle>单位：</ListTitle>
                        <span>{userinfo !== null ? userinfo.user.Field0128.String : ''}</span>
                    </UserList>
                    <UserList>
                        <ListTitle>参会类型：</ListTitle>
                        <span>{userinfo !== null ? userinfo.user.Field0155.String : ''}</span>
                    </UserList>
                    <UserList>
                        <ListTitle>是否签到：</ListTitle>
                        <span>{qd}</span>
                    </UserList>
                    <UserList>
                        <ListTitle>胸牌类型：</ListTitle>
                        <span>{userinfo !== null ? userinfo.user.Field0157.String : ''}</span>
                    </UserList>
                    {signType === 3 ? (
                        <UserList>
                            <ListTitle>大赛类型：</ListTitle>
                            <span>{userinfo !== null ? userinfo.user.Field0150.String : ''}</span>
                        </UserList>
                    ) : null}
                    <UserList lpsmallmargin>
                        <ListTitle>礼品是否发放：</ListTitle>
                        <RadioGroup
                            row
                            name="color"
                            aria-label="color"
                            value={isgift}
                            onChange={giftChange}
                            className={classes.radio}
                        >
                            <FormControlLabel value="是" control={<Radio />} label="是" />
                            <FormControlLabel value="否" control={<Radio />} label="否" />
                        </RadioGroup>
                    </UserList>
                    <ShowCode2>
                        {infoFormImg !== '' ? (
                            <img alt="二维码" src={infoFormImg} />
                        ) : (
                            <div>
                                <CircularProgress disableShrink />
                                <span>获取二维码</span>
                            </div>
                        )}
                    </ShowCode2>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={infoOkClick}
                        classes={{ root: classes.btroot }}
                    >
                        签到
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    signType: state.setSignTypeReducer.signType,
});

InfoForm.propTypes = {
    classes: PropTypes.object.isRequired,
    infoopen: PropTypes.bool,
    infoCloseClick: PropTypes.func,
    infoOkClick: PropTypes.func,
    userinfo: PropTypes.object,
    isgift: PropTypes.string,
    giftChange: PropTypes.func,
    surplus: PropTypes.number,
    total: PropTypes.number,
    signType: PropTypes.number,
    infoFormImg: PropTypes.string,
};

export default withStyles(styles)(connect(mapStateToProps)(InfoForm));
