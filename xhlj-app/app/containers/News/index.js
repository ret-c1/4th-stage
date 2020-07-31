// 新闻中心

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { newsList, newsVideoList } from '@services/api';
import Tabs from '@material-ui/core/Tabs';
import { connect } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@components/Skeleton';
import IsHideDiv from '@components/styleCompnent/IsHideDiv';
import NewItem from './NewItem';
import { setNewsTabsAction } from './action';
import Wrap from '../Index/Wrap';
import TotalTitle from '../Infomation/TotalTitle';
import VideoItem from './VideoItem';

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

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            SKLoading: true,
            tabvalue: 0,
            videoList: [],
        };
    }

    componentDidMount() {
        const { tab } = this.props;
        this.setState({
            tabvalue: tab,
        });
        if (tab === 0) {
            this.getNewsList();
        } else {
            this.getNewsVideoList();
        }
    }

    handleTabChange = (event, value) => {
        const { setNewsTabs } = this.props;
        setNewsTabs(value);
        this.setState(
            {
                tabvalue: value,
                SKLoading: true,
            },
            () => {
                if (value === 0) {
                    this.getNewsList();
                } else {
                    this.getNewsVideoList();
                }
            },
        );
    };

    /**
     * 获取新闻列表
     */
    getNewsList = () => {
        newsList().then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    list: res.v.list,
                    SKLoading: false,
                });
            }
        });
    };

    /**
     * 获取新闻视频列表
     */
    getNewsVideoList = () => {
        newsVideoList().then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    videoList: res.v.list,
                    SKLoading: false,
                });
            }
        });
    };

    /**
     * item点击
     */
    newsItemClick = (NewsId) => {
        const { history } = this.props;
        history.push(`/news/${NewsId}`);
    };

    /**
     * item视频点击
     */
    videoItemClick = (NewsId) => {
        const { history } = this.props;
        history.push(`/news/video/${NewsId}`);
    };

    render() {
        const { classes } = this.props;
        const { list, tabvalue, SKLoading, videoList } = this.state;
        return (
            <Wrap>
                <TotalTitle src="http://aht-cdn.dbappsecurity.com.cn/xwzx@1.png" title="新闻中心" />
                <Tabs
                    value={tabvalue}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="auto"
                    centered
                    className={classes.tabsRoot}
                >
                    <Tab className={classes.tab} label="热点新闻" />
                    <Tab className={classes.tab} label="视频" />
                </Tabs>
                <Skeleton active loop={3} SKLoading={SKLoading}>
                    <IsHideDiv show={tabvalue === 0}>
                        <NewItem list={list} newsItemClick={this.newsItemClick} />
                    </IsHideDiv>
                    <IsHideDiv show={tabvalue === 1}>
                        <VideoItem list={videoList} newsItemClick={this.videoItemClick} />
                    </IsHideDiv>
                </Skeleton>
            </Wrap>
        );
    }
}

News.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object,
    setNewsTabs: PropTypes.func,
    tab: PropTypes.number,
};

const mapStateToProps = (state) => ({
    tab: state.setNewsTabReducer.tab,
});

const mapDispatchToProps = (dispatch) => ({
    setNewsTabs: (tab) => {
        dispatch(setNewsTabsAction(tab));
    },
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(News),
);
