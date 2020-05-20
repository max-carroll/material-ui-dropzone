import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
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
    isMultiple,
    previewChipProps,
    previewGridClasses,
    previewGridProps,
    showFileNames,
    useChipsForPreview,
}) {
    const containerProps = {
        justify: isMultiple ? 'flex-start' : 'center',
    };

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
        <GridList cols={4}
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
    isMultiple: PropTypes.bool.isRequired,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
    showFileNames: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
};

export default withStyles(styles, {name: 'MuiDropzonePreviewList'})(PreviewList);

// TODO
/*

configure position of titlebar (top bottom)
configure position of actionbottom (left right)
configure background of title bar

get tile list working for files

*/
