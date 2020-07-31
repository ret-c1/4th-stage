// 新闻中心

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TitleNotAll from './TitleNotAll';
import TitleDiv from './TitleDiv';
import SmallTitle from './SmallTitle';
import TitleIcon from './TitleIcon';
import ListDiv from './ListDiv';
import ImgDiv from './ImgDiv';
import Zd from './Zd';

const styles = () => ({
    root: {
        width: '100%',
        backgroundColor: 'transparent',
        paddingTop: 0,
    },
    listiitem: {
        justifyContent: 'space-between',
        width: '100%',
    },
});

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { classes, list, newsItemClick } = this.props;
        return (
            <List className={classes.root}>
                {list.map((item, index) => (
                    <ListDiv key={index.toString()} onClick={() => newsItemClick(item.NewsId)}>
                        <ListItem className={classes.listiitem}>
                            <ImgDiv src={item.Pic} />
                            <TitleDiv>
                                <TitleNotAll>{item.Title}</TitleNotAll>
                                <SmallTitle>
                                    {`${item.PushTime.slice(0, 10)} ${item.PushTime.slice(11, 16)}`}
                                    {item.Topping === true ? <Zd>置顶</Zd> : null}
                                </SmallTitle>
                                <SmallTitle>{item.Source}</SmallTitle>
                                <SmallTitle right>
                                    <TitleIcon
                                        alt="图片"
                                        src="http://aht-cdn.dbappsecurity.com.cn/dianzan@1.png"
                                    />
                                    <span style={{ color: '#00c6ff' }}>{item.Like}</span>
                                    <TitleIcon
                                        alt="图片"
                                        src="http://aht-cdn.dbappsecurity.com.cn/%E6%9F%A5%E7%9C%8B.png"
                                        style={{ height: '8px', marginTop: '-2px' }}
                                    />
                                    <span style={{ color: '#00c6ff' }}>{item.Reading}</span>
                                </SmallTitle>
                            </TitleDiv>
                        </ListItem>
                    </ListDiv>
                ))}
            </List>
        );
    }
}

NewItem.propTypes = {
    classes: PropTypes.object.isRequired,
    list: PropTypes.array,
    newsItemClick: PropTypes.func,
};

export default withStyles(styles)(NewItem);
