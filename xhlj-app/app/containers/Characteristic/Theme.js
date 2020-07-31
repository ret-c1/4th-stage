// 大会信息

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BigImage from '../../components/styleCompnent/BigImage';
import ContentDiv from '../Infomation/ContentDiv';
import ContentTitle from '../Infomation/ContentTitle';
import ThemeTypography from './ThemeTypography';
import Zzs from './Zzs';
import ZzsDiv from './ZzsDiv';

const styles = (theme) => ({
    root: {
        marginLeft: '10px',
        marginRight: '10px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '80%',
        flexShrink: 0,
        color: '#00c6ff',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    pannel: {
        backgroundColor: 'rgba(255, 255, 255, 0.05);',
        border: '1px solid #262b2d38',
    },
    detail: {
        color: '#e4e4e4',
    },
});

class Theme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: null,
        };
    }

    componentDidMount() {}

    handleChange = (panel) => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
        return (
            <div>
                <BigImage
                    alt="主题展区"
                    src="http://aht-cdn.dbappsecurity.com.cn/ztzqs_01.jpg"
                    style={{ marginBottom: '10px' }}
                />
                <div className={classes.root}>
                    {title.map((item, index) => (
                        <ExpansionPanel
                            expanded={expanded === item}
                            onChange={this.handleChange(item)}
                            key={index.toString()}
                            className={classes.pannel}
                        >
                            <ExpansionPanelSummary
                                className={classes.summ}
                                expandIcon={
                                    <ExpandMoreIcon
                                        style={{ color: 'rgba(236, 215, 215, 0.54)' }}
                                    />
                                }
                            >
                                <Typography className={classes.heading}>{item.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.detail}>
                                <ThemeTypography item={item} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </div>
                <ContentDiv>
                    <ContentTitle>【赞助商】</ContentTitle>
                    <ZzsDiv>
                        {zanzhushang.map((item) => (
                            <Zzs key={item.name} src={item.url} />
                        ))}
                    </ZzsDiv>
                </ContentDiv>
            </div>
        );
    }
}

Theme.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Theme);

const title = [
    {
        name: '浙江省网络安全成就展',
        desp: '勇立潮头，走在前列，蓬勃发展的浙江省网络安全产业，发展成果及民生',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ztzqs_02.jpg',
    },
    {
        name: '人才培养展区',
        desp: '围绕产学研结合、信息保护专业人员认证、实战演练模式等方向，了解网络安全人才培养之路',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ztzqs_03.jpg',
    },
    {
        name: '工业互联网展区',
        desp:
            '工业互联网是满足工业智能化发展需求，具有低时延、高可靠、广覆盖特点的关键网络基础设施，是新一代信息通信技术与先进制造业深度融合所形成的新兴业态与应用模式。',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ztzqs_04.jpg',
    },
    {
        name: '智慧城市展区',
        desp:
            '立足于“新型智慧城市发展与信息安全发展”，共同探讨智慧城市建设与信息安全建设，大数据赋能创新助力新智慧城市安全建设，积极发展民生服务智慧应用，强化网络安全保障能力，不断提高城市承载能力和现代化治理水平。',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ztzqs_05.jpg',
    },
    {
        name: '新监管展区',
        desp:
            '《中华人民共和国网络安全法》明确了监管机构的方向和措施。网络安全监管机构作为所辖区域的虚拟安全大脑，需要对整体的网络安全形势有清晰的把握，利用大数据技术加强协调、分析、处理能力',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ztzqs_06.jpg',
    },
    {
        name: '数字经济展区',
        desp:
            '数字经济在强势崛起的过程中，网络安全威胁也在日益增多。有必要利用大数据、云计算、物联网等新一代信息安全解决方案，加强对关键信息基础设施的保护。',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ztzqs_07.jpg',
    },
    {
        name: '物联网及新技术体验展区',
        desp:
            '从物联网安全发展态势出发，直观的分析物联网面临的安全风险，构建物联网安全防护策略框架，并提出物联网安全技术未来发展方向及建议。',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ztzqs_08.jpg',
    },
    {
        name: '历届“xh论剑”回顾展区',
        desp:
            'xh论剑·网络安全大会自2012年创办以来，始终聚焦前沿网络安全话题，历时7载，已经成为中国网络安全领域的一张金名片。',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ztzqs_09.jpg',
    },
    {
        name: '创新案例成果展区',
        desp:
            '数字经济在强势崛起的过程中，网络安全威胁也在日益增多，有必要利用大数据、云计算、物联网等新一代网络安全解决方案，加强对关键信息基础设施的保护。',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ztzqs_010.jpg',
    },
];

const zanzhushang = [
    {
        name: 'dianxin',
        url: 'http://aht-cdn.dbappsecurity.com.cn/dianxin02.png',
    },
    {
        name: 'dahua',
        url: 'http://aht-cdn.dbappsecurity.com.cn/dahua03.png',
    },
    {
        name: 'yuanwang',
        url: 'http://aht-cdn.dbappsecurity.com.cn/yuanwang.png',
    },
    {
        name: 'shuzi',
        url: 'http://aht-cdn.dbappsecurity.com.cn/shuzi03.png',
    },
    {
        name: 'baidu',
        url: 'http://aht-cdn.dbappsecurity.com.cn/baidu.png',
    },
    {
        name: 'oppo',
        url: 'http://aht-cdn.dbappsecurity.com.cn/oppo03.png',
    },
    {
        name: 'bangbang',
        url: 'http://aht-cdn.dbappsecurity.com.cn/bangbang.png',
    },
    {
        name: 'abit',
        url: 'http://aht-cdn.dbappsecurity.com.cn/abit.png',
    },
    {
        name: 'ruiqi',
        url: 'http://aht-cdn.dbappsecurity.com.cn/ruiqi.png',
    },
    {
        name: 'lihua',
        url: 'http://aht-cdn.dbappsecurity.com.cn/lihua03.png',
    },
    {
        name: 'seagate',
        url: 'http://aht-cdn.dbappsecurity.com.cn/xijie02.png',
    },
    {
        name: 'lunke',
        url: 'http://aht-cdn.dbappsecurity.com.cn/lunke03.png',
    },
    {
        name: 'freebuf',
        url: 'http://aht-cdn.dbappsecurity.com.cn/freebuf02.png',
    },
    {
        name: 'laidian',
        url: 'http://aht-cdn.dbappsecurity.com.cn/laidian.png',
    },
];
