import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Wrap from './Wrap';
import Users from './Users';
import UAvatar from './UAvatar';
import UNik from './UNik';

const styles = (theme) => ({
    textField: {
        marginRight: theme.spacing.unit,
        marginTop: '6px',
        marginBottom: '6px',
    },
    root: {
        width: '100%',
        backgroundColor: '#222b4b',
        '& a': {
            display: 'block',
            width: '100%',
            color: '#fff',
            textDecoration: 'none',
        },
    },
});

class Use extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // industry: '请选择',
        };
    }

    componentDidMount() {
        // const url = encodeURIComponent('https://anhengtong.dbappsecurity.com.cn/#/use');
        // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx79270db229525417&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    }

    render() {
        const { classes, token } = this.props;
        const MyLink = (props) => <Link to="/checkin" {...props} />;
        return (
            <Wrap>
                <Users>
                    <UAvatar />
                    {token === null ? (
                        <Button variant="outlined" color="primary" size="large" component={MyLink}>
                            登录
                        </Button>
                    ) : (
                        <UNik>我</UNik>
                    )}
                </Users>
                <List dense className={classes.root}>
                    <ListItem button>
                        <Link to="/myfllow">我的关注</Link>
                        <ListItemSecondaryAction>
                            <ChevronRight style={{ color: '#fff' }} />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Wrap>
        );
    }
}

Use.propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string,
};

const mapStateToProps = (state) => ({
    token: state.setTokenReducer.token,
});

export default withStyles(styles)(connect(mapStateToProps)(Use));
