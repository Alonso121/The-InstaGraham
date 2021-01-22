import React, { useEffect, useState } from "react";
import "./Profile.css"


function Profile() {
  const [posts, setPosts] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("user"))

  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt}`
      }
    }).then(res => res.json())
    .then(posts => {
      setPosts(posts.myposts)
    })
  }, [])


  return (
   <div>
      <div className="info-container">
        <div className="pic-container">
          <img className="profile-pic" src={userData.profilepic} alt=""/>
        </div>
        <div className="user-data">
          <h5>{userData.name}</h5>
          <ul className="follow-info">
            <h6><strong>{posts.length}</strong> posts</h6>
            <h6><strong>{userData.followers.length}</strong> followers</h6>
            <h6><strong>{userData.following.length}</strong> following</h6>
          </ul>
        </div>
      </div>
      <div className="gallery">
      {posts.map(post => (
        <img className="item" key={post._id} src={post.photo} alt=""/>
      ))}
      
      </div>
  </div>
  )
}

export default Profile;
