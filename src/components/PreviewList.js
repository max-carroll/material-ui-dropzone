import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles, withWidth} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import * as React from 'react';
import {isImage as isImageCheck} from '../helpers';
import PropTypes from 'prop-types';
import {GridList, GridListTile, GridListTileBar, IconButton} from '@material-ui/core';

const styles = ({palette, shape, spacing}) => ({
    root: {
        position: 'absolute', // makes it go over the top of the writting
        width: '100%',
        height: '100%',
        // padding: spacing(2),
        margin: 0,
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
    iconWrapper: {
        height: '100%',
        backgroundColor: '#f2f2f2', // TODO do this properly
    },
    fileIcon: {
        flexGrow: 1,
        height: '50%',
        marginTop: spacing(3),
    },
    fileIconBottom: {
        marginTop: spacing(9),
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
    previewType,
    width,
    showFileNames,
    useChipsForPreview,
}) {
    const returnBelowLimit = (number) => {
        if (number < filesLimit) {
            return number;
        }
        return filesLimit;
    };

    const previewInside = previewType === 'inside';// extract to constants?

    const getCols = () => {
        // it may also make sense to take into consideration the max files here for instance
        // whats the point of having 4 cols when we have a max of free files
        // maybe we want the images to take up the max number of columns until its reached

        // if (!isMultiple) return 1;

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
            className={clsx({[classes.root]: previewInside}, previewGridClasses.container)}
            {...previewGridProps?.gridList}>
            {fileObjects.map((fileObject, i) => {
                const fileTitle = showFileNames && fileObject.file?.name;

                const isImage = isImageCheck(fileObject.file);
                return (
                    <GridListTile
                        key={`${fileObject.file?.name ?? 'file'}-${i}`}
                        className={clsx({[classes.iconWrapper]: !isImage})}
                        {...previewGridProps?.gridListTitle}
                    >
                        {getPreviewIcon(
                            fileObject,
                            classes,
                            isImage,
                            previewGridProps?.gridListTitleBar?.titlePosition === 'top'
                        )}

                        <GridListTileBar
                            title={fileTitle}
                            actionIcon={
                                <IconButton aria-label={'remove'}
                                    className={classes.icon}
                                    onClick={handleRemove(i)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                            {...previewGridProps?.gridListTitleBar}
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
    width: PropTypes.string.isRequired,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
    previewType: PropTypes.string.isRequired,
    showFileNames: PropTypes.bool.isRequired,
    useChipsForPreview: PropTypes.bool,
};

export default withWidth()(withStyles(styles, {name: 'MuiDropzonePreviewList', withTheme: true})(PreviewList));

// TODO
/*

[x] configure position of titlebar (top bottom)
[x] configure position of actionbottom (left right)
[x] configure background of title bar
[ ] configure whether to stretch images or center them for single mode
[x] fix the preview below  behaviour
[ ] ensure the preview none behaviour works
[ ] make xs md lg xs configurable for GridTiles

[ ] check to see if somethings can be configured via the pallette for the preview
[ ] mouseover of remove button look a little bit less potent than it did
get tile list working for files
[x] Maybe dull the message a little bit when files are active (or hide it, or better make it configurable)

*/
