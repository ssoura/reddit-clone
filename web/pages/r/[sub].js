import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSub,
  toggleUpvote,
  toggleDownvote,
  toggleSubscribe,
  editDescription,
  loadSubPosts,
} from "../../reducers/subPageReducer";
import { notify } from "../../reducers/notificationReducer";
import SortTabBar from "../../components/SortTabBar";
import PostCard from "../../components/PostCard";
import LoadMoreButton from "../../components/LoadMoreButton";
import PostFormModal from "../../components/PostFormModal";
import ErrorPage from "../ErrorPage";
import LoadingSpinner from "../../components/LoadingSpinner";
import getErrorMsg from "../../utils/getErrorMsg";

import { Container, Paper, Typography, Button, TextField } from "@mui/material";
import { useSubPageStyles } from "../../styles/muiStyles";
import CakeIcon from "@mui/icons-material/Cake";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from "@mui/icons-material/PostAdd";

const SubPage = () => {
  const classes = useSubPageStyles();
  const router = useRouter();
  const { sub } = router.query;
  const dispatch = useDispatch();
  const { user, subPage } = useSelector((state) => state);
  const [editOpen, setEditOpen] = useState(false);
  const [descInput, setDescInput] = useState("");
  const [sortBy, setSortBy] = useState("hot");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [pageError, setPageError] = useState(null);

  useEffect(() => {
    const getSub = async () => {
      try {
        await dispatch(fetchSub(sub, "hot"));
        setPageLoading(false);
      } catch (err) {
        setPageError(getErrorMsg(err));
      }
    };
    getSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub]);

  useEffect(() => {
    if (subPage) {
      setDescInput(subPage.subDetails.description);
    }
  }, [subPage]);

  if (pageError) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <ErrorPage errorMsg={pageError} />
        </Paper>
      </Container>
    );
  }

  if (!subPage || pageLoading) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <LoadingSpinner text={"Fetching sub data..."} />
        </Paper>
      </Container>
    );
  }

  const {
    subredditName,
    subscribedBy,
    subscriberCount,
    description,
    admin,
    createdAt,
    id,
  } = subPage.subDetails;

  const isSubscribed = user && subscribedBy.includes(user.id);

  const handleSubJoin = async () => {
    try {
      let updatedSubscribedBy = [];

      if (isSubscribed) {
        updatedSubscribedBy = subscribedBy.filter((s) => s !== user.id);
      } else {
        updatedSubscribedBy = [...subscribedBy, user.id];
      }
      await dispatch(toggleSubscribe(id, updatedSubscribedBy));

      let message = isSubscribed
        ? `Unsubscribed from r/${subredditName}`
        : `Subscribed to r/${subredditName}!`;
      dispatch(notify(message, "success"));
    } catch (err) {
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  const handleEditDescription = async () => {
    try {
      await dispatch(editDescription(id, descInput));
      setEditOpen(false);
      dispatch(
        notify(`Updated description of your sub: r/${subredditName}`, "success")
      );
    } catch (err) {
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  const handleTabChange = async (e, newValue) => {
    try {
      setPostsLoading(true);
      await dispatch(fetchSub(sub, newValue));
      setSortBy(newValue);
      setPostsLoading(false);

      if (page !== 1) {
        setPage(1);
      }
    } catch (err) {
      setPostsLoading(false);
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  const handleLoadPosts = async () => {
    try {
      setLoadingMore(true);
      await dispatch(loadSubPosts(sub, sortBy, page + 1));
      setPage((prevState) => prevState + 1);
      setLoadingMore(false);
    } catch (err) {
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Paper variant="outlined" className={classes.subInfoWrapper}>
          <div className={classes.firstPanel}>
            <Typography variant="h6" color="secondary">
              r/{subredditName}
            </Typography>
            <div className={classes.description}>
              {!editOpen ? (
                <Typography variant="body1">{description}</Typography>
              ) : (
                <div className={classes.inputDiv}>
                  <TextField
                    multiline
                    required
                    fullWidth
                    rows={2}
                    maxRows={Infinity}
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                  <div className={classes.submitBtns}>
                    <Button
                      onClick={() => setEditOpen(false)}
                      color="primary"
                      variant="outlined"
                      size="small"
                      className={classes.cancelBtn}
                      style={{ padding: "0.2em" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleEditDescription}
                      color="primary"
                      variant="outlined"
                      size="small"
                      style={{ padding: "0.2em" }}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              )}
              {user && user.id === admin.id && !editOpen && (
                <Button
                  onClick={() => setEditOpen((prevState) => !prevState)}
                  size="small"
                  variant="outlined"
                  color="primary"
                  style={{ padding: "0.2em", marginLeft: "0.5em" }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
            </div>
            <Typography
              variant="body2"
              className={classes.iconText}
              color="secondary"
            >
              <CakeIcon style={{ marginRight: 5 }} /> Created
              {" " +
                String(new Date(createdAt)).split(" ").slice(1, 4).join(" ")}
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              className={classes.iconText}
            >
              <PersonIcon style={{ marginRight: 5 }} />
              Admin:
              <Link href={`/u/${admin.username}`}>
                <a>u/{admin.username}</a>
              </Link>
            </Typography>
          </div>
          <div className={classes.secondPanel}>
            {user && (
              <Button
                color="primary"
                variant="contained"
                startIcon={isSubscribed ? <CheckIcon /> : <AddIcon />}
                className={classes.joinBtn}
                onClick={handleSubJoin}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            )}
            <Typography
              variant="body2"
              color="primary"
              className={classes.iconText}
            >
              <GroupIcon style={{ marginRight: 5 }} />
              {subscriberCount} subscribers
            </Typography>
          </div>
        </Paper>
        <PostFormModal fromSubreddit={{ subredditName, id }} />
        <SortTabBar sortBy={sortBy} handleTabChange={handleTabChange} />
        {postsLoading ? (
          <LoadingSpinner text={"Fetching subreddit posts..."} />
        ) : (
          <>
            <div>
              {subPage.posts.results.length !== 0 ? (
                subPage.posts.results.map((p) => (
                  <PostCard
                    key={p.id}
                    post={p}
                    toggleUpvote={toggleUpvote}
                    toggleDownvote={toggleDownvote}
                  />
                ))
              ) : (
                <div className={classes.noPosts}>
                  <PostAddIcon color="primary" fontSize="large" />
                  <Typography variant="h5" color="secondary">
                    No Posts Yet
                  </Typography>
                  <Typography variant="h6" color="secondary">
                    Be the first one to post in r/{subredditName}!
                  </Typography>
                </div>
              )}
            </div>
            {"next" in subPage.posts && (
              <LoadMoreButton
                handleLoadPosts={handleLoadPosts}
                loading={loadingMore}
              />
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default SubPage;
