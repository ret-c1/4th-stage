// 新闻中心

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GridOn from '@material-ui/icons/GridOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Person from '@material-ui/icons/Person';

const styles = {
    root: {
        width: '100%',
        position: 'fixed',
        zIndex: 2,
        bottom: 0,
        right: 0,
        left: 0,
        margin: 'auto',
        backgroundColor: '#222b4b',
    },
    ttb: {
        color: '#a2a3a7',
    },
};

class Bottom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { classes, bottomValue, bottomhandleChange } = this.props;
        return (
            <BottomNavigation
                value={bottomValue}
                onChange={bottomhandleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction className={classes.ttb} label="签到" icon={<GridOn />} />
                <BottomNavigationAction
                    className={classes.ttb}
                    label="2019xh论剑"
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction className={classes.ttb} label="我的" icon={<Person />} />
            </BottomNavigation>
        );
    }
}

Bottom.propTypes = {
    classes: PropTypes.object.isRequired,
    bottomValue: PropTypes.number,
    bottomhandleChange: PropTypes.func,
    // history: PropTypes.object,
};

export default withStyles(styles)(Bottom);
