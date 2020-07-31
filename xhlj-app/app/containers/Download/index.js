// 资料下载
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import wx from 'wx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IsHideDiv from '../../components/styleCompnent/IsHideDiv';

import ContentDiv from '../Infomation/ContentDiv';

import Wrap from '../Index/Wrap';
import TotalTitle from '../Infomation/TotalTitle';
import CloudList from './CloudList';

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

class Download extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabvalue: 1,
        };
    }

    componentDidMount() {}

    handleTabChange = (event, value) => {
        this.setState({
            tabvalue: value,
        });
    };

    cloudListClick = (type) => {
        wx.miniProgram.navigateTo({
            url: `/pages/webview/webview?webview=https://anhengtong.dbappsecurity.com.cn/#/product/${type}`,
        });
    };

    render() {
        const { classes } = this.props;
        const { tabvalue } = this.state;
        return (
            <Wrap>
                <TotalTitle src="http://aht-cdn.dbappsecurity.com.cn/zlxz@1.png" title="资料下载" />
                <Tabs
                    value={tabvalue}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="auto"
                    centered
                    className={classes.tabsRoot}
                >
                    <Tab className={classes.tab} label="会议资料" />
                    <Tab className={classes.tab} label="云展厅" />
                </Tabs>
                <IsHideDiv show={tabvalue === 0}>
                    <ContentDiv style={{ textAlign: 'center' }}>
                        大会资料将在会议结束后上传共享
                    </ContentDiv>
                </IsHideDiv>
                <IsHideDiv show={tabvalue === 1}>
                    <CloudList cloudListClick={this.cloudListClick} />
                </IsHideDiv>
            </Wrap>
        );
    }
}

Download.propTypes = {
    // history: PropTypes.object,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Download);
