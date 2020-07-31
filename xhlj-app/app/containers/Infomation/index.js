// 大会信息

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IsHideDiv from '../../components/styleCompnent/IsHideDiv';
import Organization from './Organization';
import Summary from './Summary';
import Introduction from './Introduction';
import Guide from './Guide';
import Wrap from '../Index/Wrap';
import TotalTitle from './TotalTitle';

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

class Infomation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabvalue: 0,
        };
    }

    componentDidMount() {}

    handleTabChange = (event, value) => {
        console.log(value);
        this.setState({
            tabvalue: value,
        });
    };

    render() {
        const { classes } = this.props;
        const { tabvalue } = this.state;
        return (
            <Wrap>
                <TotalTitle src="http://aht-cdn.dbappsecurity.com.cn/dhxx@1.png" title="大会信息" />
                <Tabs
                    value={tabvalue}
                    onChange={this.handleTabChange}
                    className={classes.tabsRoot}
                    textColor="primary"
                    indicatorColor="primary"
                    scrollButtons="auto"
                    centered
                >
                    <Tab className={classes.tab} label="组织机构" />
                    <Tab className={classes.tab} label="会议概要" />
                    <Tab className={classes.tab} label="论坛简介" />
                    <Tab className={classes.tab} label="会场指南" />
                </Tabs>
                <IsHideDiv show={tabvalue === 0}>
                    <Organization />
                </IsHideDiv>
                <IsHideDiv show={tabvalue === 1}>
                    <Summary />
                </IsHideDiv>
                <IsHideDiv show={tabvalue === 2}>
                    <Introduction />
                </IsHideDiv>
                <IsHideDiv show={tabvalue === 3}>
                    <Guide />
                </IsHideDiv>
            </Wrap>
        );
    }
}

Infomation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Infomation);
