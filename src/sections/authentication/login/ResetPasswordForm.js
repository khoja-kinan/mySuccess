import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function ResetPasswordForm() {
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
    </div>
  );
}
