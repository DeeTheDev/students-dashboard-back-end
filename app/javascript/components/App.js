import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Users from '../components/Users'
import User from '../components/User'
import Authorized from '../components/Authorized'

const App = () => {
    const [loggedStatus, setLoggedStatus] = useState("Not_logged_In")
    const [user, setUser] = useState({}) 

    return(
        <Switch>
            <Route exact path="/" component={Users}/>
            <Route exact path="/user/:id" component={User}/>
            <Route exact path="/Authorized"
                render={props =>(
                        <Authorized
                            {...props}
                            loggedStatus = {loggedStatus}
                        />
            )}
             />
        </Switch>
    )
}

export default App