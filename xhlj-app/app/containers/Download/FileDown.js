// 资料下载

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class FileDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { classes } = this.props;
        return (
            <div style={{ verticalAlign: 'middle' }}>
                <Grid container spacing={8}>
                    <Grid item xs={4}>
                        <img
                            style={{ height: '80px', width: '100%' }}
                            src="http://pnznjydpl.bkt.clouddn.com/theme.png"
                            alt="图片"
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <span style={{ fontSize: '12px' }}>“安全：赋能数字新时代”</span>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            下载
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

FileDown.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileDown);
