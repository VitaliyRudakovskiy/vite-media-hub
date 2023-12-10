import React, { useState } from "react";
import defaultImage from "../images/defaultImage.png";
import Button from "../UI/Button/Button";
import { AiFillEdit } from "react-icons/ai";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  bookmarkCard,
  deleteCard,
  likeCard,
} from "../features/Cards/cardActions";
import bookIcon from "../images/icon_book.png";
import filmIcon from "../images/icon_film.png";
import seriesIcon from "../images/icon_series.png";
import { useNavigate } from "react-router-dom";
import Likes from "./Likes";
import toast from "react-hot-toast";

const cardTypes = {
  Book: bookIcon,
  Film: filmIcon,
  Series: seriesIcon,
};

const Card = ({ card, setCurrentCardId, setModalOpen }) => {
  const [likes, setLikes] = useState(card?.likes);
  const [bookmarks, setBookmarks] = useState(card?.bookmarks);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id || user?.result?.sub;

  const hasUserLikedCard = likes.find((like) => like === userId);
  const hasUserBookmarkedCard = bookmarks.find(
    (bookmark) => bookmark === userId
  );

  const onLikeClick = async () => {
    if (!userId) return;

    dispatch(likeCard(card._id));
    if (hasUserLikedCard) {
      setLikes(card.likes.filter((id) => id !== userId));
    } else {
      setLikes([...card.likes, userId]);
    }
  };

  const onBookmarkClick = async () => {
    dispatch(bookmarkCard(card._id));
    if (hasUserBookmarkedCard) {
      setBookmarks(card.bookmarks.filter((id) => id !== userId));
      toast.success("Removed from bookmarks");
      return;
    } else {
      setBookmarks([...card.bookmarks, userId]);
      toast.success("Added to bookmarks");
      return;
    }
  };

  const onOpenCard = () => {
    navigate(`/cards/${card._id}`);
  };

  return (
    <div className="relative flex flex-col gap-1 rounded-xl max-w-[260px] bg-[#DCF3E3] p-2 shadow-md z-10 group">
      {card.picture === "" ? (
        <img
          className="w-full rounded-xl mb-2 select-none"
          src={defaultImage}
          alt="default banner"
        />
      ) : (
        <img src={card.picture} alt="Uploaded theme" />
      )}

      <div className="absolute right-4 top-4 bg-transparent">
        <img
          className="max-w-[1.6rem]"
          src={cardTypes[card.cardType]}
          alt="card type"
        />
      </div>

      <div className="absolute left-3 top-3 flex gap-1">
        {userId && (
          <button
            type="button"
            className="scale-0 transition-all duration-200 p-2 rounded-lg bg-slate-100 group-hover:scale-100 hover:bg-slate-200"
            onClick={onBookmarkClick}
          >
            {card.bookmarks.find((bookmark) => bookmark === userId) ? (
              <BsBookmarkCheckFill size={24} />
            ) : (
              <BsBookmark size={24} />
            )}
          </button>
        )}

        {(user?.result?._id === card?.creator ||
          user?.result?.sub === card?.creator) && (
          <div className="flex gap-1">
            <button
              className="scale-0 transition-all duration-200 p-2 rounded-lg bg-slate-100 group-hover:scale-100 hover:bg-slate-200"
              onClick={() => {
                setModalOpen(true);
                setCurrentCardId(card._id);
              }}
            >
              <AiFillEdit size={24} />
            </button>

            <button
              type="button"
              className="scale-0 transition-all duration-200 p-2 rounded-lg bg-slate-100 group-hover:scale-100 hover:bg-slate-200"
              onClick={() => dispatch(deleteCard(card._id))}
            >
              <MdDeleteForever size={24} />
            </button>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-center">{card.title}</h2>
      <p className="text-center">Rating - {card.rating} ★</p>
      <p className="px-2 line-clamp-3 text-gray-800 text-sm mb-3">
        {card.feedback}
      </p>

      <div className="px-2 flex items-center justify-between">
        <Button
          variant="primary"
          style={{
            fontSize: "0.8rem",
            padding: "0.4rem 0.55rem",
            borderRadius: "6px",
          }}
          onClick={onOpenCard}
        >
          See more
        </Button>

        <div>
          <button
            className="flex flex-row gap-1"
            type="button"
            onClick={onLikeClick}
          >
            <Likes likes={likes} userId={userId} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
