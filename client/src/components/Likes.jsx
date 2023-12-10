import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Likes = ({ likes, userId }) => {
  return (
    <div>
      {userId ? (
        <div className="flex gap-2">
          {likes.find((like) => like === userId) ? (
            <div>
              <AiFillHeart size={28} color="red" />
            </div>
          ) : (
            <div>
              <AiOutlineHeart size={28} color="red" />
            </div>
          )}
          <p>
            {likes.length} {`${likes.length === 1 ? "Like" : "Likes"}`}
          </p>
        </div>
      ) : (
        <div className="flex gap-2">
          <div>
            <AiOutlineHeart size={28} color="grey" />
          </div>
          <p className="text-gray-600">
            {likes.length} {`${likes.length === 1 ? "Like" : "Likes"}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Likes;
