import Slider from "react-slick";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { apiConstants } from "../../utils";
import Loader from "../Loader";
import "./index.css";
import { SettingsContext } from "../../context/SettingsContext";
import { useContext } from "react";
import Wrong from "../Wrong";

export default function UserStories() {
  const [usersStory, setUsersStory] = useState([]);

  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const { dark } = useContext(SettingsContext);

  const getUsersStories = async () => {
    setApiStatus(apiConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "https://apis.ccbp.in/insta-share/stories";
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
        const usersStories = fetchedData.users_stories;
        const updatedUsersStories = usersStories.map((eachObj) => ({
          storyUrl: eachObj.story_url,
          userId: eachObj.user_id,
          username: eachObj.user_name,
        }));
        setUsersStory(updatedUsersStories);
        setApiStatus(apiConstants.success);
      } else {
        setApiStatus(apiConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiConstants.failure);
    }
  };

  useEffect(() => {
    getUsersStories();
  }, []);

  const settings = {
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const renderUserStoriesContainer = () => {
    return (
      <Slider {...settings}>
        {usersStory.map((eachObj) => {
          const { storyUrl, userId, username } = eachObj;
          return (
            <li key={userId} className="story-item">
              <img src={storyUrl} alt="user story" className="story-img" />
              <p
                className={`story-username ${
                  dark ? "light-text" : "dark-text"
                }`}
              >
                {username}
              </p>
            </li>
          );
        })}
      </Slider>
    );
  };

  const renderAppropriateView = () => {
    switch (apiStatus) {
      case apiConstants.initial:
        return null;
      case apiConstants.inProgress:
        return <Loader />;
      case apiConstants.success:
        return renderUserStoriesContainer();
      default:
        return <Wrong apiCallFunction={getUsersStories} />;
    }
  };

  return (
    <div className={`slick-main-container ${dark ? "dark-bg" : "white-bg"}`}>
      {renderAppropriateView()}
    </div>
  );
}
