import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles, withWidth} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import * as React from 'react';
import PropTypes from 'prop-types';
import {GridList, GridListTile, GridListTileBar, IconButton} from '@material-ui/core';

const styles = ({palette, shape, spacing}) => ({
    root: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    rootSingle: {

    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    titleBarDark: {
        background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    titleBarTransparent: {
        background: 'none',
    },
});

function PreviewList({
    classes,
    fileObjects,
    getPreviewIcon,
    handleRemove,
    filesLimit,
    previewChipProps,
    previewGridClasses,
    previewGridProps,
    width,
    showFileNames,
    useChipsForPreview,
}) {
    const isMultiple = filesLimit > 1;
    const containerProps = {
        justify: isMultiple ? 'flex-start' : 'center',
    };

    const returnBelowLimit = (number) => {
        if (number < filesLimit) {
            return number;
        }
        return filesLimit;
    };

    const getCols = () => {
        // it may also make sense to take into consideration the max files here for instance
        // whats the point of having 4 cols when we have a max of free files
        switch (width) {
            case 'xs': return returnBelowLimit(1) ;
            case 'sm': return returnBelowLimit(2);
            case 'md': return returnBelowLimit(3);
            case 'lg': return returnBelowLimit(4);
            case 'xl' : return returnBelowLimit(5);
        }
    };

    const cols = getCols();


    if (useChipsForPreview) {
        return (
            fileObjects.map((fileObject, i) => (
                <div key={i}>
                    <Chip
                        variant="outlined"
                        {...previewChipProps}
                        label={fileObject.file.name}
                        onDelete={handleRemove(i)}
                    />
                </div>
            ))
        );
    }

    return (
        <GridList cols={cols}
            className={clsx(classes.root, previewGridClasses.container, {[classes.rootSingle]: !isMultiple})}
        >
            {fileObjects.map((fileObject, i) => {
                const fileTitle = `${fileObject.file?.name ?? 'file'}-${i}`;

                return (
                    <GridListTile
                        key={`${fileObject.file?.name ?? 'file'}-${i}`}
                    >
                        {getPreviewIcon(fileObject, classes)}

                        <GridListTileBar
                            // className={clsx({[classes.titleBarDark]: true})} // need to think about the visibility of the button here
                            title={showFileNames && fileTitle}
                            titlePosition="bottom" // make configurable
                            actionPosition=""
                            actionIcon={
                                <IconButton aria-label={'remove'}
                                    className={classes.icon}
                                    onClick={handleRemove(i)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />


                    </GridListTile>
                );
            })}
        </GridList>
    );
}

PreviewList.propTypes = {
    classes: PropTypes.object.isRequired,
    fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    getPreviewIcon: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    filesLimit: PropTypes.number.isRequired,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
    showFileNames: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
};

export default withWidth()(withStyles(styles, {name: 'MuiDropzonePreviewList', withTheme: true})(PreviewList));

// TODO
/*

configure position of titlebar (top bottom)
configure position of actionbottom (left right)
configure background of title bar

get tile list working for files

*/
