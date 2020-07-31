// 精彩时刻

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { picList } from '@services/api';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@components/Skeleton';
import Photos from './Photos';

import Wrap from '../Index/Wrap';
import TotalTitle from '../Infomation/TotalTitle';
import ContentDiv from '../Infomation/ContentDiv';
// import IsHideDiv from '../../components/styleCompnent/IsHideDiv';

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

class Moment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            piclist: [],
            tabvalue: 0,
            SKLoading: true,
        };
    }

    componentDidMount() {
        this.getPicList();
    }

    handleTabChange = (event, value) => {
        this.setState(
            {
                tabvalue: value,
                SKLoading: true,
            },
            () => {
                this.getPicList();
            },
        );
    };

    // 获取图片列表
    getPicList = () => {
        const { tabvalue } = this.state;
        const param = {
            page: 1,
            items: 999999,
            strongPicType: tabvalue + 1,
        };
        picList(param).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    piclist: res.v.list,
                    SKLoading: false,
                });
            }
        });
    };

    // 图片点击
    photoClick = (param) => {
        const { history } = this.props;
        history.push(`/moment/${param}`);
    };

    render() {
        const { classes } = this.props;
        const { piclist, tabvalue, SKLoading } = this.state;
        return (
            <Wrap>
                <TotalTitle src="http://aht-cdn.dbappsecurity.com.cn/jcsk@1.png" title="精彩时刻" />
                <Tabs
                    value={tabvalue}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="auto"
                    className={classes.tabsRoot}
                    centered
                >
                    <Tab className={classes.tab} label="精彩时刻" />
                    <Tab className={classes.tab} label="精彩往期" />
                </Tabs>
                <Skeleton active loop={3} SKLoading={SKLoading}>
                    <ContentDiv>
                        <Photos piclist={piclist} photoClick={this.photoClick} />
                    </ContentDiv>
                </Skeleton>
            </Wrap>
        );
    }
}

Moment.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object,
};

export default withStyles(styles)(Moment);
