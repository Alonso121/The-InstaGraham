import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom"


function Home() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("")
  
  console.log(data);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(!user) {
      return
    }
    setUserId(user.user);
    fetch("/allposts", {
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt}`
      }
    }).then(response => response.json())
    .then(data => {
      setData(data.posts);
    })
  }, [])

  function likesPost(id) {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-type":"application/json",
        Authorization: `Bearer ${sessionStorage.jwt}`
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
    .then(result => {
      //console.log(result);
      const newData = data.map(post => {
        if (post._id === result._id) {
          return result
        } else {
          return post;
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err);
    })
  }

  function unlikesPost(id) {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-type":"application/json",
        Authorization: `Bearer ${sessionStorage.jwt}`
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
    .then(result => {
      //console.log(result);
      const newData = data.map(post => {
        if (post._id === result._id) {
          return result
        } else {
          return post;
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err);
    })
  }

  function comment(text, postId) {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${sessionStorage.jwt}`
      },
      body: JSON.stringify({
        text,
        postId
      })
    }).then(res => res.json())
    .then(result => {
      //console.log(result);
      const newData = data.map(post => {
        if (post._id === result._id) {
          return result
        } else {
          return post;
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err);
    })
  }

  function deletePost(postId) {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
      }
    })
    .then(res => res.json())
    .then(result => {
      const newData = data.filter(post => {
        return post._id !== result._id
      })
      setData(newData)
    })
  }

  function deleteComment(comment, postId, postedById) {
    const {commentId} = comment;
    console.log(commentId, postId);
    fetch(`/deletecomment/${postId}/${commentId}`,{
      method: "put",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postedById
      })
    })
    .then(res => res.json())
    .then(result => {
      const newData = data.map(post => {
        if (post._id === result._id) {
          return result
        } else {
          return post;
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err);
    })
  }

 

  return (
    <div className="main">
      
      {data.map(post => (
        <div className="card home" key={post._id}>
            <h5 style={{padding: ".3rem"}}>
              <Link to={`/profile/${post.postedBy._id}`}>{post.postedBy.name}</Link>
              {post.postedBy._id === userId
              ?  
              <i className  ="material-icons right" style={{float: "right"}} onClick={() => deletePost(post._id)}>delete</i> 
              :
              null }
            </h5>
        <div className="card-image">
          <img src={post.photo} alt={post.title}/>
        </div>
        <div className="card-content">

        <h5>{post.title}</h5>
        {post.likes.includes(userId) 
        ? 
        <i className="material-icons heart" style={{color: "red"}} onClick={()=> unlikesPost(post._id)}>favorite</i>
        : 
        <i className="material-icons heart" onClick={()=> likesPost(post._id)}>favorite_border</i>}        
        
        <h6><b>{post.likes.length} likes</b></h6>        
        <p>{post.body}</p>
        {post.comments.map(comment => (
          <h6 key={comment.commentId}> 
          {comment.postedBy._id === userId ?
          <Link to={"/profile"}><b>{comment.postedBy.name}</b></Link>
          :
          <Link to={`/profile/${comment.postedBy._id}`}><b>{comment.postedBy.name}</b></Link> 
        }
          <span className="comments">{comment.text} </span>
        
          {
             comment.postedBy._id === userId ||  post.postedBy._id === userId 
            ? 
            <i className  ="material-icons tiny" style={{float: "right"}} onClick={() => deleteComment(comment, post._id, post.postedBy._id)}>delete</i>
            :
            null
          }
          </h6>
        ))}
        
        <form onSubmit={(e) => {
          e.preventDefault();
          comment(e.target[0].value, post._id);
          e.target[0].value = ""
        }}>
        <input type="text" placeholder="add a comment" />
        </form>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Home;
