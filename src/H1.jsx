import React from "react";

function H1(props) {
  const { classes = "", children } = props;
  const className = `text-xl font-semibold ${classes} mt-8 mb-8`;
  return <h1 className={className}>{children}</h1>;
}

export default H1;
