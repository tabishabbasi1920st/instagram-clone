import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Profile from "../Profile";
import Loader from "../Loader";
import { apiConstants } from "../../utils";
import { SettingsContext } from "../../context/SettingsContext";
import { useContext } from "react";
import "./index.css";
import Header from "../Header";
import Search from "../Search";
import Wrong from "../Wrong";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [profileData, setProfileData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const { dark, searchInput } = useContext(SettingsContext);

  const navigate = useNavigate();

  const getMyProfileData = async () => {
    setApiStatus(apiConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "https://apis.ccbp.in/insta-share/my-profile";
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
        const profile = fetchedData.profile;
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
    getMyProfileData();
  }, []);

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
        return <Profile caller={"myProfile"} profileDetails={profileData} />;
      default:
        return <Wrong apiCallFunction={getMyProfileData} />;
    }
  };

  return (
    <div
      className={`my-profile-main-container ${dark ? "dark-bg" : "white-bg"}`}
    >
      <Header />
      {searchInput !== "" ? <Search /> : renderAppropriateView()}
    </div>
  );
}
