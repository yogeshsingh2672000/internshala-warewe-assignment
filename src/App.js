import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App min-w-full h-screen flex">
      <div className="w-1/3 bg-[#393e464d] m-2 rounded-xl p-2">
        <Sidebar />
      </div>
      <div className="w-2/3">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
