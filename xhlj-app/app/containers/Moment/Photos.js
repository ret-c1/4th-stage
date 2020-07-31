import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = () => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 500,
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    tileBar: {
        height: 40,
    },
});

class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { classes, piclist, photoClick } = this.props;
        return (
            <div className={classes.root}>
                <GridList cellHeight={250} className={classes.gridList}>
                    {piclist.map((tile) => (
                        <GridListTile
                            key={tile.Created.toString()}
                            onClick={() => photoClick(tile.StrongPicId)}
                        >
                            <img
                                src={`${tile.Image}?imageView2/1/w/170/h/250|imageslim`}
                                alt={tile.Image}
                            />
                            <GridListTileBar className={classes.tileBar} subtitle={tile.Title} />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

Photos.propTypes = {
    classes: PropTypes.object.isRequired,
    piclist: PropTypes.array,
    photoClick: PropTypes.func,
};

export default withStyles(styles)(Photos);
