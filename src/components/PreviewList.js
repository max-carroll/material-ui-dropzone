import Chip from '@material-ui/core/Chip';
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
        margin: 0,
        backgroundColor: 'rgba(255,255,255,0.87)',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
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
    getCols,
}) {
    const previewInside = previewType === 'inside';// extract to constants?
    const cols = getCols(width, filesLimit, fileObjects.length);


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
    getCols: PropTypes.func.isRequired,
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
[x] fix the preview below  behaviour
[ ] ensure the preview none behaviour works
[ ] make xs md lg xs configurable for GridTiles

[ ] check to see if somethings can be configured via the pallette for the preview
[x] Maybe dull the message a little bit when files are active (or hide it, or better make it configurable)

*/
