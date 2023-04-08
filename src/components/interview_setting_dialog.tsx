import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

interface CreateInterviewSettingProps {
  onSubmit: (setting: { title: string; description: string }) => void;
}

const InterviewSettingDialog = observer(
  ({ onSubmit }: CreateInterviewSettingProps) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = () => {
      onSubmit({ title, description });
      handleClose();
    };

    return (
      <>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Interview Setting</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default InterviewSettingDialog;
