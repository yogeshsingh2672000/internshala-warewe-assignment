import React from "react";
import { JsonViewer } from "@textea/json-viewer";

function Result(props) {
  const { response } = props;
  return (
    <>
      {!response ? (
        "Try making a request: GET, POST, PUT, DELETE"
      ) : (
        <JsonViewer
          style={{ backgroundColor: "transparent" }}
          className="text-[15px]"
          value={response}
          theme={"dark"}
        />
      )}
    </>
  );
}

export default Result;
