import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function Profile() {
  const [profile, setProfile] = useState({});
  const {userid} = useParams();
  const [followBtn, setFollowBtn] = useState()
  const loggedUser = JSON.parse(sessionStorage.getItem("user"));
  const loggedUserId = loggedUser._id

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
      sessionStorage.setItem("user", JSON.stringify(result.loggedInUser))
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
      console.log(result);
      sessionStorage.setItem("user", JSON.stringify(result.loggedInUser))
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
          <img className="profile-pic" src={profile.user.profilepic} alt=""/>
        </div>
        <div className="user-data">
          <h5>{profile.user.name}
          {
          followBtn?
          <button className="btn-small waves-effect waves-light blue darken-2" style={{marginLeft: "16px"}} onClick={() => followUser()}>Follow</button>
          :
          <button className="btn-small waves-effect waves-light blue darken-2" style={{marginLeft: "16px"}} onClick={() => unfollowUser()}>Unfollow</button>
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
