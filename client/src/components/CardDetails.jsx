import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCard, getCardsBySearch } from "../features/Cards/cardActions";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "./Card";
import CommentSection from "./CommentSection";

const CardDetails = () => {
  const card = useSelector((state) => state.cards.card);
  const cards = useSelector((state) => state.cards.cards);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCard(id));
  }, [id]);

  useEffect(() => {
    if (card) {
      dispatch(
        getCardsBySearch({ search: "none", tags: card?.tags.join(",") })
      );
    }
  }, [card]);

  if (!card) return null;

  const openCard = (_id) => {
    navigate(`/cards/${_id}`);
  };

  const recommendedCards = cards.filter(({ _id }) => _id !== card._id);

  return (
    <div className="flex flex-col items-start">
      <Header />
      <Sidebar />
      <div className="pl-16">
        <h2>Card title - {card.title}</h2>
        <p>Card tags - {card.tags}</p>
        <p>Created at {card.createdAt}</p>
        <p>Created by {card.name}</p>
        <p>Feedback: {card.feedback}</p>
        <p>Rating: {card.rating}</p>
        <p>Feedback: {card.title}</p>

        {recommendedCards.length && (
          <div>
            <h1 className="font-bold text-xl">You may also like</h1>
            {recommendedCards.map(({ title, cardType, feedback, _id }) => (
              <div
                className="mb-1 cursor-pointer"
                onClick={() => openCard(_id)}
                key={_id}
              >
                <p>{title}</p>
              </div>
            ))}
          </div>
        )}

        <CommentSection card={card} />
      </div>
    </div>
  );
};

export default CardDetails;
