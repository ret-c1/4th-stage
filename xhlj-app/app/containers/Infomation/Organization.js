// 大会信息

import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContentDiv from './ContentDiv';
import ContentTitle from './ContentTitle';
import FromDiv from './FromDiv';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
});

class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        // const { classes } = this.props;
        return (
            <ContentDiv>
                <ContentTitle>【指导单位】</ContentTitle>
            </ContentDiv>
        );
    }
}

Organization.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Organization);
