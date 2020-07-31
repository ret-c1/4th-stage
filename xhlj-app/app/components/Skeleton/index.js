import React from 'react';
import PropTypes from 'prop-types';
import Wrap from './Wrap';
import Avatar from './Avatar';
import Content from './Content';

class Skeleton extends React.Component {
    renderSkeleton = () => {
        const { children, SKLoading, avatar, active, loop } = this.props;
        if (SKLoading) {
            return (
                <Wrap>
                    {avatar ? <Avatar active={active} /> : null}
                    <Content active={active} loop={loop} />
                </Wrap>
            );
        }
        return children;
    };

    render() {
        return <>{this.renderSkeleton()}</>;
    }
}

Skeleton.defaultProps = {
    avatar: false,
    active: false,
    loop: 1,
};

Skeleton.propTypes = {
    SKLoading: PropTypes.bool,
    children: PropTypes.node,
    avatar: PropTypes.bool,
    active: PropTypes.bool,
    loop: PropTypes.number,
};

export default Skeleton;
