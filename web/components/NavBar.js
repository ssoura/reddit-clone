import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logoutUser } from "../reducers/userReducer";
import { notify } from "../reducers/notificationReducer";
import MobileUserMenu from "./MobileUserMenu";
import DesktopUserMenu from "./DesktopUserMenu";
import SearchBar from "./SearchBar";

import {
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useNavStyles } from "../styles/muiStyles";
import { useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = makeStyles(
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

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(notify(`u/${user.username} logged out`, "success"));
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar disableGutters={isMobile}>
        {!searchOpen && (
          <>
            <div className={classes.leftPortion}>
              <div className={classes.logoWrapper}>
                <Button
                  className={classes.logo}
                  color="primary"
                  to="/"
                  size="large"
                >
                  <img src="/images/redditFace.svg" height="30px" />
                  {!isMobile && (
                    <img src="/images/redditText.svg" height="46px" />
                  )}
                </Button>
              </div>
              {!isMobile && <SearchBar />}
            </div>
            {isMobile ? (
              <>
                <IconButton
                  color="primary"
                  className={classes.searchBtn}
                  onClick={() => setSearchOpen((prevState) => !prevState)}
                  size="large"
                >
                  <SearchIcon />
                </IconButton>
                <MobileUserMenu user={user} handleLogout={handleLogout} />
              </>
            ) : (
              <DesktopUserMenu user={user} handleLogout={handleLogout} />
            )}
          </>
        )}
        {searchOpen && isMobile && (
          <SearchBar isMobile={true} setSearchOpen={setSearchOpen} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
