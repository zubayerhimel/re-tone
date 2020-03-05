// for input modal of palette name
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(false);
  const [newPaletteName, setNewPaletteName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      props.palettesList.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  return (
    <div>
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <ValidatorForm onSubmit={props.handleSubmit}>
              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={evt => setNewPaletteName(evt.target.value)}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Palette name required",
                  "Palette name must be unique"
                ]}
              />

              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default PaletteMetaForm;
