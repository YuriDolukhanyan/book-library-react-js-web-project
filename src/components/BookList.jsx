import React from "react";
import BookItem from "./BookItem";
import { getBookCoverImageById } from "../api/api";

const BookList = ({
    books,
    onBookItemSaveButtonClick,
    onBookItemDeleteButtonClick,
    onBookItemCheckboxClick,
    toggleMode,
    totalPages,
    currentPage,
    setCurrentPage
}) => {
    if (!books.length) {
        return <div>There are no books! Loading...</div>;
    }

    return (
        <ul>
            {books.map((item) => (
                <BookItem
                    key={Math.random() * Date.now()}
                    isLocal={item.isLocal}
                    isDone={item.isDone}
                    id={item.key}
                    author={item.author_name}
                    title={item.title}
                    image={getBookCoverImageById(item.cover_i, item.author_key)}
                    firstPublishYear={item.first_publish_year}
                    onAddButtonClick={onBookItemSaveButtonClick}
                    onDeleteButtonClick={onBookItemDeleteButtonClick}
                    onCheckboxClick={onBookItemCheckboxClick}
                    toggleMode={toggleMode}
                />
            ))}
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
                &nbsp;<span>Page {currentPage} of {totalPages}</span>&nbsp;
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
            </div>
        </ul>
    );
};

export default BookList;
