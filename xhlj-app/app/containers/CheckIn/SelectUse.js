// 签到
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Input from '@material-ui/core/Input';

const styles = () => ({
    paper: {
        width: '96%',
        maxWidth: 'none',
        margin: '24px',
    },
    btroot: {
        width: '100%',
    },
    input: {
        width: '100%',
        // border: '1px solid #ccc',
    },
});

class SelectUse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputRef = React.createRef();
    }

    componentDidMount() {}

    render() {
        const { selectUseState, classes, searchPhone, showSearchBox } = this.props;
        return (
            <Dialog
                open={selectUseState}
                aria-labelledby="form-dialog-title"
                classes={{ paper: classes.paper }}
                onClose={showSearchBox}
            >
                <DialogTitle>搜索参会者信息</DialogTitle>
                <DialogContent>
                    <Input
                        className={classes.input}
                        placeholder="请输入参会者手机号码"
                        inputRef={this.inputRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            searchPhone(this.inputRef.current.value);
                        }}
                        classes={{ root: classes.btroot }}
                    >
                        查询
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SelectUse.propTypes = {
    classes: PropTypes.object.isRequired,
    selectUseState: PropTypes.bool,
    searchPhone: PropTypes.func,
    showSearchBox: PropTypes.func,
};

export default withStyles(styles)(SelectUse);
