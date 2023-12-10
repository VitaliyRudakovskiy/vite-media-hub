import express from "express";
import {
  createCard,
  deleteCard,
  getCards,
  getOneCard,
  getCardsBySearch,
  updateCard,
  likeCard,
  commentCard,
  bookmarkCard,
} from "../controllers/cards.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//GET all cards
router.get("/", getCards);

//GET cards by search request
router.get("/search", getCardsBySearch);

//GET single card
router.get("/:id", getOneCard);

//POST a new card
router.post("/", auth, createCard);

//UPDATE a card
router.patch("/:id", auth, updateCard);

//DELETE a card
router.delete("/:id", auth, deleteCard);

//LIKE a card
router.patch("/:id/likeCard", auth, likeCard);

//BOOKMARK a card
router.patch("/:id/bookmarkCard", auth, bookmarkCard);

//COMMENT a card
router.post("/:id/commentCard", auth, commentCard);

export default router;
