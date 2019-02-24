import React from "react";
import PlaylistsTab from "../containers/PlaylistsTab";
import PlayerTab from "../containers/PlayerTab";

const NavTabContainers = ({ value }) => (
  // <div style={{ padding: "5px" }}>
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

export default NavTabContainers;
