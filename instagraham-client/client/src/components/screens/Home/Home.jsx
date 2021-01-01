import React from "react";
import "./Home.css"
function Home() {
  return (
    <div className="main">
    <div className="card home">
      <h5>Alonso</h5>
      <div className="card-image">
        <img src="https://images.unsplash.com/photo-1601758066440-cbfc06a82914?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt=""/>
      </div>
      <div className="card-content">
      <i className="material-icons">favorite</i>
      <h6>title</h6>
      <p>My cat Trixy</p>
      <input type="text" placeholder="add a comment"/>
      </div>
    </div>
    <div className="card home">
      <h5>Alonso</h5>
      <div className="card-image">
        <img src="https://images.unsplash.com/photo-1601758066440-cbfc06a82914?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt=""/>
      </div>
      <div className="card-content">
      <i className="material-icons">favorite</i>
      <h6>title</h6>
      <p>My cat Trixy</p>
      <input type="text" placeholder="add a comment"/>
      </div>
    </div>
    </div>
  )
}

export default Home;
