import Reflux from 'reflux';
import AuthActions from './auth_actions';
import AuthAPI from './auth_api';

// This object is where we'll store all the session state.
// It will be a private variable and if any outside code
// wants to access it, they'll need to use one of the
// accessor methods below.

class AuthStore extends Reflux.Store{
  // Map all the actions in AuthActions to the corresponding
  // methods below
  // this.listenTo[AuthActions],

  constructor(){
    super()
    this.state = {
      authRequestInProgress: false,
      authErrors: [],
      authToken: null,
      username: null,
      userId: null
    };
    this.listenables = AuthActions;
  }

  // When a login request occurs, use the AuthAPI to make
  // an api request to the server and call the appropriate
  // action when it finishes.
  // Trigger a change to alert subscribers about the fact
  // that a request is in progress.
  onLoginRequest (email, password) {
      AuthAPI.login(email, password)
      .then(AuthActions.loginRequest.completed)
      .catch(AuthActions.loginRequest.failed);
      
      this.setState({authRequestInProgress: true})
  }

  // When a login request completes successfully,
  // set the user info to the session state object and
  // trigger a change
  // an api request to the server and call the appropriate
  // action method when it finishes.
  onLoginRequestCompleted (resp) {
      console.log("from the loginRequestComplete function object");
      // this.setState({ authRequestInProgress: false })
      this.setState({ authErrors: [] })
      // => may need to change to jwt from auth_token (grabs jwt token after login)
      this.setState({authToken: resp.jwt})
      this.setState({username: resp.user.username})
      // You'll also need to redirect the user to the proper page,
      // but that's outside the scope of the article
  }

  // When a login request fails, set the auth errors
  // and trigger a change
  onLoginRequestFailed (resp) {
      this.setState({authRequestInProgress: false})
      this.setState({authErrors: resp.errors})
  }

  // When the user logs out, clear out the session state
  // and trigger a change
  onLogout () {
    state = {
      authRequestInProgress: false,
      authErrors: [],
    };
    this.setState(state);
  }

  // Accessor Methods
  getUsername() { return this.state.username; }
  getUserId() { return this.state.userId; }
  isLoggedIn() { return (this.state.authToken !== null); }
  getAuthErrors() { return (this.state.authErrors); }
  isAuthRequestInProgress() { return (this.state.authRequestInProgress === true); }
}

export default AuthStore;
