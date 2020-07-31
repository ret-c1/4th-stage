// 服务中心

import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Wrap from '../Index/Wrap';
import TotalTitle from '../Infomation/TotalTitle';
import ContentDiv from '../Infomation/ContentDiv';
import ContentTitle from '../Infomation/ContentTitle';
import FromDiv from '../Infomation/FromDiv';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        marginBottom: '10px',
    },
});

class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        // const { classes } = this.props;
        return (
            <Wrap>
                <TotalTitle src="http://aht-cdn.dbappsecurity.com.cn/fwzx@1.png" title="服务中心" />
                <ContentDiv>
                    <ContentTitle>【联系我们】</ContentTitle>
                    {/* <FromDiv>会务组咨询热线：010-88888888</FromDiv> */}
                    <FromDiv>
                        签到咨询热线：史妍--
                        <a href="tel:13911891027">13911891027</a>
                    </FromDiv>
                    <FromDiv>
                        交通咨询热线：吴俊--
                        <a href="tel:13175072880">13175072880</a>
                    </FromDiv>
                    {/* <FromDiv>医疗咨询热线：010-88888888</FromDiv> */}
                    <FromDiv>
                        车辆咨询热线：吴俊--
                        <a href="tel:13175072880">13175072880</a>
                    </FromDiv>
                    {/* <FromDiv>服务邮箱：yu.mi@Dbapp.security.cn.com</FromDiv> */}

                    {/* <ContentTitle>【会场WiFi】</ContentTitle>
                    <FromDiv>账号：010-88888888</FromDiv>
                    <FromDiv>密码：010-88888888</FromDiv> */}

                    {/* <ContentTitle>【交通信息】</ContentTitle>

                    <ContentTitle>【医疗应急】</ContentTitle>

                    <ContentTitle>【会场导航】</ContentTitle>

                    <ContentTitle>【住宿信息】</ContentTitle>

                    <ContentTitle>【用餐信息】</ContentTitle> */}
                </ContentDiv>
            </Wrap>
        );
    }
}

Service.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Service);
