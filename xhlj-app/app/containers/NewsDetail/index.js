// 新闻中心

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { newsDetail, newsLike } from '@services/api';
import Chip from '@material-ui/core/Chip';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Skeleton from '@components/Skeleton';
import TitleIcon from '../News/TitleIcon';
import Wrap from './Wrap';
import NewsTitle from './NewsTitle';
import FlexDiv from './FlexDiv';
import From from './From';
import ContentMain from './ContentMain';
// import { defaultnewsinfo } from './defaultnewsinfo';
import LikeDiv from './LikeDiv';
import LikeAni from './LikeAni';

const styles = (theme) => ({
    chip: {
        margin: theme.spacing.unit,
        padding: '5px',
        width: '100px',
    },
});

class NewsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsinfo: {
                Title: null,
                Source: null,
                Like: null,
                Reading: null,
                NewsId: null,
                PushTime: '2019-04-03T01:22:52.668Z',
            },
            add: '',
            reduce: '',
            SKLoading: true,
        };
    }

    componentDidMount() {
        const { history } = this.props;
        const pathname = history.location.pathname.split('/');
        this.getNewsDetail(pathname[pathname.length - 1]);
    }

    // 获取新闻详情
    getNewsDetail = (param) => {
        const data = {
            NewsId: param,
        };
        newsDetail(data).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    newsinfo: res.v,
                    SKLoading: false,
                });
            }
        });
    };

    returnHtml = () => {
        const { newsinfo } = this.state;
        return {
            __html:
                newsinfo.Html !== null ? decodeURIComponent(newsinfo.Html) : '<p>网络太卡啦.</p>',
        };
    };

    // 点赞
    like = (param, id) => {
        const data = {
            NewsId: id,
            like: param === 'like' ? 1 : -1,
        };
        if (param === 'like') {
            this.setState({
                add: '+1',
            });
        } else {
            this.setState({
                reduce: '-1',
            });
        }
        newsLike(data).then((res) => {
            console.log(res);
        });
    };

    render() {
        const { classes } = this.props;
        const { newsinfo, add, reduce, SKLoading } = this.state;
        return (
            <>
                <Skeleton active loop={1} SKLoading={SKLoading}>
                    <Wrap>
                        <NewsTitle>{newsinfo.Title}</NewsTitle>
                        <FlexDiv>
                            <From>{newsinfo.Source}</From>
                            <From>
                                {`${newsinfo.PushTime.slice(0, 10)} ${newsinfo.PushTime.slice(
                                    11,
                                    16,
                                )}`}
                            </From>
                            <From>
                                <TitleIcon
                                    alt="图片"
                                    src="http://aht-cdn.dbappsecurity.com.cn/dianzan@1.png"
                                />
                                <span style={{ color: '#00c6ff' }}>{newsinfo.Like}</span>
                                <TitleIcon
                                    alt="图片"
                                    src="http://aht-cdn.dbappsecurity.com.cn/%E6%9F%A5%E7%9C%8B.png"
                                    style={{ height: '8px', marginTop: '-2px' }}
                                />
                                <span style={{ color: '#00c6ff' }}>{newsinfo.Reading}</span>
                            </From>
                        </FlexDiv>
                        <ContentMain top dangerouslySetInnerHTML={this.returnHtml()} />
                        <div>
                            <LikeDiv>
                                <Chip
                                    icon={<ThumbUp />}
                                    label="喜欢"
                                    clickable
                                    className={classes.chip}
                                    color="primary"
                                    onClick={() => this.like('like', newsinfo.NewsId)}
                                    variant="outlined"
                                />
                                <Chip
                                    icon={<ThumbDown />}
                                    label="不喜欢"
                                    clickable
                                    className={classes.chip}
                                    color="primary"
                                    onClick={() => this.like('unlike', newsinfo.NewsId)}
                                    variant="outlined"
                                />
                            </LikeDiv>
                        </div>
                        <LikeAni fade={add}>+1</LikeAni>
                        <LikeAni fade={reduce}>-1</LikeAni>
                    </Wrap>
                </Skeleton>
            </>
        );
    }
}

NewsDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object,
};

export default withStyles(styles)(NewsDetail);
