import "./index.css";
import { NotFoundRouteImage } from "../../assets";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-main-container">
      <img src={NotFoundRouteImage} alt="page not found" />
      <p className="page-not-found-txt">Page Not Found</p>
      <p className="route-not-found-txt">
        We are sorry, the page you requested could not be found. <br />
        Please go back to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="home-page-btn">
          Home Page
        </button>
      </Link>
    </div>
  );
}
