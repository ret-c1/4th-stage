// 首页
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { firstVideo } from '@services/api';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Iocn from './Icon';
// import VideoImg from './VideoImg';
import SmallIcon from './SmallIcon';
import IconDiv from './IconDiv';
import VideoDiv from './VideoDiv';
import Wrap from './Wrap';
import ButtonDiv from './ButtonDiv';
import ButtonInnerDiv from './ButtonInnerDiv';
import ButonText from './ButonText';

const styles = (theme) => ({
    btn: {
        display: 'inlin-block',
        width: '100%',
        // background: 'linear-gradient(to right, #27869d, #0f5a8c)',
        borderRadius: '2px',
        background: 'linear-gradient(to top, #273c5b, #3e5573)',
        boxShadow: '0 3px rgba(0, 0, 0, .2)',
        padding: '8px 10px',
        '&:hover': {
            background: 'linear-gradient(to right, #27869d, #0f5a8c)',
            boxShadow: '0 3px rgba(39, 134, 157, .2)',
        },
    },
    grid: {
        padding: '6px',
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlLink: 'http://aht-cdn.dbappsecurity.com.cn/publicize.mp4',
        };
    }

    componentDidMount() {
        this.getVideo();
    }

    btnclick = (url) => {
        const { history } = this.props;
        history.push(url);
    };

    /**
     * 获取视频链接
     */
    getVideo = () => {
        firstVideo().then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    urlLink: res.v.result,
                });
            }
        });
    };

    render() {
        const { classes } = this.props;
        const { urlLink } = this.state;
        return (
            <Wrap>
                <IconDiv>
                    <Iocn
                        alt="xh论剑图标"
                        src="http://aht-cdn.dbappsecurity.com.cn/banner04.png"
                    />
                </IconDiv>
                <VideoDiv>
                    <video
                        muted
                        width="100%"
                        height="100%"
                        controls="controls"
                        style={{ border: '1px solid #74b6b3' }}
                    >
                        <source src={urlLink} />
                    </video>
                </VideoDiv>
                <ButtonDiv>
                    <ButtonInnerDiv>
                        <Grid container spacing={8}>
                            {title.map((item, index) => (
                                <Grid item xs={6} key={index.toString()}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        className={classes.btn}
                                        onClick={() => this.btnclick(item.url)}
                                    >
                                        <SmallIcon src={item.icon} which={item.title} />
                                        <ButonText>{item.title}</ButonText>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </ButtonInnerDiv>
                </ButtonDiv>
            </Wrap>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object,
};

export default withStyles(styles)(Index);

const title = [
    {
        title: '大会信息',
        icon: 'http://aht-cdn.dbappsecurity.com.cn/ddhxx-default.png',
        url: '/infomation',
    },
    {
        title: '新闻中心',
        icon: 'http://aht-cdn.dbappsecurity.com.cn/xwzx-default.png',
        url: '/news',
    },
    {
        title: '特色内容',
        icon: 'http://aht-cdn.dbappsecurity.com.cn/tsnr-default.png',
        url: '/characteristic',
    },
    {
        title: '专家嘉宾',
        icon: 'http://aht-cdn.dbappsecurity.com.cn/zjjb-default.png',
        url: '/expert',
    },
    {
        title: '日程安排',
        icon: 'http://aht-cdn.dbappsecurity.com.cn/rcap-default.png',
        url: '/schedule',
    },
    {
        title: '精彩时刻',
        icon: 'http://aht-cdn.dbappsecurity.com.cn/jcsk-default.png',
        url: '/moment',
    },
    {
        title: '资料下载',
        icon: 'http://aht-cdn.dbappsecurity.com.cn/zlxz-default.png',
        url: '/download',
    },
    {
        title: '服务中心',
        icon: 'http://aht-cdn.dbappsecurity.com.cn/fwzx-default.png',
        url: 'service',
    },
];
