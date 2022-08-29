import React, { useState } from "react";
import PropTypes from "prop-types";
import AuthForm from "./AuthForm";

import { DialogTitle } from "./CustomDialogTitle";
import {
  Dialog,
  DialogContent,
  Button,
  IconButton,
  MenuItem,
  useMediaQuery,
  ListItemIcon,
} from "@mui/material";
import { useDialogStyles } from "../styles/muiStyles";
import { useTheme } from "@mui/material/styles";
import { useNavStyles } from "../styles/muiStyles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const AuthFormModal = ({ closeMobileMenu, type }) => {
  const classes = useDialogStyles();
  const classesBtn = makeStyles(
    (theme) => ({
      leftPortion: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("xs")]: {
          marginLeft: "1em",
        },
      },
      logoWrapper: {
        marginRight: theme.spacing(10),
        [theme.breakpoints.down("xs")]: {
          marginRight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        },
      },
      logo: {
        fontFamily: "Varela Round",
        textTransform: "none",
        fontSize: "1.3em",
        padding: "0.1em",
        marginRight: "0.3em",
      },
      user: {
        marginRight: 10,
      },
      titleButton: {
        textTransform: "none",
        fontSize: 20,
        marginRight: 12,
      },
      navButtons: {
        "&:hover": {
          backgroundColor: "#ffe5d8",
        },
      },
      search: {
        flexGrow: 0.75,
        [theme.breakpoints.down("sm")]: {
          flexGrow: 1,
          padding: "0 0.5em",
        },
      },
      searchBtn: {
        padding: "0.2em",
      },
    }),
    { index: 1 }
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMobileMenu = () => {
    handleClickOpen();
    closeMobileMenu();
  };

  return (
    <div>
      {type === "upvote" ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={isMobile ? "small" : "medium"}
          size="large"
        >
          <ArrowUpwardIcon style={{ color: "#b2b2b2" }} />
        </IconButton>
      ) : type === "downvote" ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={isMobile ? "small" : "medium"}
          size="large"
        >
          <ArrowDownwardIcon style={{ color: "#b2b2b2" }} />
        </IconButton>
      ) : isMobile ? (
        <MenuItem onClick={handleMobileMenu}>
          <ListItemIcon>
            <ExitToAppIcon style={{ marginRight: 7 }} />
            Login/Register
          </ListItemIcon>
        </MenuItem>
      ) : (
        <Button
          color="primary"
          onClick={handleClickOpen}
          className={classesBtn.navButtons}
        >
          Login/Register
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleClose}></DialogTitle>
        <DialogContent>
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

AuthFormModal.propTypes = {
  closeMobileMenu: PropTypes.func,
};

export default AuthFormModal;
