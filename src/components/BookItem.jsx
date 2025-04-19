import React, { memo } from "react";
import './book.css';

const BookItem = ({
    isDone,
    isLocal,
    id,
    author,
    title,
    image,
    firstPublishYear,
    onAddButtonClick,
    onDeleteButtonClick,
    onCheckboxClick,
    toggleMode
}) => {
    return (
        <li className={`book-item ${toggleMode ? 'dark' : 'light'}`}>
            {isLocal && (
                <input
                    checked={isDone}
                    type="checkbox"
                    onChange={() => onCheckboxClick(id)}
                />
            )}
            <img
                src={image}
                alt="ERROR: Failed to Fetch Cover..."
                className={isDone ? 'grayscale' : ''}
            />
            <div
                className="book-details"
                style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'gray' : 'black' }}
            >
                <div className="title">{title && `"${title}"`}</div>
                <div className="author">
                    {author && `${author}`}
                    {author && firstPublishYear && " - "}
                    {firstPublishYear && `${firstPublishYear}`}
                </div>
            </div>
            <button disabled={isLocal ? !isDone : false} onClick={() => isLocal ? 
                (window.confirm(`Are you sure you want to delete the book: "${title}"?`) && onDeleteButtonClick(id))
                : onAddButtonClick(id)
            }>
                {isLocal ? "Delete" : "Save"}
            </button>
        </li>
    );
};

export default memo(BookItem);
