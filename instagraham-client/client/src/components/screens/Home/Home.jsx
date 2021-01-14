import React, { useEffect, useState } from "react";
import "./Home.css";
import { useReducerState } from "../../reducers/reducerContext"



function Home() {
  const [data, setData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const state = useReducerState();
  const userId = state.userData.user;
  
console.log(data);


  useEffect(() => {
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

  function newCommentHandler({target}) {
    setNewComment(target.value)
  }

  return (
    <div className="main">
      {data.map(post => (
        <div className="card home" key={post._id}>
        <h5>{post.postedBy.name}</h5>
        <div className="card-image">
          <img src={post.photo} alt={post.title}/>
        </div>
        <div className="card-content">

        <h5>{post.title}</h5>
        {post.likes.includes(userId) 
        ? 
        <i className="material-icons" style={{color: "red"}} onClick={()=> unlikesPost(post._id)}>favorite</i>
        : 
        <i className="material-icons" onClick={()=> likesPost(post._id)}>favorite_border</i>}
        
        
        <h6><b>{post.likes.length} likes</b></h6>        
        <p>{post.body}</p>
        {post.comments.map(comment => (
          <h6 key={comment.commentId}> <b>{comment.postedBy.name}</b> {comment.text} </h6>
        ))}
        
        <form onSubmit={(e) => {
          e.preventDefault();
          comment(e.target[0].value, post._id);
          setNewComment("")
        }}>
        <input type="text" placeholder="add a comment" value={newComment} onChange={newCommentHandler}/>
        </form>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Home;
