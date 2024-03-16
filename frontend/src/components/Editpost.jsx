import react, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/NewPost.css";

export default function Editpost() {
  let [username, setUsername] = useState("");
  let [blogtitle, setBlogtitle] = useState("");
  let [blogcontent, setBlogcontent] = useState("");
  const [id ,setBlogId] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  let returnHome = async (e) => {
    e.preventDefault();
    navigate("/farmertofarmer");
  };

  useEffect(() => {
    setBlogId(location.state._id);
    setUsername(location.state.username);
    setBlogtitle(location.state.blogtitle);
    setBlogcontent(location.state.blogcontent);
  },[]);

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/updatepost", {
        method: "post",
        body: JSON.stringify({id,username, blogtitle, blogcontent }), //providing to server
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      ></link>
      <script
        src="https://kit.fontawesome.com/dd438282bc.js"
        crossOrigin="anonymous"
      ></script>

      <nav className="navbar bg-body-tertiary expertNavbar">
        <div className="container-fluid">
          <div className="headingExpert">
            <i onClick={returnHome} className="fa-solid fa-circle-left"></i>
          </div>
        </div>
      </nav>
      <div className="postBlock">
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              value={blogtitle}
              onChange={(e) => setBlogtitle(e.target.value)}
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter blog title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Content
            </label>
            <textarea
              value={blogcontent}
              onChange={(e) => setBlogcontent(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button onClick={updatePost} type="button" className="btn btn-primary">
            Send Post
          </button>
        </form>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
