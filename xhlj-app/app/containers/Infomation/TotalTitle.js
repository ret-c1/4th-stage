// 大会信息

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TitleDiv from './TitleDiv';
import Linespan from './Linespan';
import TitleIcon from './TitleIcon';
import TitleText from './TitleText';
import TitleCricle from './TitleCricle';

const styles = () => ({});

class TotalTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { src, title } = this.props;
        return (
            <TitleDiv>
                <Linespan />
                <TitleCricle />
                <TitleIcon src={src} which={title} />
                <TitleText>{title}</TitleText>
                <TitleCricle />
                <Linespan />
            </TitleDiv>
        );
    }
}

TotalTitle.propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
};

export default withStyles(styles)(TotalTitle);
