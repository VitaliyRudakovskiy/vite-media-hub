import React, { useState } from "react";
import "./ChipsInput.css";
import Button from "../Button/Button";
import { IoMdAdd } from "react-icons/io";

const ChipsInput = ({ tags, setTags, onAddChip }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const addChip = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue && isValid(trimmedValue)) {
      setTags([...tags, trimmedValue]);
      setInputValue("");
      onAddChip(trimmedValue);
    }
  };

  const handleKeyDown = (e) => {
    if (["Enter", "Tab", ",", " "].includes(e.key)) {
      addChip();
    }
  };

  const handleClick = () => {
    addChip();
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleDelete = (tag) => {
    setTags(tags.filter((c) => c !== tag));
  };

  const isValid = (tag) => {
    let error = null;

    if (tags.includes(tag)) {
      error = `${tag} has already been added.`;
    }

    if (error) {
      setError(error);
      return false;
    }

    return true;
  };

  return (
    <div className="tags-input__wrapper">
      <div className="tags-input-error__wrapper">
        <div className="input__wrapper">
          <input
            className={"tags-input " + (error && " has-error")}
            value={inputValue}
            placeholder="Enter tags for search ..."
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <IoMdAdd className="search-icon" size={28} onClick={handleClick} />
        </div>

        {error && <p className="error">{error}</p>}
      </div>

      <div className="tags-container">
        {tags.map((tag) => (
          <div className="tag-item" key={tag} onClick={() => handleDelete(tag)}>
            <p>{tag}</p>
            <span>✕</span>
          </div>
        ))}
        {tags.length > 0 && (
          <Button
            variant="danger"
            style={{ padding: "0.3rem 0.6rem" }}
            onClick={() => setTags([])}
          >
            Delete tags
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChipsInput;
