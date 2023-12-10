import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
  cardType: String, //фильм/сериал/книга
  name: String,
  creator: String,
  title: String,
  tags: [String],
  feedback: String,
  rating: { type: Number, min: 0, max: 10 },
  bookmarks: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  picture: {
    type: String,
    default: "",
  },
});

var CardModel = mongoose.model("CardModel", cardSchema);

export default CardModel;
