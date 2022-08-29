import React, { useState } from "react";
import AuthFormModal from "./AuthFormModal";
import SubFormModal from "./SubFormModal";
import UpdateAvatarModal from "./UpdateAvatarModal";
import DarkModeMenuItem from "./DarkModeMenuItem";
import { getCircularAvatar } from "../utils/cloudinaryTransform";
import storageService from "../utils/localStorage";

import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useUserMenuStyles } from "../styles/muiStyles";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const DesktopUserMenu = ({ user, handleLogout }) => {
  const classes = useUserMenuStyles();
  const [anchorEl, setAnchorEl] = useState(null);

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
        <>
          <Button onClick={handleMenu} className={classes.userBtn}>
            {loggedUser?.avatar?.exists ? (
              <Avatar
                alt={loggedUser.username}
                src={getCircularAvatar(loggedUser.avatar.imageLink)}
                variant="rounded"
                className={classes.avatar}
              />
            ) : (
              <Avatar variant="rounded" className={classes.avatar}>
                {loggedUser.username[0]}
              </Avatar>
            )}
            <div>
              <Typography color="secondary">{loggedUser.username}</Typography>
              <Typography variant="caption" className={classes.karmaWrapper}>
                <FilterVintageIcon
                  fontSize="inherit"
                  style={{ marginRight: "0.2em" }}
                  color="secondary"
                />
                {loggedUser.karma} karma
              </Typography>
            </div>
          </Button>
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
          </Menu>
        </>
      ) : (
        <div className={classes.navItems}>
          <AuthFormModal />
          <DarkModeMenuItem closeMenu={handleClose} navItem={true} />
        </div>
      )}
    </div>
  );
};

export default DesktopUserMenu;
