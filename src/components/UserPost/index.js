import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { apiConstants } from "../../utils";
import Loader from "../Loader";
import Post from "../Post";
import { SettingsContext } from "../../context/SettingsContext";
import "./index.css";
import Wrong from "../Wrong";

export default function UserPost() {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [postsList, setPostsList] = useState([]);

  const { dark } = useContext(SettingsContext);

  const getUserPost = async () => {
    setApiStatus(apiConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "https://apis.ccbp.in/insta-share/posts";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const fetchedData = await response.json();
      if (response.ok) {
        const postList = fetchedData.posts;
        const updatedPostList = postList.map((eachObj) => ({
          comments: eachObj.comments.map((eachItem) => ({
            comment: eachItem.comment,
            userId: eachItem.user_id,
            username: eachItem.user_name,
          })),
          createdAt: eachObj.created_at,
          likesCount: eachObj.likes_count,
          postDetails: {
            caption: eachObj.post_details.caption,
            imageUrl: eachObj.post_details.image_url,
          },
          postId: eachObj.post_id,
          profilePic: eachObj.profile_pic,
          userId: eachObj.user_id,
          username: eachObj.user_name,
        }));
        setPostsList(updatedPostList);
        setApiStatus(apiConstants.success);
      } else {
        setApiStatus(apiConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiConstants.failure);
    }
  };

  useEffect(() => {
    getUserPost();
  }, []);

  const renderAllPosts = () => {
    return (
      <ul
        className={`user-posts-main-container ${dark ? "dark-bg" : "white-bg"}`}
      >
        {postsList.map((eachObj) => (
          <Post post={eachObj} key={eachObj.postId} />
        ))}
      </ul>
    );
  };

  const renderPostLoader = () => {
    return (
      <div className={`post-loader-container ${dark ? "dark-bg" : "light-bg"}`}>
        <Loader />
      </div>
    );
  };

  const renderAppropriateView = () => {
    switch (apiStatus) {
      case apiConstants.initial:
        return null;
      case apiConstants.inProgress:
        return renderPostLoader();
      case apiConstants.success:
        return renderAllPosts();
      default:
        return <Wrong apiCallFunction={getUserPost} />;
    }
  };

  return (
    <div className="users-post-page-container">{renderAppropriateView()}</div>
  );
}
