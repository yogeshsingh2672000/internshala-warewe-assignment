import React, { useState } from "react";
import Result from "./Result";

function Dashboard(props) {
  const { setHistory, history } = props;
  const [apiCallOptionsToggle, setApiCallOptionsToggle] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [body, setBody] = useState(null);
  const [method, setMethod] = useState("GET");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMethod = (e) => {
    const { textContent } = e.target;
    setMethod(textContent);
  };

  const handleSubmit = async (method = "GET", url, body) => {
    const urlRegex =
      /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+\/?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/\S*)?$/;
    if (!urlRegex.test(url)) {
      console.log("Valid URL");
      return;
    }

    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body && body,
    };

    try {
      setIsLoading(true);
      let data;
      if (method === "GET") {
        const res = await fetch(url);
        data = await res.json();
      } else {
        const res = await fetch(url, requestOptions);
        data = await res.json();
      }
      setResponse(data);
      setIsLoading(false);
      setHistory([...history, { method: method, url: url }]);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error.message);
      setError(error);
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex gap-[10px] rounded-xl m-2">
          <div className="flex w-4/5 bg-[#393E46] divide-white/[.20] divide-x py-2 gap-[10px] rounded-md px-2 border-2 border-white/[.20]">
            <div
              className="relative w-1/5"
              onClick={() => setApiCallOptionsToggle(!apiCallOptionsToggle)}
            >
              <button className="text-sm flex gap-[10px] items-center justify-center w-full">
                {method}
                <img
                  className="h-[20px] w-[20px]"
                  src="/down.png"
                  alt="arrow"
                />
              </button>
              <ul
                className={`${
                  !apiCallOptionsToggle ? "hidden" : ""
                } absolute bg-[#393E46] left-[-10px] z-[99999] top-10 rounded-md w-full`}
              >
                <li
                  onClick={handleMethod}
                  className="px-[5px] py-[5px] hover:bg-[#00ADB5] cursor-pointer"
                >
                  GET
                </li>
                <li
                  onClick={handleMethod}
                  className="px-[5px] py-[5px] hover:bg-[#00ADB5] cursor-pointer"
                >
                  POST
                </li>
                <li
                  onClick={handleMethod}
                  className="px-[5px] py-[5px] hover:bg-[#00ADB5] cursor-pointer"
                >
                  PUT
                </li>
                <li
                  onClick={handleMethod}
                  className="px-[5px] py-[5px] hover:bg-[#00ADB5] cursor-pointer"
                >
                  DELETE
                </li>
              </ul>
            </div>
            <input
              className="w-full bg-transparent px-2 outline-none"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleSubmit(method, userInput, body)}
            className="bg-[#00ADB5] px-6 py-2 rounded-md"
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
        <div className="bg-[#393e464d] rounded-xl p-4 m-2">
          <textarea
            className="w-full bg-transparent outline-none px-2 py-2"
            value={body}
            onChange={(e) => {
              //   console.log(JSON.parse(e.target.value));
              setBody(e.target.value);
            }}
            name="body"
            cols="30"
            rows="5"
            placeholder={` Body
            {
                name: "name",
                age: 56
            }`}
          ></textarea>
        </div>
        <div className="h-full bg-[#393e464d] rounded-xl p-4 mx-2 mb-2 overflow-auto">
          <Result response={response} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
