import "./index.css";
import { SettingsContext } from "../../context/SettingsContext";
import { useContext, useEffect } from "react";
import { Camera, Grid } from "../../assets";

export default function Profile({ profileDetails, caller }) {
  console.log(caller);
  const {
    followersCount,
    followingCount,
    id,
    posts,
    postsCount,
    profilePic,
    stories,
    userBio,
    userId,
    userName,
  } = profileDetails;

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
    setSearchedApiStatus,
  } = useContext(SettingsContext);

  // Dynamic alt attribute values....

  const getUserStoryAlt = () => {
    if (caller === "userProfile") {
      return "user story";
    } else {
      return "my story";
    }
  };

  const getProfileImageAlt = () => {
    if (caller === "userProfile") {
      return "user profile";
    } else {
      return "my profile";
    }
  };

  const getPostImageAlt = () => {
    if (caller === "userProfile") {
      return "user post";
    } else {
      return "my post";
    }
  };

  const renderUserStory = () => {
    return (
      <ul className="profile-story-container">
        {stories.map((eachStory) => {
          const { id, image } = eachStory;
          return (
            <li key={id}>
              <img
                src={image}
                alt={getUserStoryAlt()}
                className="profile-story-img"
              />
            </li>
          );
        })}
      </ul>
    );
  };

  const renderUserName = () => {
    return (
      <p
        className={`user-profile-username ${dark ? "light-text" : "dark-text"}`}
      >
        {userName}
      </p>
    );
  };

  const renderUserBio = () => {
    return (
      <p className={`user-bio ${dark ? "light-text" : "dark-text"}`}>
        {userBio}
      </p>
    );
  };

  const renderUserProfilePic = () => {
    return (
      <img
        src={profilePic}
        alt={getProfileImageAlt()}
        className="user-profile-dp"
      />
    );
  };

  const renderLikesDataContainer = () => {
    return (
      <ul className="likes-data-container">
        <li className="like-item">
          <p className={`like-bold-item ${dark ? "light-text" : "dark-text"}`}>
            {postsCount}
          </p>
          <p className={`like-text ${dark ? "light-text" : "dark-text"}`}>
            posts
          </p>
        </li>
        <li className="like-item">
          <p className={`like-bold-item ${dark ? "light-text" : "dark-text"}`}>
            {followersCount}
          </p>
          <p className={`like-text ${dark ? "light-text" : "dark-text"}`}>
            followers
          </p>
        </li>
        <li className="like-item">
          <p className={`like-bold-item ${dark ? "light-text" : "dark-text"}`}>
            {followingCount}
          </p>
          <p className={`like-text ${dark ? "light-text" : "dark-text"}`}>
            following
          </p>
        </li>
      </ul>
    );
  };

  const renderUserGridIconAndPostTextContainer = () => {
    return (
      <div className="profile-post-container">
        <Grid fontSize={35} color={dark ? "#e4e2db" : "#262626"} />
        <p className={`profile-post-text ${dark ? "light-text" : "dark-text"}`}>
          Post
        </p>
      </div>
    );
  };

  const renderUserProfilePostsContainer = () => {
    return (
      <ul className="profile-posts-container">
        {posts.map((eachPost) => {
          const { id, image } = eachPost;
          return (
            <li key={id} className="profile-post-item">
              <img
                src={image}
                alt={getPostImageAlt()}
                className="profile-post-img"
              />
            </li>
          );
        })}
      </ul>
    );
  };

  const renderNoPostsView = () => {
    return (
      <div className="no-post-camera-container">
        <Camera className="camera-icon" color={dark ? "#262626" : "#262626"} />
        <p className={`no-post-yet-text ${dark ? "light-text" : "dark-text"}`}>
          No Posts Yet
        </p>
      </div>
    );
  };

  return (
    <div className="profile-main-container">
      <div
        className={`profile-body-container ${dark ? "dark-bg" : "white-bg"}`}
      >
        {renderUserName()}
        <div className="sm-profile-details-container">
          {renderUserProfilePic()}
          {renderLikesDataContainer()}
        </div>
        {renderUserName()}
        {renderUserBio()}
        {renderUserStory()}
        {renderUserGridIconAndPostTextContainer()}
        {posts.length === 0
          ? renderNoPostsView()
          : renderUserProfilePostsContainer()}
      </div>
    </div>
  );
}
