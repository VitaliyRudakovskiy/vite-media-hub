import React, { useEffect, useState } from "react";
import Header from "../Header";
import SideBar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import { getCards } from "../../features/Cards/cardActions";
import AddCardModal from "../AddCardModal";

const BookmarkedCards = () => {
  const allCards = useSelector((state) => state.cards.cards);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id || user?.result?.sub;

  const myBookmarkedCards = allCards.filter(
    ({ bookmarks }) => bookmarks.indexOf(userId) !== -1
  );

  return (
    <div className="flex flex-col items-start">
      <Header />
      <SideBar />
      <div className="pl-16">
        <h1>This is Bookmarked cards</h1>
        {myBookmarkedCards.length > 0 ? (
          <div className="flex flex-row flex-wrap gap-6">
            {myBookmarkedCards.map((card) => (
              <Card
                card={card}
                key={card._id}
                setCurrentCardId={setCurrentCardId}
                setModalOpen={setModalOpen}
              />
            ))}
          </div>
        ) : (
          <div>
            <p>NO CARDS</p>
          </div>
        )}
      </div>

      <AddCardModal
        currentCardId={currentCardId}
        setCurrentCardId={setCurrentCardId}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default BookmarkedCards;
