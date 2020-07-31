import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import ContentDiv from '../Infomation/ContentDiv';
import Wrap from '../Index/Wrap';
import Type0 from './type/Type0'; // 某城市级雪亮工程安全保障案例
import Type1 from './type/Type1'; // 某省信息网络安全协调指挥平台项目案例
import Type2 from './type/Type2'; // 某城市级云安全运营服务案例
import Type3 from './type/Type3'; // 某省大型交通集团总体安全保障服务案例
import Type4 from './type/Type4'; // 涉众型金融风险监测预警处置实践
import Type5 from './type/Type5'; // 某集团基于区块链的日志审计安全平台建设案例
import Type6 from './type/Type6'; // 大数据智能安全平台助力卫计委构建安全体系

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        marginBottom: '10px',
    },
});

// const getParameterByName = (name, url) => {
//     let path = null;
//     if (!url) {
//         path = window.location.href;
//     }
//     const params = name.replace(/[[\]]/g, '\\$&');
//     const regex = new RegExp(`[?&]${params}(=([^&#]*)|&|#|$)`);
//     const results = regex.exec(path);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, ' '));
// };

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pdtype: null,
        };
    }

    componentDidMount() {
        const { history } = this.props;
        const pathname = history.location.pathname.split('/');
        const type = pathname[pathname.length - 1];
        this.setState({
            pdtype: type,
        });
    }

    render() {
        const { pdtype } = this.state;
        return (
            <Wrap>
                {pdtype === '0' ? <Type0 /> : null}
                {pdtype === '1' ? <Type1 /> : null}
                {pdtype === '2' ? <Type2 /> : null}
                {pdtype === '3' ? <Type3 /> : null}
                {pdtype === '4' ? <Type4 /> : null}
                {pdtype === '5' ? <Type5 /> : null}
                {pdtype === '6' ? <Type6 /> : null}
            </Wrap>
        );
    }
}

Product.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Product);
