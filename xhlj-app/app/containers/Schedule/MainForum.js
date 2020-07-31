import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TimelineItem from './TimelineItem';
import Time from './Time';
import Title from './Title';
import PeopleName from './PeopleName';
import Where from './Where';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        marginBottom: '10px',
    },
});

class MainForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div style={{ width: '90%', margin: '0 auto' }}>
                <TimelineItem>
                    <Time>04-21 09:00</Time>
                    <Title>致辞</Title>
                    <PeopleName>朱胜涛</PeopleName>
                    <Where>中国信息安全测评中心 主任</Where>
                </TimelineItem>
                <TimelineItem>
                    <Time>04-21 09:00</Time>
                    <Title>致辞</Title>
                    <PeopleName>朱胜涛</PeopleName>
                    <Where>中国信息安全测评中心 主任</Where>
                </TimelineItem>
                <TimelineItem>
                    <Time>04-21 09:00</Time>
                    <Title>致辞</Title>
                    <PeopleName>朱胜涛</PeopleName>
                    <Where>中国信息安全测评中心 主任</Where>
                </TimelineItem>
                <TimelineItem>
                    <Time>04-21 09:00</Time>
                    <Title>致辞</Title>
                    <PeopleName>朱胜涛</PeopleName>
                    <Where>中国信息安全测评中心 主任</Where>
                </TimelineItem>
                <TimelineItem>
                    <Time>04-21 09:00</Time>
                    <Title>致辞</Title>
                    <PeopleName>朱胜涛</PeopleName>
                    <Where>中国信息安全测评中心 主任</Where>
                </TimelineItem>
                <TimelineItem>
                    <Time>04-21 09:00</Time>
                    <Title>致辞</Title>
                    <PeopleName>朱胜涛</PeopleName>
                    <Where>中国信息安全测评中心 主任</Where>
                </TimelineItem>
            </div>
        );
    }
}

MainForum.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainForum);
