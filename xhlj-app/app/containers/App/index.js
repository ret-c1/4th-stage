import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHashHistory from 'history/createHashHistory';

import AuthorizedRoute from '@components/AuthorizedRoute';
import PrimaryLayout from '@layouts/PrimaryLayout';
// import UnauthorizedLayout from '@layouts/UnauthorizedLayout';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

import finalCreateStore from '@reduxs';
import reducers from '@reduxs/reducers';
import { signature, selectShare } from '../../utils/signature';

/**
 * inject store
 */
const store = finalCreateStore(reducers);
const customHistory = createHashHistory();

const SecondaryMainTheme = blue[500];
const SuccessMainTheme = green[500];

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#00c6ff',
            contrastText: '#fff',
        },
        secondary: {
            main: SecondaryMainTheme,
        },
        success: {
            main: SuccessMainTheme,
            contrastText: '#fff',
        },
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        signature();
        const linkData = {
            title: '2019xh论剑·网络安全大会',
            desc:
                '历时6载“xh论剑”，是政府和企业间合作的桥梁、传播国际信息安全新动态，已经成为中国网络安全领域的一张金名片。',
            link: `${window.location.href.split('#')[0]}#${window.location.href.split('#')[1]}`, // 分享链接！这里是关键 因为微信会把我们分享的链接截取掉 我在这里手动拼接上
            imgUrl: 'http://aht-cdn.dbappsecurity.com.cn/img.png',
        };
        selectShare(linkData);
    }

    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <Router history={customHistory}>
                        <Switch>
                            {/* <Route path="/login" exact component={UnauthorizedLayout} /> */}
                            <AuthorizedRoute path="/" component={PrimaryLayout} />
                            {/* <Redirect to="/" /> */}
                        </Switch>
                    </Router>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
