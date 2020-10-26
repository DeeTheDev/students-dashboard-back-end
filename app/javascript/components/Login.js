import React, {useState, useEffect} from 'react'
import AuthActions from './sessions/auth_actions.js';
import SessionStore from './sessions/session_store.js';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }
    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        AuthActions.loginRequest(email, password);
        // may not be necessary
        setEmail("") 
        setPassword("")
    }
    const renderAuthErrors = () => {
        let errors = SessionStore.getAuthErrors();
        if (errors.length === 0) { return null; }
        return (
          <ul className='AuthErrors'>{ errors.map((err) => ( <li>{err}</li> )) }</ul>
        );
    }
    const buttonText = SessionStore.isAuthRequestInProgress() ? 'Submitting...' : 'Login';
    return (
        <div>
            <div>
                <h1>Log In</h1>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Username</label>
                        <input value={email} onChange={handleEmailChange} type="text" placeholder="email"/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                    </div>
                    
                    <button disabled={SessionStore.isAuthRequestInProgress()} >{buttonText}</button>
                </form>
                { renderAuthErrors() }
                {/* <button onClick={handleAuthClick} className="ui button">Access Authorized Route</button> */}
                {/* <div>{authorized == {} ? "empty object" : `hello ${authorized.username}`}</div> */}
            </div>
        </div>
    )
}

export default Login