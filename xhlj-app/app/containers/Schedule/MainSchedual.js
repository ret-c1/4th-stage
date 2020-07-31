import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MainList from './MainList';
import ZBDiv from './ZBDiv';
import TitleIcon from './TitleIcon';
import ZhiboText from './ZhiboText';
import DialogZB from './DialogZB';

const styles = () => ({});

class MainSchedual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    componentDidMount() {}

    // 打开直播
    zbclick = () => {
        this.setState({
            open: true,
        });
    };

    // 关闭直播
    closeclick = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { list } = this.props;
        const { open } = this.state;
        return (
            <>
                <ZBDiv border onClick={() => this.zbclick()}>
                    <TitleIcon alt="图片" src="http://aht-cdn.dbappsecurity.com.cn/zhibo@1.png" />
                    <ZhiboText>主论坛直播</ZhiboText>
                </ZBDiv>
                <MainList list={list} />
                <DialogZB
                    open={open}
                    closeclick={this.closeclick}
                    link="https://yfhls-cdn.zhanqi.tv/zqlive/107824_F036k/online.m3u8"
                />
            </>
        );
    }
}

MainSchedual.propTypes = {
    // classes: PropTypes.object.isRequired,
    list: PropTypes.array,
};

export default withStyles(styles)(MainSchedual);
