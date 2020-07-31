// 专家嘉宾

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { guestList } from '@services/api';
import Skeleton from '@components/Skeleton';
import Wrap from '../Index/Wrap';
import TotalTitle from '../Infomation/TotalTitle';
import UserCard from './UserCard';
import ContentDiv from './ContentDiv';
import FlexDiv from './FlexDiv';

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

class Expert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabvalue: 0,
            userinfo: [],
            SKLoading: true,
        };
    }

    componentDidMount() {
        this.getGuestList();
    }

    handleTabChange = (event, value) => {
        this.setState(
            {
                tabvalue: value,
                SKLoading: true,
            },
            () => {
                this.getGuestList();
            },
        );
    };

    getGuestList = () => {
        const { tabvalue } = this.state;
        const data = {
            page: 1,
            items: 999999,
            guestType: tabvalue + 1,
        };
        guestList(data).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    userinfo: res.v.list,
                    SKLoading: false,
                });
            }
        });
    };

    render() {
        const { classes } = this.props;
        const { tabvalue, userinfo, SKLoading } = this.state;
        return (
            <Wrap>
                <TotalTitle src="http://aht-cdn.dbappsecurity.com.cn/zjjb@1.png" title="专家嘉宾" />
                <Tabs
                    value={tabvalue}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    className={classes.tabsRoot}
                    centered
                >
                    <Tab className={classes.tab} label="专家委员会" />
                    <Tab className={classes.tab} label="演讲嘉宾" />
                </Tabs>
                <Skeleton active loop={3} SKLoading={SKLoading}>
                    <ContentDiv top>
                        <FlexDiv>
                            {userinfo.map((item) => (
                                <UserCard key={item.GuestId} item={item} />
                            ))}
                        </FlexDiv>
                    </ContentDiv>
                </Skeleton>
            </Wrap>
        );
    }
}

Expert.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expert);
