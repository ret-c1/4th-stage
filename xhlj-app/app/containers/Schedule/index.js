// 日程安排

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { meetingInfo, schedualLike, schedualNOTLike } from '@services/api';
import { secondaryArr, mainArr } from '@utils/getNewList';
import Snackbar from '@material-ui/core/Snackbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@components/Skeleton';
import IsHideDiv from '../../components/styleCompnent/IsHideDiv';
import SecondaryList from './SecondaryList';
import { setScheduleAction, setMemoryTabs } from './action';
import Wrap from '../Index/Wrap';
import TotalTitle from '../Infomation/TotalTitle';
import Axis from './Axis';
import MainSchedual from './MainSchedual';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #454956',
    },
    tab: {
        color: '#a2a3a7',
    },
});

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabvalue: 0,
            snackopen: false,
            snackmes: '',
            videourl: '',
            SKLoading: true,
        };
    }

    componentDidMount() {
        this.getMeetingInfo();
        const { tab } = this.props;
        this.setState({
            tabvalue: tab,
        });
    }

    // 获取日程列表
    getMeetingInfo = () => {
        const { token } = this.props;
        const token2 = token === null || token === undefined ? '' : token;
        meetingInfo(token2).then((res) => {
            if (res && res.code === 200) {
                const { setSchedule } = this.props;
                this.setState({
                    SKLoading: false,
                });
                setSchedule(res.v.list);
            }
        });
    };

    handleTabChange = (event, value) => {
        const { memoryTabs } = this.props;
        memoryTabs(value);
        this.setState({
            tabvalue: value,
        });
    };

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
                const { schedule } = this.props;
                const newschedule = schedule;
                schedule.map((i, index) => {
                    if (i.Field0001.String === item.Field0001.String) {
                        newschedule[index].Follow = false;
                    }
                    return true;
                });
                const { setSchedule } = this.props;
                setSchedule(newschedule);
                this.setState({
                    snackopen: true,
                    snackmes: '已取消关注',
                });
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

    // 收藏爱心点击
    deepClick = (e, item) => {
        e.stopPropagation();
        const { token } = this.props;
        const data = {
            meetingId: item.Field0001.String,
        };
        schedualLike(data, token).then((res) => {
            if (res && res.code === 200) {
                const { schedule } = this.props;
                const newschedule = schedule;
                schedule.map((i, index) => {
                    if (i.Field0001.String === item.Field0001.String) {
                        newschedule[index].Follow = true;
                    }
                    return true;
                });
                const { setSchedule } = this.props;
                setSchedule(newschedule);
                this.setState({
                    snackopen: true,
                    snackmes: '添加成功',
                });
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
            if (res && res.code === 403) {
                this.setState({
                    snackopen: true,
                    snackmes: '已关注，请勿重复添加',
                });
                const time = setTimeout(() => {
                    this.setState({
                        snackopen: false,
                        snackmes: '',
                    });
                    clearTimeout(time);
                }, 3000);
            }
        });
    };

    render() {
        const { classes, schedule } = this.props;
        const { tabvalue, snackopen, snackmes, videourl, SKLoading } = this.state;
        const wz = { vertical: 'top', horizontal: 'center' };
        return (
            <Wrap>
                <TotalTitle src="http://aht-cdn.dbappsecurity.com.cn/rcap@1.png" title="日程安排" />
                <Tabs
                    value={tabvalue}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="auto"
                    centered
                    className={classes.tabsRoot}
                >
                    <Tab className={classes.tab} label="4月19日" />
                    <Tab className={classes.tab} label="4月20日" />
                    <Tab className={classes.tab} label="4月21日" />
                </Tabs>
                <Skeleton active loop={3} SKLoading={SKLoading}>
                    <IsHideDiv show={tabvalue === 0}>
                        <Axis />
                    </IsHideDiv>
                    <IsHideDiv show={tabvalue === 1}>
                        <MainSchedual list={schedule === null ? [] : mainArr(schedule, '主论坛')} />
                    </IsHideDiv>
                    <IsHideDiv show={tabvalue === 2}>
                        <SecondaryList
                            list={schedule === null ? [] : secondaryArr(schedule, '主论坛')}
                            listItemClick={this.listItemClick}
                            deepClick={this.deepClick}
                            videourl={videourl}
                            notdeepClick={this.notdeepClick}
                        />
                    </IsHideDiv>
                    <Snackbar
                        anchorOrigin={wz}
                        open={snackopen}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{snackmes}</span>}
                    />
                </Skeleton>
            </Wrap>
        );
    }
}

Schedule.propTypes = {
    classes: PropTypes.object.isRequired,
    schedule: PropTypes.array,
    tab: PropTypes.number,
    setSchedule: PropTypes.func,
    memoryTabs: PropTypes.func,
    history: PropTypes.object,
    token: PropTypes.string,
};

const mapStateToProps = (state) => ({
    schedule: state.setScheduleReducer.schedule,
    tab: state.setScheduleReducer.tab,
    token: state.setTokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
    setSchedule: (schedule) => {
        dispatch(setScheduleAction(schedule));
    },
    memoryTabs: (tab) => {
        dispatch(setMemoryTabs(tab));
    },
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Schedule),
);
