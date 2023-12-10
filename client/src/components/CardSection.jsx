import React, { useEffect, useState, memo } from "react";
import SpinnerLoader from "../UI/SpinnerLoader";
import Card from "./Card";
import nextid from "react-id-generator";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCards } from "../features/Cards/cardActions";

const CardSection = ({ setCurrentCardId, setModalOpen }) => {
  const cards = useSelector((state) => state.cards.cards);
  const dispatch = useDispatch();

  const [displayedCards, setDisplayedCards] = useState([]);
  const [slice, setSlice] = useState(15);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  useEffect(() => {
    setSlice(15);

    setDisplayedCards(
      cards
        .slice(0, slice)
        .map((card) => (
          <Card
            key={nextid()}
            card={card}
            setCurrentCardId={setCurrentCardId}
            setModalOpen={setModalOpen}
          />
        ))
    );

    setHasMore(true);
  }, [cards]);

  const addSlice = () => {
    setDisplayedCards([...displayedCards, ...nextSlice()]);
    setSlice(slice + 8);
    if (slice >= cards.length) setHasMore(false);
  };

  const nextSlice = () => {
    return cards
      ?.slice(slice, slice + 8)
      ?.map((card) => (
        <Card
          key={nextid()}
          card={card}
          setCurrentCardId={setCurrentCardId}
          setModalOpen={setModalOpen}
        />
      ));
  };

  return !cards.length ? (
    <SpinnerLoader message="Loading cards from database" />
  ) : (
    <InfiniteScroll
      className="flex flex-row flex-wrap gap-6 pl-4"
      dataLength={displayedCards.length}
      next={addSlice}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage="The end"
    >
      {displayedCards}
    </InfiniteScroll>
  );
};

export default memo(CardSection);
