import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css";
import { useDispatch } from "../../reducers/reducerContext"

function Login() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailHandler = ({target}) => {
        setEmail(() => target.value)
    }
    const passwordHandler = ({target}) => {
        setPassword(() => target.value)
    }

    const PostData = () => {
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({html: "invalid email", classes:"#c62828 red darken-3"})
        }
        fetch("/signin", {
            method:"post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.error) {
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            } else {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                M.toast({html: "sign in successful", classes:"#66bb6a green lighten-1"})
                dispatch({type: "logged-in"})
                history.push("/home")
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>InstaGraham</h2>
                <input type="text" placeholder="email" value={email} onChange={emailHandler}/>
                <input type="password" placeholder="password" value={password} onChange={passwordHandler}/>
                <button className="btn waves-effect waves-light blue darken-2" onClick={() => PostData()}>Login</button>
                <p>
                    Don't have an account? Sign up 
                    <Link to="/signup"> <strong>here!</strong></Link>
                </p>
            </div>
        </div>
    )
}

export default Login
