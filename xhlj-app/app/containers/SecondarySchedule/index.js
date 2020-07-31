// 日程安排

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { idArr } from '@utils/getNewList';
import MainList from '../Schedule/MainList';
import Wrap from '../Index/Wrap';
import TitleDiv from '../Infomation/TitleDiv';
import TitleText from '../Infomation/TitleText';

const styles = () => ({});

class SecondarySchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItem: [],
            videourl: '',
        };
    }

    componentDidMount() {
        const { history, schedule } = this.props;
        const arr = history.location.pathname.split('/');
        const id = arr[2];
        this.setState({
            listItem: idArr(schedule, id).length > 0 ? idArr(schedule, id) : [],
        });
    }

    render() {
        const { listItem, videourl } = this.state;
        return (
            <Wrap>
                {listItem.length > 0 ? (
                    <>
                        <TitleDiv>
                            <TitleText>{listItem[0].Field0026.String}</TitleText>
                        </TitleDiv>
                        <div style={{ marginTop: '20px' }}>
                            <MainList list={listItem} videourl={videourl} />
                        </div>
                    </>
                ) : null}
            </Wrap>
        );
    }
}

SecondarySchedule.propTypes = {
    // classes: PropTypes.object.isRequired,
    schedule: PropTypes.array,
    history: PropTypes.object,
};

const mapStateToProps = (state) => ({
    schedule: state.setScheduleReducer.schedule,
});

// const mapDispatchToProps = (dispatch) => ({
//     setSchedule: (schedule) => {
//         dispatch(setScheduleAction(schedule));
//     },
// });

export default withStyles(styles)(connect(mapStateToProps)(SecondarySchedule));
