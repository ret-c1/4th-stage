import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
import { previewImage } from '@utils/signature';

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

    // 图片预览
    photoClick = (url) => {
        const { piclist } = this.props;
        const urlarr = [];
        piclist.map((item) => urlarr.push(item.Link));
        previewImage(url, urlarr);
    };

    render() {
        const { classes, piclist } = this.props;
        return (
            <div className={classes.root}>
                <GridList cellHeight={250} className={classes.gridList}>
                    {piclist.map((tile, index) => (
                        <GridListTile
                            key={index.toString()}
                            onClick={() => this.photoClick(tile.Link)}
                        >
                            <img src={tile.Link} alt="图片" />
                            {/* <GridListTileBar className={classes.tileBar} subtitle={tile.Title} /> */}
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
};

export default withStyles(styles)(Photos);
