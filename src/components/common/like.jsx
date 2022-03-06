import React from "react";

const Like = ({ liked, onLikeToggle }) => {
  let classes = "fa fa-heart";
  if (!liked) {
    classes += "-o";
  }
  return (
    <i
      className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
      onClick={onLikeToggle}
    ></i>
  );
};

export default Like;
