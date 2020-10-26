import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Users from './Users'
import User from './User'
import Authorized from './Authorized'
import Login from './Login'

const App = () => {
    const [loggedStatus, setLoggedStatus] = useState("Not_logged_In")
    const [user, setUser] = useState({}) 

    return(
        <Switch>
            <Route exact path="/" component={Users}  />
            <Route exact path="/login" component={Login}  />
            <Route exact path="/user/:id" component={User}/>
            <Route exact path="/Authorized"
                render={props =>(
                        <Authorized {...props}
                            loggedStatus = {loggedStatus}
                        />
            )}
             />
        </Switch>
    )
}

export default App