// 日程安排

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import HighlightOff from '@material-ui/icons/HighlightOff';

const styles = () => ({});

class DialogError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { Dialogerror, message, DialogClose } = this.props;
        return (
            <Dialog open={Dialogerror} aria-labelledby="form-dialog-title" onClose={DialogClose}>
                <DialogContent>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <HighlightOff
                            style={{
                                fontSize: 70,
                                color: '#d32f2f',
                            }}
                        />
                    </div>
                    <DialogContentText style={{ textAlign: 'center' }}>{message}</DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }
}

DialogError.propTypes = {
    // classes: PropTypes.object.isRequired,
    Dialogerror: PropTypes.bool,
    message: PropTypes.string,
    DialogClose: PropTypes.func,
};

export default withStyles(styles)(DialogError);
