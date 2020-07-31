// 大会信息

import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { previewImage } from '@utils/signature';
import BigImage from '../../components/styleCompnent/BigImage';

const styles = (theme) => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
});

class Guide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    // 图片预览
    photoClick = (url) => {
        previewImage(url, imgurl);
    };

    render() {
        // const { classes } = this.props;
        return (
            <div>
                {imgurl.map((item, index) => (
                    <BigImage
                        key={index.toString()}
                        onClick={() => this.photoClick(item)}
                        src={item}
                    />
                ))}
            </div>
        );
    }
}

Guide.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Guide);

const imgurl = [
    'http://aht-cdn.dbappsecurity.com.cn/hc1.jpg',
    'http://aht-cdn.dbappsecurity.com.cn/hc2.jpg',
    'http://aht-cdn.dbappsecurity.com.cn/hc3.jpg',
];
