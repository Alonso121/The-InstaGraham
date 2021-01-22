import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom"
import { StateContext, DispatchContext } from "./reducers/reducerContext"


function Links() {
    const history = useHistory();
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext)

    function handleLogout() {
        dispatch({type: "logged-out"});
        sessionStorage.clear();
        history.push("/login")
    }

    if(state.isLoggedIn) {
        return[
            <li key="1"><Link to="/profile">Profile</Link></li>,
            <li key="2"><Link to="/create">New Post</Link></li>,
            <li key="3" onClick={ handleLogout }><Link to="/">LogOut</Link></li>
        ]
    } else {
        return [
            <li key="4"><Link to="/login">Login</Link></li>,
            <li key="5"><Link to="/signup">Signup</Link></li>
        ]
    }
}


function Navbar() {
    const state = useContext(StateContext);

    return (
        <div>
            <nav style={{width: '60%', margin: 'auto'}}>
                <div className="nav-wrapper white" style={{color: 'black'}}>
                <Link  to={state.isLoggedIn? "/" : "/login"} className="brand-logo left">InstaGraham</Link>
                <ul id="nav-mobile" className="right">
                    <Links />                    
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
