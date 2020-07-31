import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import VideoDiv from './VideoDiv';

const styles = () => ({
    paper: {
        width: '100%',
        maxWidth: 'none',
        margin: '0',
    },
    close: {
        backgroundColor: '#080615db',
        margin: 0,
    },
});

class DialogZB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { open, closeclick, classes, link } = this.props;
        return (
            <Dialog
                classes={{ paper: classes.paper }}
                open={open}
                onClose={closeclick}
                aria-labelledby="form-dialog-title"
            >
                <>
                    <VideoDiv>
                        <video muted width="100%" height="100%" controls="controls">
                            <source src={link} />
                        </video>
                    </VideoDiv>
                </>
                <DialogActions className={classes.close}>
                    <Button onClick={closeclick} color="primary">
                        关闭
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DialogZB.propTypes = {
    open: PropTypes.bool,
    closeclick: PropTypes.func,
    classes: PropTypes.object,
    link: PropTypes.string,
};

export default withStyles(styles)(DialogZB);
