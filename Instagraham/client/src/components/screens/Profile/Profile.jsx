import React, { useEffect, useState, useContext } from "react";
import styles from'./Profile.module.css'
import { StateContext, DispatchContext } from "../../reducers/reducerContext"
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'


function Profile() {
  const history = useHistory()
  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext);
  const userData = state.userData

  console.log(userData);
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState("")
  const [dispState, setDispState] = useState("none")

  

  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt}`
      }
    }).then(res => res.json())
    .then(posts => {
      setPosts(posts.myposts)
      console.log(posts);
    })
  }, [])

  const postDetails = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "ml_default")
    data.append("cloud_name", "my-files")

   
    fetch("https://api.cloudinary.com/v1_1/my-files/image/upload", {
        method:"post",
        body:data
    })
    .then(res=> res.json())
    .then(data => {
      console.log(data.url);
      changePic(data.url)
    })
    .catch(err => {
        console.log(err);
    })               
}

const changePic = (image) => {
  fetch("/changepic", {
    method:"put",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
      id: userData._id,
      profilepic: image
    })
}).then(res => res.json())
.then(data => {
  dispatch({type: "logged-in", payload: data.loggedInUser})
   setDispState('none')
}).catch(err => {
    console.log(err);
})
}


  function toggleDisplay() {
    if(dispState === 'none') {
      setDispState('block')
    } else {
      setDispState('none')
    }
  }

  function deleteAccount() {
    console.log('sending request');
    fetch(`/delete-account/${userData._id}`, {
      method: "put",
      headers: {        
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.jwt}`
      }
    })
    .then(res => res.json())
    .then(() => {
      M.toast({html: "Account deleted successfully! Sorry to see you go!", classes:"#66bb6a green lighten-1 ", displayLength: 1000})
    })

    dispatch({type: 'logged-out'})
    history.push('/signup')
    sessionStorage.clear() 
    
  }


  return (
   <div className={styles.mainContainer}>
     {!userData ? <h1>Loading</h1> :
      <div className={styles.infoContainer}>
        <div className={styles.picContainer}>
          <img className={styles.profilePic} src={userData.profilepic} alt=""/>
          <div className={styles.overlay} onClick={toggleDisplay}><p>Change pic?</p></div>
        </div>
        
        <div className={styles.userData}>
          <div className={styles.userName}>
          <h5>{userData.name}</h5>
        <button className="btn waves-effect waves-light red darken-2" onClick={deleteAccount}>Delete Account</button>
        </div>
          <ul className={styles.followInfo}>
            <h6><strong>{posts.length}</strong> posts</h6>
            <h6><strong>{userData.followers.length}</strong> followers</h6>
            <h6><strong>{userData.following.length}</strong> following</h6>
          </ul>
        </div>
      </div>
      }
      <div className="card auth-card input-field" style={{display: dispState}}>
      <div className="file-field input-field">
                    <div className="btn blue dark-2">
                        <span>Choose Profile Picture</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light blue dark-2" onClick={postDetails}>Upload</button>
                </div>
      <div className={styles.gallery}>
      {posts.map(post => (
        <img className={styles.post} key={post._id} src={post.photo} alt=""/>
      ))}
      
      </div>
      
  </div>
  )
}

export default Profile;
