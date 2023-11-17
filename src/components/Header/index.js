import "./index.css";
import { websiteLogoImgUrl, searchImage, CloseButton } from "../../assets";
import {
  HamburgerMenu,
  LightBulbOff,
  LightBulbOn,
  SearchIcon,
} from "../../assets";
import { SettingsContext } from "../../context/SettingsContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { apiConstants } from "../../utils";

export default function Header() {
  // Using context to toggle theme.
  const {
    dark,
    setDark,
    searchInput,
    setSearchInput,
    setSearchedDataList,
    setSearchApiStatus,
    showSearchBar,
    setShowSearchBar,
    showHamMenu,
    setShowHamMenu,
    getSearchData,
  } = useContext(SettingsContext);

  // To navigate user to another page route.
  const navigate = useNavigate();

  // handling search input change here.
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  //Handling when click on search icon.
  const handleSearchIconClick = async () => {
    setSearchApiStatus(apiConstants.inProgress);
    getSearchData();
  };

  // Function to use toggle theme.
  const toggleTheme = () => {
    setDark(!dark);
  };

  // Function to handle Logout stuff.
  const onClickLogoutBtn = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  // Function to handle when click on hamburger menu button.
  const onClickHamMenu = () => {
    setShowHamMenu(true);
  };

  const handleOnClickCloseButton = () => {
    setShowHamMenu(false);
  };

  // Handle click on search nav-link in small devices.
  const onClickSearchLink = () => {
    setShowSearchBar(!showSearchBar);
  };

  // Functional component to render website logo.
  const renderWebsiteLogo = () => {
    return (
      <Link to="/">
        <img
          src={websiteLogoImgUrl}
          alt="website logo"
          className="header-web-logo"
        />
      </Link>
    );
  };

  // Functional Component to render Hamburger menu button.
  const renderHamburgerMenuButton = () => {
    return (
      <button
        type="button"
        className={`ham-menu-btn ${dark ? "light-text" : "dark-text"}`}
        onClick={onClickHamMenu}
      >
        <HamburgerMenu />
      </button>
    );
  };

  // Functional Component to render Insta Share Heading.
  const renderInstaShareHeading = () => {
    return (
      <h1
        className={`insta-share-heading ${dark ? "light-text" : "dark-text"}`}
      >
        Insta Share
      </h1>
    );
  };

  // Function component to render theme button.
  const renderThemeButton = () => {
    return (
      <>
        <button
          type="button"
          className={`theme-btn ${dark ? "light-text" : "dark-text"}`}
          onClick={toggleTheme}
        >
          {dark ? <LightBulbOn /> : <LightBulbOff />}
        </button>
      </>
    );
  };

  // Functional component to render searchbar.
  const renderSearch = () => {
    return (
      <div className="search-container">
        <input
          type="search"
          className={`search-input`}
          placeholder="Search here"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button
          testid="searchIcon"
          type="button"
          className="search-btn"
          onClick={handleSearchIconClick}
        >
          <SearchIcon />
        </button>
      </div>
    );
  };

  const renderCloseNavButton = () => {
    return (
      <button
        className={`sm-nav-close-btn ${dark ? "light-text" : "dark-text"}`}
        onClick={handleOnClickCloseButton}
      >
        <CloseButton />
      </button>
    );
  };

  // Functional Component to render Navigation Options container.
  const renderNavOptionsContainer = () => {
    return (
      <ul className="nav-options-container">
        <li className="theme-btn-item">{renderSearch()}</li>
        <li>
          <Link to="/">
            <button
              className={`nav-link ${dark ? "light-text" : "dark-text"}`}
              type="button"
            >
              Home
            </button>
          </Link>
        </li>
        <li>
          <button
            className={`nav-link-search ${dark ? "light-text" : "dark-text"}`}
            type="button"
            onClick={onClickSearchLink}
          >
            Search
          </button>
        </li>
        <li>
          <Link to="/my-profile">
            <button
              className={`nav-link ${dark ? "light-text" : "dark-text"}`}
              type="button"
            >
              Profile
            </button>
          </Link>
        </li>
        <li className="theme-btn-item">{renderThemeButton()}</li>
        <li>
          <button
            className="nav-logout-btn"
            type="button"
            onClick={onClickLogoutBtn}
          >
            Logout
          </button>
        </li>
        <li className="close-button-item">{renderCloseNavButton()}</li>
      </ul>
    );
  };

  return (
    <div className={`header-main-container ${dark ? "dark-bg" : "light-bg"} `}>
      <nav className="sm-navbar">
        <div className="sm-nav-first-container">
          {renderWebsiteLogo()}
          {renderInstaShareHeading()}
          <div className="sm-nav-second-container">
            {renderThemeButton()}
            {renderHamburgerMenuButton()}
          </div>
        </div>
        {showHamMenu && renderNavOptionsContainer()}
        {showSearchBar && renderSearch()}
      </nav>

      <nav className="lg-navbar">
        {renderWebsiteLogo()}
        {renderInstaShareHeading()}
        {renderNavOptionsContainer()}
      </nav>
    </div>
  );
}
