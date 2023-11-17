import "./App.css";
import SettingsProvider from "./context/SettingsContext";
import InstaShare from "./components/InstaShare";
import { useEffect } from "react";

function App() {
  return (
    <SettingsProvider>
      <InstaShare />
    </SettingsProvider>
  );
}

export default App;
