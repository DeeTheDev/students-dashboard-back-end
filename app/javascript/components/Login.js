import React from 'react';
import Reflux from 'reflux';
import AuthActions from './sessions/auth_actions.js';
import AuthStore from './sessions/AuthStore.js';
import Axios from 'axios';

class Login extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: ""
        };
        this.store = AuthStore;
    }
    handleEmailChange = (evt) => {
        // setEmail(evt.target.value)
        this.setState({ email: evt.target.value })
    }
    handlePasswordChange = (evt) => {
        this.setState({ password: evt.target.value})
    }

    handleLogout= (e) => {
        e.preventDefault();
        return Axios(`/api/v1/logout`, {
          method: 'DELETE',
          credentials: 'include'
        }).then(res => console.log(res))
      }

    handleSubmit = (evt) => {
        evt.preventDefault()
        AuthActions.loginRequest(this.state.email, this.state.password);
        // may not be necessary
    }
    // renderAuthErrors = () => {
    //     let errors = SessionStore.getAuthErrors();
    //     if (errors.length === 0) { return null; }
    //     return (
    //       <ul className='AuthErrors'>{ errors.map((err) => ( <li>{err}</li> )) }</ul>
    //     );
    // }
    
    render() {
        // const buttonText = this.state.isAuthRequestInProgress ? 'Submitting...' : 'Login';
        return (
            <div>
                <div>
                    <h1>Log In</h1>
                    <form className="ui form" onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label>Username</label>
                            <input value={this.state.email} onChange={this.handleEmailChange} type="text" placeholder="email"/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="password"/>
                        </div>
                        {/* <button type="submit">Submit</button> */}
                        <button disabled={this.state.isAuthRequestInProgress} >{this.state.isAuthRequestInProgress ? 'Submitting...' : 'Login'}</button>
                    </form>
                    <button onClick={this.handleLogout}>Logout</button>
                    {/* { this.renderAuthErrors() } */}
                    {/* <button onClick={handleAuthClick} className="ui button">Access Authorized Route</button> */}
                    {/* <div>{authorized == {} ? "empty object" : `hello ${authorized.username}`}</div> */}
                </div>
            </div>
        )
    }
}

export default Login