import React from "react";

function Sidebar(props) {
  const { history } = props;
  return (
    <div className="sidebar-container">
      <div className="py-2">History</div>
      <div className="flex flex-col gap-[10px] text-[12px]">
        {history.map((obj, idx) => (
          <div
            key={idx}
            className="flex gap-[10px] bg-[#393E46] rounded py-1 px-1"
          >
            <p
              className={`${
                obj.method === "GET"
                  ? "bg-green-700"
                  : obj.method === "POST"
                  ? "bg-yellow-700"
                  : obj.method === "PUT"
                  ? "bg-blue-700"
                  : obj.method === "DELETE"
                  ? "bg-red-700"
                  : ""
              } flex items-center justify-center px-1 rounded`}
            >
              {obj.method}
            </p>
            <p>{obj.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
