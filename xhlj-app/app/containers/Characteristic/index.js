// 特色内容

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { Tabs, Tab } from '@material-ui/core';
import IsHideDiv from './IsHideDiv';
import Skill from './Skill';
import Theme from './Theme';
import HeroSalon from './HeroSalon';
import Wrap from '../Index/Wrap';
import TotalTitle from '../Infomation/TotalTitle';

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

class Characteristic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabvalue: 0,
        };
    }

    componentDidMount() {}

    handleTabChange = (event, value) => {
        this.setState({
            tabvalue: value,
        });
    };

    render() {
        const { classes } = this.props;
        const { tabvalue } = this.state;
        return (
            <Wrap>
                <TotalTitle src="http://aht-cdn.dbappsecurity.com.cn/tsnr@1.png" title="特色内容" />
                <Tabs
                    value={tabvalue}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="auto"
                    className={classes.tabsRoot}
                    centered
                >
                    <Tab className={classes.tab} label="技能大赛" />
                    <Tab className={classes.tab} label="主题展区" />
                    <Tab className={classes.tab} label="训练营" />
                </Tabs>
                <IsHideDiv show={tabvalue === 0}>
                    <Skill />
                </IsHideDiv>
                <IsHideDiv no show={tabvalue === 1}>
                    <Theme />
                </IsHideDiv>
                <IsHideDiv show={tabvalue === 2}>
                    <HeroSalon />
                </IsHideDiv>
            </Wrap>
        );
    }
}

Characteristic.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Characteristic);
