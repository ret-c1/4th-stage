import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Title from './Title';
import ButtonGp from './ButtonGp';

import { requestLoggedUserAction, requestLogOutUserAction } from './action';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
        };
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthed === 'admin') {
            this.setState({
                redirectToReferrer: true,
            });
        }
    }

    render() {
        const { redirectToReferrer } = this.state;
        const { requestLoggedUser, requestLogOutUser, location } = this.props;
        const { from } = location.state || {
            from: { pathname: '/' },
        };
        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        return (
            <>
                <Title>验证用户</Title>
                <ButtonGp>
                    <button type="button" onClick={requestLoggedUser}>
                        登录
                    </button>
                    <button type="button" onClick={requestLogOutUser}>
                        登出
                    </button>
                </ButtonGp>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthed: state.loggedUserReducer.isAuthed,
});

const mapDispatchToProps = (dispatch) => ({
    requestLoggedUser: () => {
        dispatch(requestLoggedUserAction());
    },
    requestLogOutUser: () => {
        dispatch(requestLogOutUserAction());
    },
});

LoginPage.propTypes = {
    requestLoggedUser: PropTypes.func,
    requestLogOutUser: PropTypes.func,
    // history: PropTypes.object,
    isAuthed: PropTypes.string,
    location: PropTypes.object,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);
