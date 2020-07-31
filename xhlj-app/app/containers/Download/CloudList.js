// 资料下载
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from './Icon';

const styles = () => ({
    item: {
        backgroundColor: 'rgba(255, 255, 255, 0.05);',
        color: '#00c6ff',
        border: '1px solid #262b2d38',
        marginBottom: '6px',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05);',
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: '13px',
    },
    list: {
        padding: '10px 10px',
    },
});

class CloudList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { classes, cloudListClick } = this.props;
        return (
            <List component="nav" className={classes.list}>
                {pdfs.map((item) => (
                    <ListItem
                        className={classes.item}
                        button
                        onClick={() => cloudListClick(item.type)}
                        key={item.type}
                    >
                        <div>{item.name}</div>
                        <Icon alt="图片" src="http://aht-cdn.dbappsecurity.com.cn/you.png" />
                    </ListItem>
                ))}
            </List>
        );
    }
}

CloudList.propTypes = {
    classes: PropTypes.object.isRequired,
    cloudListClick: PropTypes.func,
};

export default withStyles(styles)(CloudList);

const pdfs = [
    {
        name: '某城市级雪亮工程安全保障案例',
        type: 0,
    },
    {
        name: '某省信息网络安全协调指挥平台项目案例',
        type: 1,
    },
    {
        name: '某城市级云安全运营服务案例',
        type: 2,
    },
    {
        name: '某省大型交通集团总体安全保障服务案例',
        type: 3,
    },
    {
        name: '涉众型金融风险监测预警处置实践',
        type: 4,
    },
    {
        name: '某集团基于区块链的日志审计安全平台建设案例',
        type: 5,
    },
    {
        name: '大数据智能安全平台助力卫计委构建安全体系',
        type: 6,
    },
];
