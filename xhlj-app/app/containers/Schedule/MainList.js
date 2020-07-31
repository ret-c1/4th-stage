import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import { getTime } from '@utils/getTime';
import MeetDiv from './MeetDiv';
import AxisDiv from './AxisDiv';
import AxisTitleDiv from './AxisTitleDiv';
import MeetTime from './MeetTime';
import FlexDiv from './FlexDiv';
import MeetCril from './MeetCril';
import MeetTimeName from './MeetTimeName';

const styles = (theme) => ({
    chip: {
        marginLeft: theme.spacing.unit,
        fontSize: '12px',
        color: '#00c6ff',
        border: '1px solid #00c6ff',
        padding: '4px',
        height: 'auto',
    },
});

class MainList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { list, classes } = this.props;
        console.log(list);
        let Item = '';
        if (list.length > 0 && list[0].UserList !== null) {
            Item = list[0].UserList.map((item, index) => (
                <MeetDiv left key={index.toString()} notop>
                    <MeetCril moreleft />
                    <FlexDiv>
                        <div>
                            <MeetTime right>
                                {`${getTime(item.Field0027.String)} ~ ${getTime(
                                    item.Field0028.String,
                                )}`}
                            </MeetTime>
                            <Chip
                                label={list[0].Field0009.String}
                                className={classes.chip}
                                variant="outlined"
                            />
                        </div>
                    </FlexDiv>
                    <MeetTime big15 linheight>
                        {item.Field0018.String === '' ? null : item.Field0018.String}
                    </MeetTime>
                    <div>
                        <MeetTimeName noleft>
                            {item.Field0014.String === '' ? null : item.Field0014.String}
                        </MeetTimeName>
                    </div>
                </MeetDiv>
            ));
        }
        return (
            <AxisDiv>
                <AxisTitleDiv nomargin />
                {Item}
            </AxisDiv>
        );
    }
}

MainList.propTypes = {
    classes: PropTypes.object.isRequired,
    list: PropTypes.array,
};

export default withStyles(styles)(MainList);
