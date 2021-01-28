import React from "react";

function Button(props) {
  const { onClick, children, color = "blue" } = props;

  const className = `bg-transparent hover:bg-${color}-500 text-${color}-700 font-semibold hover:text-white py-2 px-4 border border-${color}-500 hover:border-transparent rounded w-2/5 m-1 max-w-xs`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
