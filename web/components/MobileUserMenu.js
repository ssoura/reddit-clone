import React, { useState } from "react";
import AuthFormModal from "./AuthFormModal";
import SubFormModal from "./SubFormModal";
import UpdateAvatarModal from "./UpdateAvatarModal";
import DarkModeMenuItem from "./DarkModeMenuItem";
import { getCircularAvatar } from "../utils/cloudinaryTransform";
import storageService from "../utils/localStorage";

import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useUserMenuStyles } from "../styles/muiStyles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const MobileUserMenu = ({ user, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useUserMenuStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    handleLogout();
  };

  const loggedUser = storageService.loadUser() || user;

  return (
    <div>
      {loggedUser ? (
        <IconButton onClick={handleMenu} className={classes.userBtnMob} size="large">
          {loggedUser?.avatar?.exists ? (
            <Avatar
              alt={loggedUser.username}
              src={getCircularAvatar(loggedUser.avatar.imageLink)}
              className={classes.avatar}
            />
          ) : (
            <Avatar className={classes.avatar}>{loggedUser.username[0]}</Avatar>
          )}
          <MoreVertIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton onClick={handleMenu} color="primary" size="large">
          <MoreVertIcon color="primary" />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {loggedUser ? (
          <div>
            <MenuItem href={`/u/${loggedUser.username}`} onClick={handleClose}>
              <ListItemIcon>
                <AccountCircleIcon style={{ marginRight: 7 }} /> My Profile
              </ListItemIcon>
            </MenuItem>
            <SubFormModal type="menu" handleCloseMenu={handleClose} />
            <UpdateAvatarModal
              handleCloseMenu={handleClose}
              user={loggedUser}
            />
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout
              </ListItemIcon>
            </MenuItem>
            <Divider variant="middle" />
            <DarkModeMenuItem closeMenu={handleClose} />
          </div>
        ) : (
          <div>
            <AuthFormModal closeMobileMenu={handleClose} />
            <Divider variant="middle" />
            <DarkModeMenuItem closeMenu={handleClose} />
          </div>
        )}
      </Menu>
    </div>
  );
};

export default MobileUserMenu;
