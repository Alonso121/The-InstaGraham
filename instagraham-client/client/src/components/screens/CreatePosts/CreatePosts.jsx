import React, {useState} from 'react';
import "./CreatePosts.css"
import {useHistory} from "react-router-dom"
import M from "materialize-css"

function CreatePosts() {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    

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
        .then(data => postUploader(data.secure_url))
        .catch(err =>{
            console.log(err);
        })               
    }

    const postUploader = (url) => {
    fetch("/createpost", {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({
            title,
            body,
            pic: url
        })
    }).then(res => res.json())
    .then(data => {
        if(data.error) {
            M.toast({html: data.error, classes:"#c62828 red darken-3"})
        } else {
            M.toast({html: "Post created successfully", classes:"#66bb6a green lighten-1"})
            history.push("/")
        }
    }).catch(err => {
        console.log(err);
    })

}
    const titleHandler = ({target}) => {
        setTitle(() => target.value)
    }
    const bodyHandler = ({target}) => {
        setBody(() => target.value)
    }


    return (
        <div className="card input-field">
            <input type="text" placeholder="title" value={title} onChange={titleHandler}/>
            <input type="text" placeholder="body" value={body} onChange={bodyHandler}/>
            
            <div className="file-field input-field">
            <div className="btn blue dark-2">
                <span>Upload Image</span>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light blue dark-2"
            onClick={postDetails}>
            Submit
                </button>

        </div>
    )
}

export default CreatePosts
