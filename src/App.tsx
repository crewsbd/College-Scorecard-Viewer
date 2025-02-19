import { useState } from "react";
import "./App.css";
import SearchSidebar from "./components/SearchSidebar";
import { GlobalContext } from "./GlobalContext";
import MainView from "./components/MainView";

export default function App() {
  const storedKey = localStorage.getItem("api_key") || "";

  const [apiKey, changeAPIKey] = useState(storedKey);
  const [currentSchool, changeCurrentSchool] = useState("");

  return (
    <GlobalContext.Provider
      value={{ apiKey, changeAPIKey, currentSchool, changeCurrentSchool }}
    >
      <header>
        <span className="title_line">
          <img src="./favicon.svg" width={40} height={40} />
          <h1>College Scorecard Viewer</h1>
        </span>
        <div id="api_key">
          <label>API Key</label>
          <input
            name="apikey"
            type="text"
            defaultValue={apiKey}
            onChange={(event) => {
              localStorage.setItem("api_key", event.target.value);
              changeAPIKey(event.target.value);
            }}
          ></input>
        </div>
      </header>
      <main>
        <SearchSidebar></SearchSidebar>
        <MainView id={currentSchool}></MainView>
      </main>
      <footer>Create by: Brian Crews</footer>
    </GlobalContext.Provider>
  );
}
