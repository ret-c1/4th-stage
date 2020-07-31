// 日程安排

import React from 'react';
import PropTypes from 'prop-types';
import wx from 'wx';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { vipInfo } from '@services/api';
import Wrap from '../Index/Wrap';
import TitleDiv from '../Infomation/TitleDiv';
import TitleText from '../Infomation/TitleText';
import ContentDiv from '../Infomation/ContentDiv';
import ContentTitle from '../Infomation/ContentTitle';
import FromDiv from '../Infomation/FromDiv';

const styles = () => ({});

class VIP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel: {
                Field0004: { String: '无' }, // 宾馆名称 *
                Field0006: { String: '无' }, // 联系电话 *
                Field0007: { String: '无' }, // 地址 *
                Field0012: { String: '无' }, // 我方联系人 *
                Field0011: { String: '无' }, // 我方联系人电话 *
            },
            dining: {
                Field0143: '0',
                Field0144: '0',
                Field0148: '0',
                Field0149: '0',
            },
        };
    }

    componentDidMount() {
        this.getvipInfo();
    }

    // 获取关注列表
    getvipInfo = () => {
        const { token, hotelId, codeString } = this.props;
        if (token === null) {
            wx.miniProgram.switchTab({
                url: '/pages/news/news',
            });
        }
        const data = {
            hotel_id: hotelId,
            field0001: codeString,
        };
        vipInfo(data, token).then((res) => {
            if (res && res.code === 200) {
                if (res.v.hotel.len > 0) {
                    this.setState({
                        hotel: res.v.hotel.list[0],
                        dining: res.v.dining,
                    });
                }
            }
        });
    };

    render() {
        const { hotel, dining } = this.state;
        const Field0006 = hotel.Field0006.String;
        const jd = // 酒店联系电话
            Field0006.length >= 11 ? Field0006.slice(Field0006.length - 11, Field0006.length) : '';
        const Field0011 = hotel.Field0011.String;
        const xtr = // 协调人手机号
            Field0011.length >= 11 ? Field0011.slice(Field0011.length - 11, Field0011.length) : '';
        return (
            <Wrap>
                <TitleDiv>
                    <TitleText>VIP服务</TitleText>
                </TitleDiv>
                <ContentDiv>
                    <ContentTitle>【住宿信息】</ContentTitle>
                    <FromDiv>
                        酒店名称：
                        {hotel.Field0004.String}
                    </FromDiv>
                    <FromDiv>
                        酒店地址：
                        {hotel.Field0007.String}
                    </FromDiv>
                    <FromDiv>
                        酒店联系电话：
                        {Field0006 === '无' ? '无' : <a href={`tel:${jd}`}>{Field0006}</a>}
                    </FromDiv>
                    <ContentTitle>【用餐预定情况】</ContentTitle>
                    <FromDiv>
                        {dining.Field0143 !== '1' &&
                        dining.Field0144 !== '1' &&
                        dining.Field0148 !== '1' &&
                        dining.Field0149 !== '1'
                            ? '无'
                            : ''}
                    </FromDiv>
                    <FromDiv>{dining.Field0143 === '1' ? '19日晚上：酒店自助餐' : ''}</FromDiv>
                    <FromDiv>{dining.Field0144 === '1' ? '20日中午：国博自助餐' : ''}</FromDiv>
                    <FromDiv>{dining.Field0148 === '1' ? '20日晚上：国博自助餐' : ''}</FromDiv>
                    <FromDiv>{dining.Field0149 === '1' ? '21日午餐：国博自助餐' : ''}</FromDiv>
                </ContentDiv>
            </Wrap>
        );
    }
}

VIP.propTypes = {
    token: PropTypes.string,
    hotelId: PropTypes.string,
    codeString: PropTypes.string,
};

const mapStateToProps = (state) => ({
    token: state.setTokenReducer.token,
    hotelId: state.setHotelIdReducer.hotelId,
    codeString: state.setCodeStringReducer.codeString,
});

export default withStyles(styles)(connect(mapStateToProps)(VIP));
