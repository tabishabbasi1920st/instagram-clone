import React from "react";
import { useState } from "react";
import { apiConstants } from "../utils";
import Cookies from "js-cookie";

export const SettingsContext = React.createContext(null);

const SettingsProvider = ({ children }) => {
  const [dark, setDark] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchedDataList, setSearchedDataList] = useState([]);
  const [searchApiStatus, setSearchApiStatus] = useState(apiConstants.initial);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showHamMenu, setShowHamMenu] = useState(false);

  const getSearchData = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`;
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
        const posts = fetchedData.posts;
        const updatedPosts = posts.map((eachObj) => ({
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
        setSearchedDataList(updatedPosts);
        setSearchApiStatus(apiConstants.success);
      } else {
        setSearchApiStatus(apiConstants.failure);
      }
    } catch (error) {
      setSearchApiStatus(apiConstants.failure);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        dark: dark,
        setDark: setDark,
        searchInput: searchInput,
        setSearchInput: setSearchInput,
        searchedDataList: searchedDataList,
        setSearchedDataList: setSearchedDataList,
        searchApiStatus: searchApiStatus,
        setSearchApiStatus: setSearchApiStatus,
        showSearchBar: showSearchBar,
        setShowSearchBar: setShowSearchBar,
        showHamMenu: showHamMenu,
        setShowHamMenu: setShowHamMenu,
        getSearchData: getSearchData,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
