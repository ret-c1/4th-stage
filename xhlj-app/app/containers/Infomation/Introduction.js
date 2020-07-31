// 大会信息

import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContentDiv from './ContentDiv';
import IntroTitle from './IntroTitle';
import AxisDiv from '../Schedule/AxisDiv';
import IntroCril from './IntroCril';
import IntroDiv from './IntroDiv';
import ZhuDiv from './ZhuDiv';
import ZhuSpan from './ZhuSpan';
import Fendiv from './Fendiv';
import ItroTitleDiv from './ItroTitleDiv';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
});

class Introduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        // const { classes } = this.props;
        return (
            <ContentDiv>
                <ItroTitleDiv>2019xh论剑•网络安全大会</ItroTitleDiv>
                <IntroTitle>主论坛</IntroTitle>
                <ZhuDiv>
                    <IntroCril />
                    <ZhuSpan>主题：安全赋能数字新时代</ZhuSpan>
                </ZhuDiv>
                <IntroTitle>分论坛</IntroTitle>
                <AxisDiv notop>
                    {fen.map((item, index) => (
                        <IntroDiv key={index.toString()}>
                            <IntroCril />
                            <Fendiv>
                                <div>{item.name}</div>
                                <div
                                    style={{
                                        color: '#00c6ff',
                                        display: item.theme === undefined ? 'none' : '',
                                    }}
                                >
                                    {item.theme}
                                </div>
                            </Fendiv>
                        </IntroDiv>
                    ))}
                </AxisDiv>
            </ContentDiv>
        );
    }
}

Introduction.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Introduction);

const fen = [
    {
        name: '工业互联网安全分论坛',
        theme: '主题：安全成就联接价值',
    },
    {
        name: '智慧医疗安全高峰论坛',
        theme: '主题：安全顶层设计与数据安全治理',
    },
    {
        name: '教育信息化与网络安全分论坛',
        theme: '主题：教育信息化，聚力云安全',
    },
    {
        name: '运营商网络安全分论坛',
        theme: '主题：运营商-新时代，新安全',
    },
    {
        name: '技术前沿论坛',
        theme: '主题：探索前瞻技术 揭秘未来趋势',
    },
    {
        name: '云安全分论坛',
        theme: '主题：安全使能，化云为雨',
    },
    {
        name: 'CSO首席安全官高峰论坛',
        theme: '主题：安全治理与战略规划',
    },
    {
        name: '数据安全治理和个人信息保护分论坛',
        theme: '主题：数据安全治理和个人信息保护',
    },
    {
        name: '智慧城市和数字经济转型安全分论坛方案',
        theme: '主题：数字驱动助力新型智慧城市安全建设',
    },
    {
        name: '威胁情报及应急响应分论坛',
        theme:
            '主题：威胁情报与应急响应体系和技术在军工、政府、运营商、金融等场景中的实际应用与落地',
    },
    {
        name: '网络安全人才与道德培养分论坛高峰论坛',
        theme: '主题：人才：赋能安全新时代',
    },
    {
        name: '新技术、新应用下的等级保护和关健信息基础设施保护分论坛',
    },
    {
        name: '金融网络安全闭门会议',
    },

    {
        name: '网信闭门会议',
    },
];
