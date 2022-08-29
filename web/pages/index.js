import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import getErrorMsg from "../utils/getErrorMsg";

import PostFormModal from "../components/PostFormModal";
import PostList from "../components/PostList";
import TopSubsPanel from "../components/TopSubsPanel";

import NavBar from "../components/NavBar";
import ToastNotif from "../components/ToastNotif";

import { Paper } from "@mui/material/";
import customTheme from "../styles/customTheme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { setUser } from "../reducers/userReducer";
import { setDarkMode } from "../reducers/themeReducer";
import { fetchPosts } from "../reducers/postReducer";
import { setSubList, setTopSubsList } from "../reducers/subReducer";
import { notify } from "../reducers/notificationReducer";
import { makeStyles } from "@mui/styles";

const Home = () => {
  const { darkMode } = useSelector((state) => state);
  const theme = customTheme(darkMode);
  const classes = makeStyles(
    (theme) => ({
      root: {
        width: "100vW",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: "100vH",
      },
      homepage: {
        minWidth: "98%",
        marginTop: "0.5em",
        display: "flex",
        [theme.breakpoints.down("md")]: {
          marginTop: "0",
          display: "block",
        },
      },
      postsPanel: {
        minWidth: "40vW",
        flexGrow: 1,
      },
    }),
    { index: 1 }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const setPostsAndSubreddits = async () => {
      try {
        await dispatch(fetchPosts("hot"));
        await dispatch(setSubList());
        await dispatch(setTopSubsList());
      } catch (err) {
        dispatch(notify(getErrorMsg(err), "error"));
      }
    };

    dispatch(setUser);
    dispatch(setDarkMode);
    setPostsAndSubreddits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={0}>
        <ToastNotif />
        <NavBar />
        <PostFormModal />
        <PostList />
        <TopSubsPanel />
      </Paper>
    </ThemeProvider>
  );
};

export default Home;
