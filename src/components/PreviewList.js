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
    image: {
        width: 'initial',
        maxWidth: '100%',
        color: palette.text.primary,
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        boxSizing: 'border-box',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
        borderRadius: shape.borderRadius,
        zIndex: 5,
        opacity: 1,
    },
    iconWrapper: {
        height: '100%',
        backgroundColor: 'white',
        // marginTop: theme,
    },
    fileIcon: {
        flexGrow: 1,
        height: '50%',
        marginTop: spacing(2),
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
        <GridList cols={cols} className={clsx(classes.root, previewGridClasses.container)} {...previewGridProps?.gridList}>
            {fileObjects.map((fileObject, i) => {
                const fileTitle = showFileNames && fileObject.file?.name;

                const isImage = isImageCheck(fileObject.file);
                return (
                    <GridListTile
                        key={`${fileObject.file?.name ?? 'file'}-${i}`} {...previewGridProps?.gridListTitleBar}
                        className={clsx({[classes.iconWrapper]: !isImage})}
                    >

                        {getPreviewIcon(fileObject, classes, isImage)}

                        <GridListTileBar
                            title={fileTitle}
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
    showFileNames: PropTypes.bool.isRequired,
    useChipsForPreview: PropTypes.bool,
};

export default withWidth()(withStyles(styles, {name: 'MuiDropzonePreviewList', withTheme: true})(PreviewList));

// TODO
/*

configure position of titlebar (top bottom)
configure position of actionbottom (left right)
configure background of title bar


configure whether to stretch images or center them for single mode

get tile list working for files

*/
