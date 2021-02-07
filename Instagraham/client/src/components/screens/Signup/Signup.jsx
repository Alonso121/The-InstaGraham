import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css";
import "./Signup.css"


function Signup() {
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState("")


    const nameHandler = ({target}) => {
        setName(() => target.value)
    }
    const emailHandler = ({target}) => {
        setEmail(() => target.value)
    }
    const passwordHandler = ({target}) => {
        setPassword(() => target.value)
    }
    
    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-graham")
        data.append("cloud_name", "my-files")

       
        fetch("https://api.cloudinary.com/v1_1/my-files/image/upload", {
            method:"post",
            body:data
        })
        .then(res=> res.json())
        .then(data => PostData(data.url))
        .catch(err =>{
            console.log(err);
        })               
    }


    const PostData = (image) => {
        console.log(typeof(image), image);
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({html: "invalid email", classes:"#c62828 red darken-3"})
        }
        fetch("/signup", {
            method:"post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                profilepic: image
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            } else {
                M.toast({html: data.message, classes:"#66bb6a green lighten-1"})
                history.push("/login")
            }
        }).catch(err => {
            console.log(err);
        }) 
    }

    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>InstaGraham</h2>
                <input type="text" placeholder="name" value={name} onChange={nameHandler} />
                <input type="text" placeholder="email" value={email} onChange={emailHandler} />
                <input type="password" placeholder="password" value={password} onChange={passwordHandler} />
                <div className="file-field input-field">
                    <div className="btn blue dark-2">
                        <span>Upload Profile Picture</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light blue dark-2" onClick={postDetails}>SignUp</button>
                <p>
                    Already have an account?
                    <Link to="/login"> <strong>Click here!</strong></Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;
