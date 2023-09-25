import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  const [history, setHistory] = useState([]);

  return (
    <div className="App min-w-full h-screen flex">
      <div className="w-1/3 bg-[#393e464d] m-2 rounded-xl p-2 overflow-auto">
        <Sidebar history={history} />
      </div>
      <div className="w-2/3">
        <Dashboard setHistory={setHistory} history={history} />
      </div>
    </div>
  );
}

export default App;
