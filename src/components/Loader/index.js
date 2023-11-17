import { ThreeDots } from "react-loader-spinner";
import "./index.css";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";

export default function Loader() {
  const { dark } = useContext(SettingsContext);

  return (
    <div className="loader-container" testid="loader">
      <ThreeDots
        height="80"
        width="80"
        radius="5"
        color={dark ? "#ffffff" : "#4fa94d"}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}
