import React from "react";
import { useSelector } from "react-redux";
import PlaylistsTab from "./PlaylistsTab";
import PlayerTab from "./PlayerTab";

export default function TabContent() {
  const value = useSelector(state => state.ui.tabValue);

  return (
    <div>
      {value === 0 && (
        <div>
          <p>add</p>
          <p>info</p>
          <p>here</p>
        </div>
      )}
      {value === 1 && <PlaylistsTab />}
      {value === 2 && <PlayerTab />}
      {value === 3 && (
        <div>
          <p>add</p>
          <p>subs</p>
          <p>here</p>
        </div>
      )}
      {value === 4 && (
        <div>
          <p>add</p>
          <p>help</p>
          <p>here</p>
        </div>
      )}
    </div>
  );
}
