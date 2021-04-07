import React from "react";

const Like = ({ isLiked, onLike }) => {
  return (
    <span>
      <i
        onClick={onLike}
        className={isLiked ? "fa fa-heart" : " fa fa-heart-o"}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    </span>
  );
};

export default Like;
