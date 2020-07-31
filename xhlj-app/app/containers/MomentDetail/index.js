// 精彩时刻

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { picInfo } from '@services/api';
import Skeleton from '@components/Skeleton';
import Wrap from '../Index/Wrap';
import TotalTitle from '../Infomation/TotalTitle';
import ContentDiv from '../Infomation/ContentDiv';
import Photos from './Photos';

const styles = () => ({});

class MomentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoinfo: null,
            SKLoading: true,
        };
    }

    componentDidMount() {
        const { history } = this.props;
        const pathname = history.location.pathname.split('/');
        this.getPicInfo(pathname[pathname.length - 1]);
    }

    // 获取照片详情
    getPicInfo = (param) => {
        const data = {
            StrongPicId: param,
        };
        picInfo(data).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    photoinfo: res.v.info,
                    SKLoading: false,
                });
            }
        });
    };

    render() {
        // const { classes } = this.props;
        const { photoinfo, SKLoading } = this.state;
        let text = '精彩直播';
        if (photoinfo !== null && photoinfo.StrongPicType === 2) {
            text = '精彩回顾';
        }
        return (
            <Wrap>
                <TotalTitle src="http://aht-cdn.dbappsecurity.com.cn/jcsk@1.png" title={text} />
                <Skeleton active loop={3} SKLoading={SKLoading}>
                    <ContentDiv>
                        <Photos
                            piclist={photoinfo !== null ? photoinfo.PicList : []}
                            photoClick={this.photoClick}
                        />
                    </ContentDiv>
                </Skeleton>
            </Wrap>
        );
    }
}

MomentDetail.propTypes = {
    // classes: PropTypes.object.isRequired,
    history: PropTypes.object,
};

export default withStyles(styles)(MomentDetail);
