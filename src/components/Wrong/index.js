import "./index.css";
import { BlueAlertImage } from "../../assets";
import { SettingsContext } from "../../context/SettingsContext";
import { useContext } from "react";

export default function Wrong({ apiCallFunction }) {
  const { dark } = useContext(SettingsContext);

  const renderTryAgainBtn = () => {
    return (
      <button
        type="button"
        className="try-again-button"
        onClick={() => apiCallFunction()}
      >
        Try again
      </button>
    );
  };

  const renderPostFetchFailedView = () => {
    return (
      <div
        className={`post-fetch-failed-container ${
          dark ? "dark-bg" : "white-bg"
        }`}
      >
        <img src={BlueAlertImage} alt="failure view" className="blue-alert-img" />
        <p
          className={`something-went-wrong-txt ${
            dark ? "light-text" : "dark-text"
          }`}
        >
          Something went wrong. Please try again
        </p>
        {renderTryAgainBtn()}
      </div>
    );
  };

  return <>{renderPostFetchFailedView()}</>;
}
