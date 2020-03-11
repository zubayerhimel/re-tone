import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../style/MiniPalette";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

function MiniPalette(props) {
  const {
    classes,
    paletteName,
    emoji,
    colors,
    handleClick,
    openDialog,
    id
  } = props;
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.paletteName}
    >
      {" "}
    </div>
  ));

  const deletePalette = e => {
    e.stopPropagation();
    openDialog(id);
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <Tooltip title="Delete palette">
        <DeleteRoundedIcon
          className={classes.deleteIcon}
          onClick={deletePalette}
        />
      </Tooltip>

      <div className={classes.colors}> {miniColorBoxes} </div>
      <h5 className={classes.title}>
        {" "}
        {paletteName} <span className={classes.emoji}> {emoji} </span>{" "}
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
