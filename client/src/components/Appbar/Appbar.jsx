import React, { useState } from "react";
import ChipsInput from "../../UI/ChipsSearch/ChipsInput";
import Button from "../../UI/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCardsBySearch } from "../../features/Cards/cardActions";
import AddCardModal from "../AddCardModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Appbar = ({
  modalOpen,
  setModalOpen,
  currentCardId,
  setCurrentCardId,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getCardsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/cards/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/cards");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="flex items-center gap-3">
          {/* <input
          className="border-black border-2"
          type="text"
          placeholder="Input search"
          value={search}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        /> */}
          <ChipsInput tags={tags} setTags={setTags} onAddChip={handleAddChip} />

          <Button onClick={searchPost} variant="primary">
            Search
          </Button>
        </div>

        {user?.result?.name && (
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Add card
          </Button>
        )}
      </div>

      <AddCardModal
        currentCardId={currentCardId}
        setCurrentCardId={setCurrentCardId}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
};

export default Appbar;
