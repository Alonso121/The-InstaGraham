import React from 'react';
import {Link, useHistory} from "react-router-dom"
import { useReducerState, useDispatch } from "./reducers/reducerContext"


function Links() {
    const history = useHistory();
    const state = useReducerState();
    const dispatch = useDispatch()
    console.log(state);

    function handleLogout() {
        dispatch({type: "logged-out"});
        localStorage.clear();
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
    const state = useReducerState();

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
