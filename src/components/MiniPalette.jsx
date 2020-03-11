import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../style/MiniPalette";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

function MiniPalette(props) {
  const {
    classes,
    paletteName,
    emoji,
    colors,
    handleClick,
    handleDelete,
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
    handleDelete(id);
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteRoundedIcon
        className={classes.deleteIcon}
        onClick={deletePalette}
      />
      <div className={classes.colors}> {miniColorBoxes} </div>
      <h5 className={classes.title}>
        {" "}
        {paletteName} <span className={classes.emoji}> {emoji} </span>{" "}
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
