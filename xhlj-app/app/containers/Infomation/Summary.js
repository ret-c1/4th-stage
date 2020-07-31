// 大会信息

import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ContentMain from './ContentMain';
import ContentDiv from './ContentDiv';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
});

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        // const { classes } = this.props;
        return (
            <ContentDiv>
                <ContentMain>
                    xh论剑•网络安全大会自2012年创办以外来，历时6载，是政府和企业间合作的桥梁、传播国际信息安全新动态，已经成为中国网络安全领域的一张金名片。
                </ContentMain>
                <ContentMain>
                    大会将于2019年4月19日-21日在杭州国际博览中心隆重举行，大会主题为“安全：赋能数字新时代”。届时，大会将邀请政府主管部门、知名专家学者和优秀企业家作为主讲嘉宾，系统解读政府在构建数字技术、数字经济、数字政府、数字社会等领域顶层设计，涵盖数字经济时代网络安全最新前沿技术及创新成果分享，包括智慧城市安全、云安全、移动安全、大数据安全、工控安全、物联网安全等多个方向。大会将设立主论坛、网络安全创新成果展、全新升级的网络安全技能大赛和十多个技术、管理及行业分论坛，共话网络安全前沿核心议题，共推数字新时代。
                </ContentMain>
            </ContentDiv>
        );
    }
}

Summary.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Summary);
