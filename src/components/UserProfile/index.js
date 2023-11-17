import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Profile from "../Profile";
import Loader from "../Loader";
import { apiConstants } from "../../utils";
import { SettingsContext } from "../../context/SettingsContext";
import "./index.css";
import Header from "../Header";
import Search from "../Search";
import Wrong from "../Wrong";

export default function UserProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const navigate = useNavigate();

  const { dark, searchInput } = useContext(SettingsContext);

  const getUserProfileData = async () => {
    setApiStatus(apiConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`;
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
        const profile = fetchedData.user_details;
        const updatedProfileData = {
          followersCount: profile.followers_count,
          followingCount: profile.following_count,
          id: profile.id,
          posts: profile.posts.map((eachPost) => ({
            id: eachPost.id,
            image: eachPost.image,
          })),
          postsCount: profile.posts_count,
          profilePic: profile.profile_pic,
          stories: profile.stories.map((eachStory) => ({
            id: eachStory.id,
            image: eachStory.image,
          })),
          userBio: profile.user_bio,
          userId: profile.user_id,
          userName: profile.user_name,
        };
        setProfileData(updatedProfileData);
        setApiStatus(apiConstants.success);
      } else {
        setApiStatus(apiConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiConstants.failure);
    }
  };

  useEffect(() => {
    if (Cookies.get("jwt_token") === undefined) {
      return navigate("/login");
    }
    getUserProfileData();
  }, [id]);

  const renderLoader = () => {
    return (
      <div className={`vh-loader-container ${dark ? "dark-bg" : "white-bg"}`}>
        <Loader />
      </div>
    );
  };

  const renderAppropriateView = () => {
    switch (apiStatus) {
      case apiConstants.initial:
        return null;
      case apiConstants.inProgress:
        return renderLoader();
      case apiConstants.success:
        return <Profile caller={"userProfile"} profileDetails={profileData} />;
      default:
        return <Wrong apiCallFunction={getUserProfileData} />;
    }
  };

  return (
    <div
      className={`user-profile-main-container ${dark ? "dark-bg" : "light-bg"}`}
    >
      <Header />
      {searchInput !== "" ? <Search /> : renderAppropriateView()}
    </div>
  );
}
