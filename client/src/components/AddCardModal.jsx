import React, { useEffect, useState } from "react";
import Input from "../UI/Input/Input";
import Textarea from "../UI/Textarea/Textarea";
import SelectButton from "../UI/SelectButton/SelectButton";
import Button from "../UI/Button/Button";
import StarsRating from "react-star-rate";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createCard, updateCard } from "../features/Cards/cardActions";
import FileBase from "react-file-base64";

const typeDictionary = [
  { value: "Film", label: "Film" },
  { value: "Series", label: "Series" },
  { value: "Book", label: "Book" },
];

const AddCardModal = ({
  currentCardId,
  setCurrentCardId,
  modalOpen,
  setModalOpen,
}) => {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState({
    cardType: "Film",
    creator: "",
    title: "",
    tags: "",
    feedback: "",
    rating: 0,
    likes: [],
    picture: "",
  });

  const [starValue, setStarValue] = useState(0);

  const card = useSelector((state) =>
    currentCardId
      ? state.cards.cards.find((p) => p._id === currentCardId)
      : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (card) {
      setCardData(card);
      setStarValue(card.rating);
    }
  }, [card]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (currentCardId) {
      dispatch(
        updateCard(currentCardId, { ...cardData, name: user?.result?.name })
      );
      toast.success("Card was updated");
      clearForm();
      setModalOpen(false);
      return;
    } else {
      if (cardData.title === "") {
        toast.error("Enter the title");
        return;
      }
      dispatch(createCard({ ...cardData, name: user?.result?.name }));
      setModalOpen(false);
      clearForm();
      toast.success("New card was created");
      return;
    }
  };

  const clearForm = () => {
    setCurrentCardId(null);
    setCardData({
      cardType: "Film",
      title: "",
      tags: "",
      feedback: "",
      rating: 0,
      picture: "",
    });
    setStarValue(0);
  };

  return (
    <div>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-[1000] flex justify-center items-center bg-black bg-opacity-50">
          <div className="max-w-2xl w-11/12 bg-slate-100 my-0 mx-auto flex justify-center items-center py-6 px-8 rounded-xl">
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
              <h1 className="text-3xl text-center font-bold">
                {currentCardId ? "Updating" : "Creating"} a card
              </h1>

              <SelectButton
                label="Choose card type"
                value={cardData.cardType}
                onChange={(e) => {
                  setCardData({ ...cardData, cardType: e.target.value });
                }}
              >
                {typeDictionary.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </SelectButton>

              <Input
                label="Input title"
                placeholder="Title"
                value={cardData.title}
                onChange={(e) => {
                  setCardData({ ...cardData, title: e.target.value });
                }}
              />

              <Input
                label="Input tags for your card"
                placeholder="e.g. tag1,tag2,tag3"
                value={cardData.tags}
                onChange={(e) => {
                  setCardData({ ...cardData, tags: e.target.value.split(",") });
                }}
              />

              <div>
                <p>Specify the rating on a scale (0-10)</p>
                <StarsRating
                  count="10"
                  value={starValue}
                  onChange={(value) => {
                    setStarValue(value);
                    setCardData({
                      ...cardData,
                      rating: value,
                    });
                  }}
                />
                <p>
                  Rating:
                  <span className="font-bold"> {starValue}</span>
                </p>
              </div>

              <Textarea
                label="Input your feedback"
                rows={5}
                placeholder="Feedback"
                value={cardData.feedback}
                onChange={(e) => {
                  setCardData({ ...cardData, feedback: e.target.value });
                }}
              ></Textarea>

              <div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setCardData({ ...cardData, picture: base64 })
                  }
                />
              </div>

              <div className="flex gap-1">
                <Button variant="danger" onClick={() => setModalOpen(false)}>
                  Close form
                </Button>

                <Button variant="primary" type="submit">
                  Save card
                </Button>

                <Button variant="secondary" onClick={() => clearForm()}>
                  Clear form
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCardModal;
