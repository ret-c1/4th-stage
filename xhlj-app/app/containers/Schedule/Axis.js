import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AxisDiv from './AxisDiv';
// import AxisTitleDiv from './AxisTitleDiv';
// import AxisTime from './AxisTime';
import MeetDiv from './MeetDiv';
import MeetCril from './MeetCril';
import MeetTime from './MeetTime';
import MeetTimeName from './MeetTimeName';
import ZBDiv from './ZBDiv';
import TitleIcon from './TitleIcon';
import ZhiboText from './ZhiboText';
import DialogZB from './DialogZB';

const styles = () => ({});

class Axis extends React.Component {
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
        const { open } = this.state;
        return (
            <AxisDiv>
                {/* <AxisTitleDiv>
                    2019第三届中国杭州网络安全技能大赛议程
                    <AxisTime>2019/4/19 杭州宝盛水博园大酒店</AxisTime>
                </AxisTitleDiv> */}
                <ZBDiv onClick={() => this.zbclick()}>
                    <TitleIcon alt="图片" src="http://aht-cdn.dbappsecurity.com.cn/zhibo@1.png" />
                    <ZhiboText>大赛直播</ZhiboText>
                </ZBDiv>
                {dayPlan.map((item, index) => (
                    <MeetDiv key={index.toString()}>
                        <MeetCril />
                        <MeetTime>{item.time}</MeetTime>
                        <MeetTimeName>{item.plan}</MeetTimeName>
                    </MeetDiv>
                ))}
                <DialogZB
                    open={open}
                    closeclick={this.closeclick}
                    link="https://yfhls-cdn.zhanqi.tv/zqlive/107824_F036k/online.m3u8"
                />
            </AxisDiv>
        );
    }
}

Axis.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Axis);

const dayPlan = [
    {
        time: '07:30-08:20',
        plan: '选手签到、调试网络',
    },
    {
        time: '08:20-09:00',
        plan: '开幕式',
    },
    {
        time: '09:00-12:00',
        plan: '夺旗赛',
    },
    {
        time: '12:00-13:00',
        plan: '午休',
    },
    {
        time: '13:00-17:00',
        plan: '大学生攻防赛、企业众测赛',
    },
    {
        time: '17:00-17:30',
        plan: '现场科普秀',
    },
    {
        time: '17:30-18:00',
        plan: '颁奖典礼',
    },
];
