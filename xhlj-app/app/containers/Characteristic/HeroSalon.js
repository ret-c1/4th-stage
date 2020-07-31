// 大会信息

import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BigImage from '../../components/styleCompnent/BigImage';

const styles = () => ({});

class HeroSalon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <>
                <BigImage src="http://aht-cdn.dbappsecurity.com.cn/xly.png" alt="训练营" />
            </>
        );
    }
}

HeroSalon.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeroSalon);
