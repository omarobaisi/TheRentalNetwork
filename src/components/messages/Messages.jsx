import React from "react";

function Messages({ errorList }) {
  return (
    <div>
      <div className=" w-50 mx-auto pb-4 my-3">
        {errorList.map((error) => (
          <div
            className="bg-danger text-white p-2 mb-1 text-center"
            key={Math.random()}
          >
            {error.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
