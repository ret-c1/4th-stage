// 专家嘉宾

import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        marginBottom: '10px',
    },
});

class StaffMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        // const { classes } = this.props;
        return (
            <div style={{ padding: '15px' }}>
                <h3 style={{ textAlign: 'center' }}>工作人员操作区</h3>
            </div>
        );
    }
}

StaffMember.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaffMember);
