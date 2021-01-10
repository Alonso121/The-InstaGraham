import React, { useEffect, useState } from "react";
import "./Home.css";


function Home() {
  const [data, setData] = useState([])
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

  return (
    <div className="main">
      {data.map(post => (
        <div className="card home" key={post._id}>
        <h5>{post.postedBy.name}</h5>
        <div className="card-image">
          <img src={post.photo} alt={post.title}/>
        </div>
        <div className="card-content">
        <i className="material-icons">favorite</i>
        <h6>{post.title}</h6>
        <p>{post.body}</p>
        <input type="text" placeholder="add a comment"/>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Home;
