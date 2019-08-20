import { authUser } from "../store/actions/auth";
import { setClient } from "../store/actions/ui";

const clientId = process.env.REACT_APP_CLIENT_ID;
const scope = "https://www.googleapis.com/auth/youtube";
const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
];
const gapi = window.gapi;

// dispatch comes from our redux store
function loadClient(dispatch) {
  gapi.load("client:auth2", () => {
    gapi.client.init({ discoveryDocs, clientId, scope }).then(() => {
      // use the client to see if a user if authenticated already
      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      if (isSignedIn) {
        // dispatch an action to authenticate our user
        dispatch(authUser(getUserInfo));
      }
      // remove the loading icon
      dispatch(setClient());
    });
  });
}

const getUserInfo = () => gapi.auth2.getAuthInstance().currentUser.get();

const signIn = () => gapi.auth2.getAuthInstance().signIn();

const signOut = () => gapi.auth2.getAuthInstance().signOut();

const revokeAccess = () => gapi.auth2.getAuthInstance().disconnect();

export { loadClient, signIn, signOut, revokeAccess };
