import React from "react";
import "./Avatar.css";

const Avatar = ({ user }) => {
  return (
    <div className="avatar-container">
      {user.result.picture ? (
        <img
          className="avatar-image"
          src={user.result.picture}
          alt={user.result.name}
        />
      ) : (
        <div className="avatar-div">{`${user.result.name.charAt(
          0
        )}${user.result.name.split(" ")[1].charAt(0)}`}</div>
      )}
      <div className="name">{user.result.name}</div>
    </div>
  );
};

export default Avatar;
