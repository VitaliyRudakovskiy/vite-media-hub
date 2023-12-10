import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentCard } from "../features/Cards/cardActions";

const CommentSection = ({ card }) => {
  const [comments, setComments] = useState(card?.comments);
  const [commentText, setCommentText] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const commentsRef = useRef();

  const handleClick = async () => {
    const finalCommente = `${user.result.name}: ${commentText}`;
    const newComments = await dispatch(commentCard(finalCommente, card._id));

    setComments(newComments);
    setCommentText("");

    commentsRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <div>
      {user?.result?.name ? (
        <div>
          <h1>Comments</h1>
          <div>
            <p>Write a comment</p>
            <div className="overflow-y-scroll max-h-32">
              {comments.map((comm, index) => (
                <div key={index}>
                  <strong>{comm.split(": ")[0]}</strong>
                  <p>{comm.split(":")[1]}</p>
                </div>
              ))}
              <div ref={commentsRef} />
            </div>
            <textarea
              className="border-2 border-black"
              type="text"
              placeholder="Type your comment here"
              rows={10}
              cols={70}
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            />
            <button className="mt-2 bg-slate-600" onClick={handleClick}>
              Save comment
            </button>
          </div>
        </div>
      ) : (
        <h2>Log In to see and post comments</h2>
      )}
    </div>
  );
};

export default CommentSection;
