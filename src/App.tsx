import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import WithTransition from "./pages/WithTransition";
import WithoutTransition from "./pages/WithoutTransition";

const App: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="App">
      <Router>
        <WithoutTransition />
        {/* <WithTransition /> */}
      </Router>
    </div>
  );
};

export default App;
