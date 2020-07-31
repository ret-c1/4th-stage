import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { getTime } from '@utils/getTime';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ContentDiv from './ContentDiv';
import MeetTime from './MeetTime';
import FlexDiv from './FlexDiv';
import TitleIcon from './TitleIcon';

const styles = (theme) => ({
    listitem: {
        borderRadius: '4px',
        marginBottom: '10px',
        boxShadow: '0 0 1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
    },
    chip: {
        marginLeft: theme.spacing.unit,
        fontSize: '12px',
        color: '#00c6ff',
        border: '1px solid #00c6ff',
        padding: '4px',
        height: 'auto',
    },
});

class SecondaryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { list, classes, listItemClick, deepClick, notdeepClick } = this.props;
        return (
            <ContentDiv>
                <List component="nav">
                    {list.map((item, index) => (
                        <ListItem
                            key={index.toString()}
                            button
                            className={classes.listitem}
                            onClick={() =>
                                listItemClick(
                                    item.Id.String,
                                    item.UserList === null ? 0 : item.UserList.length,
                                )
                            }
                        >
                            <FlexDiv>
                                <div>
                                    <MeetTime right>
                                        {`${getTime(item.Field0005.String)}-${getTime(
                                            item.Field0006.String,
                                        )}`}
                                    </MeetTime>
                                    <Chip
                                        label={item.Field0009.String}
                                        className={classes.chip}
                                        variant="outlined"
                                    />
                                </div>
                                <div
                                    style={{
                                        display:
                                            item.Field0026.String.indexOf('闭门会议') > 0
                                                ? 'none'
                                                : '',
                                    }}
                                >
                                    {item.Follow === false ? (
                                        <TitleIcon
                                            alt="图片"
                                            src="http://aht-cdn.dbappsecurity.com.cn/shoucang@1.png"
                                            onClick={(e) => deepClick(e, item)}
                                        />
                                    ) : (
                                        <TitleIcon
                                            alt="图片"
                                            src="http://aht-cdn.dbappsecurity.com.cn/qvxiaoguanzhu@1.png"
                                            onClick={(e) => notdeepClick(e, item)}
                                        />
                                    )}
                                </div>
                            </FlexDiv>
                            <MeetTime color="true" linheight big15>
                                {item.Field0026.String}
                            </MeetTime>
                        </ListItem>
                    ))}
                </List>
            </ContentDiv>
        );
    }
}

SecondaryList.propTypes = {
    classes: PropTypes.object.isRequired,
    list: PropTypes.array,
    listItemClick: PropTypes.func,
    deepClick: PropTypes.func,
    notdeepClick: PropTypes.func,
};

export default withStyles(styles)(SecondaryList);
