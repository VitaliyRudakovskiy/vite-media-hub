import mongoose from "mongoose";
import CardModel from "../models/cardModel.js";

export const getCards = async (req, res) => {
  try {
    const cardModels = await CardModel.find();
    res.status(200).json(cardModels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCardsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i"); //QWE, Qwe, qWE, qwe -> qwe

    //checks if the title is the same we typed in the frontend OR is one of the tags is in the array of tags
    const cards = await CardModel.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: cards });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOneCard = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No card with this id");
  }

  try {
    const existingCard = await CardModel.findOne({ _id });
    res.status(200).json(existingCard);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCard = async (req, res) => {
  const card = req.body;
  const newCard = new CardModel({
    ...card,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCard = async (req, res) => {
  const { id: _id } = req.params;
  const card = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No card with this id");
  }

  const updatedCard = await CardModel.findByIdAndUpdate(
    _id,
    { ...card, _id },
    {
      new: true,
    }
  );

  res.json(updatedCard);
};

export const likeCard = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No card with that id");
  }

  const card = await CardModel.findById(_id);

  const index = card.likes.findIndex((userid) => userid === String(req.userId));

  if (index === -1) {
    card.likes.push(req.userId);
  } else {
    card.likes = card.likes.filter((id) => id !== String(req.userId));
  }

  const updatedCard = await CardModel.findByIdAndUpdate(_id, card, {
    new: true,
  });

  res.json(updatedCard);
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No card with that id");
  }

  await CardModel.findByIdAndRemove(id);

  res.json({ message: "Card deleted succesfully" });
};

export const commentCard = async (req, res) => {
  const { id } = req.params;
  const { commentText } = req.body;

  const card = await CardModel.findById(id);

  card.comments.push(commentText);

  const updatedCard = await CardModel.findByIdAndUpdate(id, card, {
    new: true,
  });

  res.json(updatedCard);
};

export const bookmarkCard = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No card with that id");
  }

  const card = await CardModel.findById(_id);

  const index = card.bookmarks.findIndex(
    (userid) => userid === String(req.userId)
  );

  if (index === -1) {
    card.bookmarks.push(req.userId);
  } else {
    card.bookmarks = card.bookmarks.filter((id) => id !== String(req.userId));
  }

  const updatedCard = await CardModel.findByIdAndUpdate(_id, card, {
    new: true,
  });

  res.json(updatedCard);
};
