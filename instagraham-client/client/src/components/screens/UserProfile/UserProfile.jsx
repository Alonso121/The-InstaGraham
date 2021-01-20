import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function Profile() {
  const [profile, setProfile] = useState({});
  const {userid} = useParams();
  const [followBtn, setFollowBtn] = useState()
  const loggedUser = JSON.parse(sessionStorage.getItem("user"));
  const loggedUserId = loggedUser.user
  
  useEffect(() => {
    fetch(`/profile/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
      }
    }).then(res => res.json())
    .then(result => {
      setProfile(result);
      if(result.user.followers.includes(loggedUserId)){
        setFollowBtn(false)
      } else {
        setFollowBtn(true)
      }
    })
  }, [userid, loggedUserId])
  

  function followUser () {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        followId: userid
      })
    }).then(res => res.json())
    .then(result => {
      setProfile((prevState) => {
        return {...prevState, user: result.followedUser}
      })
      setFollowBtn(false)
    })
  }

  function unfollowUser () {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        followId: userid
      })
    }).then(res => res.json())
    .then(result => {
      setProfile((prevState) => {
        return {...prevState, user: result.followedUser}
      })
      setFollowBtn(true)
    })
  }


  return (
    <>
    {profile.user ? 
   <div>
      <div className="info-container">
        <div className="pic-container">
          <img className="profile-pic" src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt=""/>
        </div>
        <div className="user-data">
          <h5>{profile.user.name}
          {
          followBtn?
          <button className="btn-small waves-effect waves-light blue darken-2" onClick={() => followUser()}>Follow</button>
          :
          <button className="btn-small waves-effect waves-light blue darken-2" onClick={() => unfollowUser()}>Unfollow</button>
          }
          </h5>
          <ul className="follow-info">
            <h6><strong>{profile.posts.length}</strong> posts</h6>
            <h6><strong>{profile.user.followers.length}</strong> followers</h6>
            <h6><strong>{profile.user.following.length}</strong> following</h6>
          </ul>
        </div>
      </div>
      <div className="gallery">
      {profile.posts.map(post => (
        <img className="item" key={post._id} src={post.photo} alt=""/>
      ))}
      </div>
  </div>

  : <h2>Loading...</h2>}
  </>
  )
}

export default Profile;
