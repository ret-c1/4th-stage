// 大会信息

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BigImage from '../../components/styleCompnent/BigImage';
import Paragraph from '../../components/styleCompnent/Paragraph';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
});

class ThemeTypography extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { item } = this.props;
        return (
            <div>
                <Paragraph>{item.desp}</Paragraph>
                <BigImage alt="背景" src={item.url} />
            </div>
        );
    }
}

ThemeTypography.propTypes = {
    // classes: PropTypes.object.isRequired,
    item: PropTypes.object,
};

export default withStyles(styles)(ThemeTypography);
