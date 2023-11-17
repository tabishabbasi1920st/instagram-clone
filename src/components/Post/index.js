import "./index.css";
import { SettingsContext } from "../../context/SettingsContext";
import { useContext, useEffect, useState } from "react";
import { Heart, RedHeart, Comment, Share } from "../../assets";
import { Link } from "react-router-dom";
import { apiConstants } from "../../utils";
import Cookies from "js-cookie";

export default function Post({ post }) {
  const [like, setLike] = useState(false);

  const {
    comments, // Array.
    createdAt,
    likesCount,
    postDetails, //object.
    postId,
    profilePic,
    userId,
    username,
  } = post;

  const {
    dark,
    searchInput,
    searchedDataList,
    searchApiStatus,
    currentUser,
    setCurrentUser,
    setDark,
    setSearchInput,
    setSearchedDataList,
    setSearchApiStatus,
  } = useContext(SettingsContext);

  const onClickLikeBtn = async (likeStatus) => {
    setLike(!like);

    const data = {
      like_status: !likeStatus,
    };

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`;
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
  };

  const onClickPostUsername = () => {
    setSearchInput("");
  };

  const renderUsernameAndDpContainer = () => {
    return (
      <div className="username-and-dp-container">
        <img src={profilePic} alt="post author profile" className="post-dp" />
        <Link to={`/users/${userId}`}>
          <p
            className={`post-username ${dark ? "light-text" : "dark-text"}`}
            onClick={onClickPostUsername}
          >
            {username}
          </p>
        </Link>
      </div>
    );
  };

  const renderPostedImage = () => {
    return (
      <div className="post-img-container">
        <img src={postDetails.imageUrl} alt="post" className="post-img" />
      </div>
    );
  };

  const renderInteractiveButtons = () => {
    return (
      <div className="interactive-btns-container">
        <button
          testid={like ? "unLikeIcon" : "likeIcon"}
          type="button"
          className={`interactive-btns ${dark ? "light-text" : "dark-text"}`}
          onClick={() => onClickLikeBtn(like)}
        >
          {like ? <RedHeart /> : <Heart />}
        </button>
        <button
          type="button"
          className={`interactive-btns ${dark ? "light-text" : "dark-text"}`}
        >
          <Comment />
        </button>
        <button
          type="button"
          className={`interactive-btns ${dark ? "light-text" : "dark-text"}`}
        >
          <Share />
        </button>
      </div>
    );
  };

  const renderPostLikesCount = () => {
    return (
      <p
        className={`post-likes-count ${dark ? "light-text" : "dark-text"}`}
      >{`${like ? likesCount + 1 : likesCount} likes`}</p>
    );
  };

  const renderPostCaption = () => {
    return (
      <p className={`post-caption ${dark ? "light-text" : "dark-text"}`}>
        {postDetails.caption}
      </p>
    );
  };

  const renderCommments = () => {
    return (
      <ul className="comments-container">
        {comments.map((eachComment) => {
          const { comment, userId, username } = eachComment;
          return (
            <li key={userId} className="comment-item">
              <span
                className={`username-span ${dark ? "light-text" : "dark-text"}`}
              >
                {username}{" "}
              </span>
              <span className={`${dark ? "light-text" : "dark-text"}`}>
                {comment}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderPostCreatedTime = () => {
    return <p className="post-created-at">{`${createdAt}`}</p>;
  };

  return (
    <li className="post-item">
      {renderUsernameAndDpContainer()}
      {renderPostedImage()}
      <div className="post-details-container">
        {renderInteractiveButtons()}
        {renderPostLikesCount()}
        {renderPostCaption()}
        {renderCommments()}
        {renderPostCreatedTime()}
      </div>
    </li>
  );
}
