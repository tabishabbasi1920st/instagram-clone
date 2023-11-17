import { useContext, useEffect } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { searchImage } from "../../assets";
import Loader from "../Loader";
import Post from "../Post";
import "./index.css";
import { apiConstants } from "../../utils";
import { NoSearchFoundImage } from "../../assets";
import Wrong from "../Wrong";

export default function Search() {
  const {
    dark,
    searchInput,
    searchedDataList,
    searchApiStatus,
    showSearchBar,
    setShowSearchBar,
    setDark,
    setSearchInput,
    setSearchedDataList,
    setSearchApiStatus,
    showHamMenu,
    setShowHamMenu,
    getSearchData,
  } = useContext(SettingsContext);

  useEffect(() => {
    return () => {
      setSearchedDataList([]);
      setSearchApiStatus(apiConstants.initial);
      setSearchInput("");
      setShowSearchBar(false);
      if (showHamMenu) {
        setShowHamMenu(false);
      }
    };
  }, []);

  const renderSearchInitialView = () => {
    return (
      <div className="search-initial-view-container">
        <img
          src={searchImage}
          alt=""
          className={`lens-img ${dark ? "brightness" : ""}`}
        />
        <p
          className={`search-result-appear-here-text ${
            dark ? "light-text" : "dark-text"
          }`}
        >
          Search Results will be appear here
        </p>
      </div>
    );
  };

  const renderSearchLoaderView = () => {
    return (
      <div
        className={`search-loader-container ${dark ? "dark-bg" : "light-bg"}`}
      >
        <Loader />
      </div>
    );
  };

  const renderSearchedDataView = () => {
    return (
      <div>
        {searchedDataList.map((eachPost) => (
          <Post key={eachPost.postId} post={eachPost} />
        ))}
      </div>
    );
  };

  const renderNoSearchFoundView = () => {
    return (
      <div
        className={`no-search-found-img-container ${
          dark ? "dark-bg" : "light-bg"
        }`}
      >
        <img src={NoSearchFoundImage} alt="search not found" className="no-search-found-img" />
        <p
          className={`search-not-found-text ${
            dark ? "light-text" : "dark-text"
          }`}
        >
          Search Not Found
        </p>
        <p
          className={`try-different-keyword-text ${
            dark ? "light-text" : "dark-text"
          }`}
        >
          Try different keyword or search again
        </p>
      </div>
    );
  };

  const renderSearchAppropriateView = () => {
    switch (searchApiStatus) {
      case apiConstants.initial:
        return renderSearchInitialView();
      case apiConstants.inProgress:
        return renderSearchLoaderView();
      case apiConstants.success:
        return renderSearchedDataView();
      default:
        return <Wrong apiCallFunction={getSearchData} />;
    }
  };

  return (
    <div className={`search-page-container ${dark ? "dark-bg" : "light-bg"}`}>
      {renderSearchAppropriateView()}
      {searchedDataList.length === 0 &&
        searchApiStatus === apiConstants.success &&
        renderNoSearchFoundView()}
    </div>
  );
}
