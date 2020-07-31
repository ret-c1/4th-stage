// 日程安排

import React from 'react';
import PropTypes from 'prop-types';
import wx from 'wx';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { followList, schedualNOTLike } from '@services/api';
import { setScheduleAction } from '../Schedule/action';
import SecondaryList from './SecondaryList';
import Wrap from '../Index/Wrap';
import TitleDiv from '../Infomation/TitleDiv';
import TitleText from '../Infomation/TitleText';

const styles = () => ({});

class MyFllow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videourl: '',
            snackopen: false,
            snackmes: '',
        };
    }

    componentDidMount() {
        this.getFollowList();
    }

    // 获取关注列表
    getFollowList = () => {
        const { token, userId } = this.props;
        if (token === null || userId === null) {
            // history.push('/checkin');
            wx.miniProgram.switchTab({
                url: '/pages/news/news',
            });
        }
        const data = {
            id: userId,
        };
        followList(data, token).then((res) => {
            if (res && res.code === 200) {
                const { setSchedule } = this.props;
                setSchedule(res.v.list);
            }
        });
    };

    // 议程详情
    listItemClick = (param, length) => {
        const { history } = this.props;
        if (length > 0) {
            history.push(`/schedule/${param}`);
        }
    };

    // 取消关注点击
    notdeepClick = (e, item) => {
        e.stopPropagation();
        const { token } = this.props;
        const data = {
            meetingId: item.Field0001.String,
        };
        schedualNOTLike(data, token).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    snackopen: true,
                    snackmes: '已取消关注',
                });
                const { schedule } = this.props;
                const newschedule =
                    schedule === null
                        ? []
                        : schedule.filter((v) => v.Field0001.String !== item.Field0001.String);
                const { setSchedule } = this.props;
                setSchedule(newschedule);
                const time = setTimeout(() => {
                    this.setState({
                        snackopen: false,
                        snackmes: '',
                    });
                    clearTimeout(time);
                }, 3000);
            }
            if (res && res.code === 401) {
                const { history } = this.props;
                history.push('/checkin');
            }
        });
    };

    render() {
        const { schedule } = this.props;
        const { snackopen, snackmes, videourl } = this.state;
        const wz = { vertical: 'top', horizontal: 'center' };
        return (
            <Wrap>
                <TitleDiv>
                    <TitleText>我的关注</TitleText>
                </TitleDiv>
                <SecondaryList
                    list={schedule === null ? [] : schedule}
                    listItemClick={this.listItemClick}
                    videourl={videourl}
                    notdeepClick={this.notdeepClick}
                />
                <Snackbar
                    anchorOrigin={wz}
                    open={snackopen}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{snackmes}</span>}
                />
            </Wrap>
        );
    }
}

MyFllow.propTypes = {
    // classes: PropTypes.object.isRequired,
    token: PropTypes.string,
    schedule: PropTypes.array,
    setSchedule: PropTypes.func,
    history: PropTypes.object,
    userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
    token: state.setTokenReducer.token,
    schedule: state.setScheduleReducer.schedule,
    userId: state.setUserIdReducer.userId,
});

const mapDispatchToProps = (dispatch) => ({
    setSchedule: (schedule) => {
        dispatch(setScheduleAction(schedule));
    },
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(MyFllow),
);
