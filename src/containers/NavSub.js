import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import NavTabs from "../components/NavTabs";
import NavTabContainers from "../components/NavTabContainers";
import { handleTabChange } from "../store/actions/ui";

const getState = state => ({
  plUpdAvail: state.ui.playlists.updateAvailCount,
  tabValue: state.ui.tabValue,
  isAuthenticated: state.currentUser.isAuthenticated,
  isPlayerActive: !!state.player.currentVideoId
});

// uses the tabValue in redux store to display the correct tabs
export default function NavSub() {
  const dispatch = useDispatch();
  const state = useSelector(getState, shallowEqual);
  const { isAuthenticated, tabValue, isPlayerActive, plUpdAvail } = state;

  return (
    <>
      <NavTabs
        value={tabValue}
        handleChange={(e, value) => dispatch(handleTabChange(value))}
        isAuthenticated={isAuthenticated}
        isPlayerActive={isPlayerActive}
        plUpdAvail={plUpdAvail}
      />
      <NavTabContainers value={tabValue} />
    </>
  );
}
