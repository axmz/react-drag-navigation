import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes/Routes";

const App: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
};

export default App;
