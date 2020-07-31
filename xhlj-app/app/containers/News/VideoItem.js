// 新闻中心

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListDiv from './ListDiv';
import VideoDiv from './VideoDiv';
import VideoTitleDiv from './VideoTitleDiv';
import FlexRowDiv from './FlexRowDiv';
import TitleIcon from './TitleIcon';
import SmallTitle from './SmallTitle';

const styles = () => ({
    root: {
        width: '100%',
        backgroundColor: 'transparent',
        paddingTop: 0,
    },
    listiitem: {
        width: '100%',
        flexDirection: 'column',
    },
});

class VideoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { classes, list, newsItemClick } = this.props;
        return (
            <List className={classes.root}>
                {list.map((item) => (
                    <ListDiv key={item.VideoId} onClick={() => newsItemClick(item.VideoId)}>
                        <ListItem className={classes.listiitem}>
                            <VideoDiv src={item.Pic} />
                        </ListItem>
                        <VideoTitleDiv>
                            <div>{item.Title}</div>
                            <FlexRowDiv>
                                <SmallTitle>{item.Source}</SmallTitle>
                                <div>
                                    <TitleIcon
                                        alt="图片"
                                        src="http://aht-cdn.dbappsecurity.com.cn/%E6%9F%A5%E7%9C%8B.png"
                                        style={{ height: '8px', marginTop: '-2px' }}
                                    />
                                    <span style={{ color: '#00c6ff' }}>{item.Reading}</span>
                                </div>
                            </FlexRowDiv>
                        </VideoTitleDiv>
                    </ListDiv>
                ))}
            </List>
        );
    }
}

VideoItem.propTypes = {
    classes: PropTypes.object.isRequired,
    list: PropTypes.array,
    newsItemClick: PropTypes.func,
};

export default withStyles(styles)(VideoItem);
