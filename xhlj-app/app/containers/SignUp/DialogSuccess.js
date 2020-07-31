// 日程安排

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

const styles = () => ({});

class DialogSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { Dialogsuccess } = this.props;
        return (
            <Dialog open={Dialogsuccess} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <CheckCircleOutline
                            style={{
                                fontSize: 70,
                                color: '#00bfa5',
                            }}
                        />
                    </div>
                    <DialogContentText style={{ textAlign: 'center' }}>
                        我们会对报名信息进行审核,
                    </DialogContentText>
                    <DialogContentText style={{ textAlign: 'center' }}>
                        并尽快与您联系确认.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }
}

DialogSuccess.propTypes = {
    // classes: PropTypes.object.isRequired,
    Dialogsuccess: PropTypes.bool,
};

export default withStyles(styles)(DialogSuccess);
