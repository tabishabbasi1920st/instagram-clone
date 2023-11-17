import "./index.css";
import Header from "../Header";
import UserStories from "../UserStories";
import UserPost from "../UserPost";
import { SettingsContext } from "../../context/SettingsContext";
import { useContext, useEffect } from "react";
import Search from "../Search";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Home() {
  const { dark, searchInput } = useContext(SettingsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("jwt_token") === undefined) {
      return navigate("/login");
    }
  });

  return (
    <div className={`home-main-container ${dark ? "dark-bg" : "light-bg"}`}>
      <Header />
      {searchInput !== "" ? (
        <Search />
      ) : (
        <div className="user-stories-and-post-container">
          <UserStories />
          <UserPost />
        </div>
      )}
    </div>
  );
}
