import React from 'react';
import {Link} from "react-router-dom"
import { useReducerState, useDispatch } from "./reducers/reducerContext"


function Links() {
    const state = useReducerState();
    const dispatch = useDispatch()
    console.log(state);
    if(state.isLoggedIn) {
        return[
            <li key="1"><Link to="/profile">Profile</Link></li>,
            <li key="2"><Link to="/create">New Post</Link></li>,
            <li key="3" onClick={() => dispatch({type: "logged-out"})}><Link to="/">LogOut</Link></li>
        ]
    } else {
        return [
            <li key="4"><Link to="/">Login</Link></li>,
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
                <Link  to={state.isLoggedIn? "/home" : "/"} className="brand-logo">InstaGraham</Link>
                <ul id="nav-mobile" className="right">
                    <Links />                    
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
