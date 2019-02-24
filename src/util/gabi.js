const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
];
const SCOPES = "https://www.googleapis.com/auth/youtube";

const gapi = window.gapi;

const loadClient = initClient => gapi.load("client:auth2", initClient);

function initClient() {
  gapi.client
    .init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    })
    .then(() => {
      // use the client to see if a user if authenticated already
      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      if (isSignedIn) {
        // dispatch an action to authenticate our user
        this.props.authUser(gapiGetUserInfo);
      }
      // remove the loading icon
      this.props.handleClient();
    });
}

const gapiGetUserInfo = () => gapi.auth2.getAuthInstance().currentUser.get();

const gapiSignIn = () => gapi.auth2.getAuthInstance().signIn();

const gapiSignOut = () => gapi.auth2.getAuthInstance().signOut();

const gapiRevoke = () => gapi.auth2.getAuthInstance().disconnect();

export {
  loadClient,
  initClient,
  gapiGetUserInfo,
  gapiSignIn,
  gapiSignOut,
  gapiRevoke
};
