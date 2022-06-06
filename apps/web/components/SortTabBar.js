import React from "react";

import { Paper, Tabs, Tab } from "@material-ui/core";
import { useSortTabStyles } from "../styles/muiStyles";

const SortTabBar = ({ sortBy, handleTabChange, subscribedTab, user }) => {
  const classes = useSortTabStyles();

  return (
    <Paper variant="outlined" className={classes.mainPaper}>
      <Tabs
        value={sortBy}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon="" label="Hot" value="hot" />
        {subscribedTab && user && (
          <Tab icon={""} label="Subscribed" value="subscribed" />
        )}
        <Tab icon="" label="Best" value="best" />
        <Tab icon="" label="New" value="new" />
        <Tab icon="" label="Top" value="top" />
        <Tab icon="" label="Controversial" value="controversial" />
        <Tab icon="" label="Old" value="old" />
      </Tabs>
    </Paper>
  );
};

export default SortTabBar;
