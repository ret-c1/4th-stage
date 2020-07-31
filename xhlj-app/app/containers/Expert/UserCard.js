// 大会信息

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UserCardDiv from './UserCardDiv';
import UserIcon from './UserIcon';
import UserName from './UserName';
import UserFrom from './UserFrom';

const styles = () => ({});

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { item } = this.props;
        return (
            <UserCardDiv>
                <UserName>{item.Name}</UserName>
                <UserIcon
                    src={`${item.Pic}?imageView2/1/w/176/h/246/q/75|imageslim`}
                    alt="人物头像"
                />
                <UserFrom>{item.Position}</UserFrom>
                {/* <FlexDiv iseven={iseven}>
                    <UserIcon
                        iseven={iseven}
                        src={`${item.Pic}?imageView2/1/w/176/h/246/q/75|imageslim`}
                        alt="人物头像"
                    />
                    <div style={{ marginLeft: '10px' }}>
                        <h4 style={{ margin: 0, marginBottom: '10px' }}>{item.Name}</h4>
                        <div style={{ lineHeight: 1.3, fontSize: '14px' }}>{item.Position}</div>
                    </div>
                </FlexDiv>
                <Rectangle iseven={iseven} /> */}
            </UserCardDiv>
        );
    }
}

UserCard.propTypes = {
    // classes: PropTypes.object.isRequired,
    item: PropTypes.object,
};

export default withStyles(styles)(UserCard);
