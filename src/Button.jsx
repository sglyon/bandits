import React from "react";

function Button(props) {
  const { onClick, children, color = "blue" } = props;

  let className =
    "bg-transparent font-semibold hover:text-white py-2 px-4 border  hover:border-transparent rounded w-2/5 m-1 max-w-xs";

  switch (color) {
    case "blue":
      className += " border-blue-500 hover:bg-blue-500 text-blue-700";
      break;
    case "red":
      className += " border-red-500 hover:bg-red-500 text-red-700";
      break;
    case "green":
      className += " border-green-500 hover:bg-green-500 text-green-700";
      break;
    case "yellow":
      className += " border-yellow-500 hover:bg-yellow-500 text-yellow-700";
      break;
    case "pink":
      className += " border-pink-500 hover:bg-pink-500 text-pink-700";
      break;
    default:
      break;
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
