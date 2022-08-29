import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotif } from "../reducers/notificationReducer";

import { Snackbar } from "@mui/material";
import Alert from "@mui/lab/Alert";

const ToastNotif = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const { message, severity } = notification;

  const handleNotifClose = () => {
    dispatch(clearNotif());
  };

  return (
    <Snackbar
      open={!!notification}
      onClose={handleNotifClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleNotifClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotif;
