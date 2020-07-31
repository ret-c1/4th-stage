// 新闻中心

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { newsVideoDetail } from '@services/api';
import { getDateTime } from '@utils/getTime';
import Skeleton from '@components/Skeleton';
import TitleIcon from '../News/TitleIcon';
import Wrap from '../NewsDetail/Wrap';
import NewsTitle from '../NewsDetail/NewsTitle';
import FlexDiv from '../NewsDetail/FlexDiv';
import From from '../NewsDetail/From';
import VideoDiv from './VideoDiv';

const styles = (theme) => ({
    chip: {
        margin: theme.spacing.unit,
        padding: '5px',
        width: '100px',
    },
});

class NewsVideoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsinfo: {
                Title: null,
                Source: null,
                Reading: null,
                VideoId: null,
                Created: null,
                Link: 'http://aht-cdn.dbappsecurity.com.cn/publicize.mp4',
                Videotype: 'video',
            },
            SKLoading: true,
        };
    }

    componentDidMount() {
        const { history } = this.props;
        const pathname = history.location.pathname.split('/');
        this.getNewsDetail(pathname[pathname.length - 1]);
    }

    // 获取新闻视频详情
    getNewsDetail = (param) => {
        const data = {
            VideoId: param,
        };
        newsVideoDetail(data).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    newsinfo: res.v,
                    SKLoading: false,
                });
            }
        });
    };

    render() {
        // const { classes } = this.props;
        const { newsinfo, SKLoading } = this.state;
        return (
            <>
                <Skeleton active loop={1} SKLoading={SKLoading}>
                    <Wrap>
                        <NewsTitle>{newsinfo.Title}</NewsTitle>
                        <FlexDiv>
                            <From>{newsinfo.Source}</From>
                            <From>
                                {newsinfo.Created !== null ? getDateTime(newsinfo.Created) : null}
                            </From>
                            <From>
                                <TitleIcon
                                    alt="图片"
                                    src="http://aht-cdn.dbappsecurity.com.cn/%E6%9F%A5%E7%9C%8B.png"
                                    style={{ height: '8px', marginTop: '-2px' }}
                                />
                                <span style={{ color: '#00c6ff' }}>{newsinfo.Reading}</span>
                            </From>
                        </FlexDiv>
                        <VideoDiv>
                            <VideoDiv>
                                {newsinfo.Videotype === 'video' ? (
                                    <video
                                        muted
                                        width="100%"
                                        controls="controls"
                                        style={{ border: '1px solid #74b6b3' }}
                                    >
                                        <source src={newsinfo.Link} />
                                    </video>
                                ) : (
                                    <iframe
                                        title="iframe"
                                        frameBorder="0"
                                        src={newsinfo.Link}
                                        width="100%"
                                        height="100%"
                                        style={{ border: '1px solid #74b6b3' }}
                                    />
                                )}
                            </VideoDiv>
                        </VideoDiv>
                    </Wrap>
                </Skeleton>
            </>
        );
    }
}

NewsVideoDetail.propTypes = {
    // classes: PropTypes.object.isRequired,
    history: PropTypes.object,
};

export default withStyles(styles)(NewsVideoDetail);
