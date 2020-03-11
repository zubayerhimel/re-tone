import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../style/MiniPalette";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

function MiniPalette(props) {
  const { classes, paletteName, emoji, colors } = props;
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.paletteName}
    >
      {" "}
    </div>
  ));

  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.delete}>
        <DeleteRoundedIcon
          className={classes.deleteIcon}
          styles={{ transition: "all 0.5s ease-in-out" }}
        />
      </div>
      <div className={classes.colors}> {miniColorBoxes} </div>
      <h5 className={classes.title}>
        {" "}
        {paletteName} <span className={classes.emoji}> {emoji} </span>{" "}
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
