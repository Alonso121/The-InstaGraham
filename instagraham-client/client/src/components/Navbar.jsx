import React from 'react';
import {Link} from "react-router-dom"

function Navbar() {
    return (
        <div>
            <nav style={{width: '60%', margin: 'auto'}}>
                <div className="nav-wrapper white" style={{color: 'black'}}>
                <Link to="/" className="brand-logo">InstaGraham</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/signin">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">New Post</Link></li>
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
