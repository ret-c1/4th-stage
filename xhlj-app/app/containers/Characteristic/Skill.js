// 大会信息

import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BigImage from '../../components/styleCompnent/BigImage';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
});

class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        // const { classes } = this.props;
        return (
            <>
                <BigImage
                    alt="技能大赛"
                    src="http://aht-cdn.dbappsecurity.com.cn/skill02-min.png"
                />
            </>
        );
    }
}

Skill.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Skill);
