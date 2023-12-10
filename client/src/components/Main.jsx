import React, { useState } from "react";
import AddCardModal from "./AddCardModal";
import CardSection from "./CardSection";
import Appbar from "./Appbar/Appbar";

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);

  return (
    <div className="relative pl-16">
      <Appbar
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentCardId={currentCardId}
        setCurrentCardId={setCurrentCardId}
      />

      <CardSection
        setCurrentCardId={setCurrentCardId}
        setModalOpen={setModalOpen}
      />

      <AddCardModal
        currentCardId={currentCardId}
        setCurrentCardId={setCurrentCardId}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default Main;
