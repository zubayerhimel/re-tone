// refactored left side drawer //
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles";
import styles from "../style/ColorPickerForm";

function ColorPickerForm(props) {
  const { isPaletteFull, colors, classes } = props;
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const handleSubmit = () => {
    const newColor = { color: currentColor, name: newColorName };
    props.addNewColor(newColor);
    setNewColorName("");
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      props.colors.every(({ color }) => color !== currentColor)
    );
  });

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          value={newColorName}
          className={classes.colorNameInput}
          name="newColorName"
          autoComplete="off"
          margin="normal"
          onChange={evt => setNewColorName(evt.target.value)}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Name a color",
            "Color name must be unique",
            "Color must be unique"
          ]}
          label="Color Name"
          variant="outlined"
        />
        <Button
          className={classes.addColorBtn}
          variant="contained"
          type="submit"
          color="primary"
          style={{
            backgroundColor: isPaletteFull ? "grey" : currentColor
          }}
          disabled={isPaletteFull}
        >
          {isPaletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default withStyles(styles)(ColorPickerForm);
