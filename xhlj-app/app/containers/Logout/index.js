// 登出
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wx from 'wx';
import { setTokenAction, setRoleAction } from '@containers/CheckIn/action';
import { withStyles } from '@material-ui/core/styles';
import Loading from '@components/Loading';
import Wrap from '../Index/Wrap';

const styles = () => ({});

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // flag: false,
        };
    }

    componentDidMount() {
        this.clearUserStatus();
    }

    clearUserStatus = () => {
        const { setToken, setRole, history } = this.props;
        const id = setTimeout(() => {
            localStorage.clear();
            setToken(null);
            setRole('no');
            history.push('/checkin');
            wx.miniProgram.switchTab({
                url: '/pages/news/news',
            });
            clearTimeout(id);
        }, 2000);
    };

    render() {
        return (
            <Wrap>
                <Loading />
            </Wrap>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => {
        dispatch(setTokenAction(token));
    },
    setRole: (role) => {
        dispatch(setRoleAction(role));
    },
});

Logout.propTypes = {
    setToken: PropTypes.func,
    setRole: PropTypes.func,
    history: PropTypes.object,
};

export default withStyles(styles)(
    connect(
        null,
        mapDispatchToProps,
    )(Logout),
);
