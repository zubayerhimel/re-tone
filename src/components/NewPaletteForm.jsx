import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import { Link } from "react-router-dom";
import ColorPickerForm from "./ColorPickerForm";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  previewPaper: {
    marginTop: "2rem",
    textAlign: "center",
    boxShadow: "3px 3px 3px 3px #a8a8a8"
  },
  goBack: {
    textDecoration: "none"
  },
  drawerContainer: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%"
  },
  button: {
    width: "50%"
  },
  navBtns: {
    marginRight: "1rem",
    "& button": {
      margin: "0 0.5rem"
    }
  }
}));

NewPaletteForm.defaultProps = {
  maxColor: 20
};

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [dialogueOpen, setDialogueOpen] = React.useState(false);
  const [open, setOpen] = useState(true);
  const [newPaletteName, setNewPaletteName] = useState("");
  const [colors, setColors] = useState(
    props.palettesList[0].colors.slice(0, 10)
  );

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      props.palettesList.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  const handleClickOpen = () => {
    setDialogueOpen(true);
  };

  const handleClose = () => {
    setDialogueOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = newColor => {
    setColors([...colors, newColor]);
  };

  const removeColor = colorName => {
    setColors(colors.filter(color => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const clearPalette = () => {
    setColors([]);
  };

  const handleSubmit = () => {
    let newColorPaletteName = newPaletteName;
    const newPalette = {
      paletteName: newColorPaletteName,
      id: newColorPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    };
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const isPaletteFull = colors.length >= props.maxColor;

  const addRandomColor = () => {
    // pick random color from existing palettes
    const allColors = props.palettesList.map(p => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
    console.log(props.maxColor);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <div>
            <Dialog
              open={dialogueOpen}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle
                id="form-dialog-title"
                style={{ textTransform: "uppercase" }}
              >
                Choose a palette name
              </DialogTitle>
              <ValidatorForm onSubmit={handleSubmit}>
                <DialogContent>
                  <DialogContentText color="inherit">
                    Please enter a name for your new beautiful palette. Make
                    sure palette name is unique.
                  </DialogContentText>

                  <TextValidator
                    label="Palette Name"
                    value={newPaletteName}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="newPaletteName"
                    onChange={evt => setNewPaletteName(evt.target.value)}
                    validators={["required", "isPaletteNameUnique"]}
                    errorMessages={[
                      "Palette name required",
                      "Palette name must be unique"
                    ]}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </DialogActions>
              </ValidatorForm>
            </Dialog>
          </div>
          <Link to="/" className={classes.goBack}>
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Save Palette
          </Button>
        </div>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.drawerContainer}>
          <Typography variant="h5" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearPalette}
              className={classes.button}
            >
              Clear Palette{" "}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={isPaletteFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            isPaletteFull={isPaletteFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}
