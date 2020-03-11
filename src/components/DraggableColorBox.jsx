import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@material-ui/styles";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import styles from "../style/DraggableColorBox";

const DraggableColorBox = SortableElement(props => {
  const { classes, handleDeleteClick } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: props.color }}>
      <div className={classes.boxContent}>
        <span>{props.name}</span>
        <DeleteRoundedIcon
          className={classes.deleteIcon}
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
