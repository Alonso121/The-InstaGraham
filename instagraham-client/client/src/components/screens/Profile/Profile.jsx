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
      console.log(posts.myposts);
    })
  }, [])

  //console.log(userData);

  return (
   <div>
      <div className="info-container">
        <div className="pic-container">
          <img className="profile-pic" src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt=""/>
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
