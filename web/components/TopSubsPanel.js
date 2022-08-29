import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toggleSubscribe } from "../reducers/subReducer";
import { notify } from "../reducers/notificationReducer";
import SubFormModal from "./SubFormModal";
import LoadingSpinner from "./LoadingSpinner";
import getErrorMsg from "../utils/getErrorMsg";
import storageService from "../utils/localStorage";

import { Paper, Typography, useMediaQuery, Button } from "@mui/material";
import { useSubPanelStyles } from "../styles/muiStyles";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

const TopSubsPanel = () => {
  const { subs, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useSubPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('lg'));

  if (isNotDesktop) {
    return null;
  }

  const loggedUser = storageService.loadUser() || user;

  const loadingSubs = !subs || !subs.topSubs;

  const isSubscribed = (subscribedBy, user) => {
    return subscribedBy.includes(user.id);
  };

  const handleJoinSub = async (id, subscribedBy, subredditName) => {
    try {
      let updatedSubscribedBy;

      if (subscribedBy.includes(user.id)) {
        updatedSubscribedBy = subscribedBy.filter((s) => s !== user.id);
      } else {
        updatedSubscribedBy = [...subscribedBy, user.id];
      }
      dispatch(toggleSubscribe(id, updatedSubscribedBy));

      let message = subscribedBy.includes(user.id)
        ? `Unsubscribed from r/${subredditName}`
        : `Subscribed to r/${subredditName}!`;
      dispatch(notify(message, "success"));
    } catch (err) {
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  return (
    <Paper variant="outlined" className={classes.mainPaper}>
      <Paper variant="outlined" className={classes.listPaper}>
        <Typography variant="h5" color="secondary" className={classes.title}>
          Top Subreddishes
        </Typography>
        {loadingSubs ? (
          <LoadingSpinner text="Fetching subs data..." />
        ) : (
          subs.topSubs.map((s, i) => (
            <div key={s.id} className={classes.listWrapper}>
              <Typography variant="body2" className={classes.listItem}>
                {`${i + 1}. `}
                <Link href={`/r/${s.subredditName}`} color="primary">
                  <a>{s.subredditName}</a>
                </Link>
                {` - ${s.subscriberCount} members `}
              </Typography>
              {loggedUser && (
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={
                    isSubscribed(s.subscribedBy, user) ? (
                      <CheckIcon />
                    ) : (
                      <AddIcon />
                    )
                  }
                  onClick={() =>
                    handleJoinSub(s.id, s.subscribedBy, s.subredditName)
                  }
                >
                  {isSubscribed(s.subscribedBy, user) ? "Joined" : "Join"}
                </Button>
              )}
            </div>
          ))
        )}
      </Paper>
      {loggedUser && <SubFormModal />}
    </Paper>
  );
};

export default TopSubsPanel;
