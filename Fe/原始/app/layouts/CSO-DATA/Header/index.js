import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Avatar, Button } from 'antd';
import header from './header.png';
import logo2 from './logo02.png';
import mleft from './left.png';
import mright from './right.png';
import mcenter from './center.png';
import homeIcon from './home_con.png';

const { Header } = Layout;

const ScHeader = styled(Header)`
    display: flex;
    align-items: center;
    position: relative;
    z-index: 9;
    background: url(${header});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100px;
`;

const ScHRight = styled.div`
    position: absolute;
    z-index: 9;
    right: 20px;
    top: -12px;
    & > span {
        display: inline-block;
        height: 100%;
        padding: 0 12px;
        cursor: pointer;
        transition: all 0.3s;
    }
    & > span:hover {
        background: rgba(0, 0, 0, 0.025);
    }
`;

const ScName = styled.span`
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
    color: #80d5ff;
`;

const Logo = styled.div`
    width: 472px;
    height: 50px;
    background: url(${logo2});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 16px 0;
`;

const ScMenu = styled.ul`
    height: 41px;
    line-height: 41px;
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
    display: flex;
    padding-left: 39.5px;
    margin-top: 60px;
    margin-left: 100px;
    li {
        margin: 0;
        padding: 0;
        width: 182px;
        height: 100%;
        background: url(${mcenter});
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        font-size: 16px;
        color: #80d5ff;
        margin-left: -39.5px;
        cursor: pointer;
        &:first-child {
            background: url(${mleft});
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
        }
        &:last-child {
            background: url(${mright});
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
`;
const ScLineSpan = styled.span`
    position: relative;
    &::after {
        position: absolute;
        top: -14px;
        left: 10px;
        width: 1px;
        height: 24px;
        content: '';
        background: rgba(255, 255, 255, 0.09);
    }
`;
const ScHome = styled.span`
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    background: url(${homeIcon});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`;
const ODataHeader = (props) => {
    const { rxInfo } = props;
    const history = useHistory();
    return (
        <ScHeader>
            <Logo />
            <ScMenu>
                <li>资产管理</li>
                <li>检测管理</li>
                <li>防御管理</li>
                <li>响应管理</li>
                <li>项目管理</li>
                <li>培训管理</li>
                <li>流程管理</li>
            </ScMenu>
            <ScHRight>
                <span>
                    <Avatar size="small" src={rxInfo.img} />
                    <ScName>{rxInfo.name}</ScName>
                </span>
                <ScLineSpan />
                <Button
                    type="link"
                    style={{ color: '#80d5ff', marginLeft: '-5px' }}
                    onClick={() => history.push('/dashboad')}
                >
                    <ScHome />
                    <ScName>返回平台</ScName>
                </Button>
            </ScHRight>
        </ScHeader>
    );
};

ODataHeader.propTypes = {
    rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ODataHeader);
