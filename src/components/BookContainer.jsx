import React, { useState, useEffect, useRef } from "react";
import BookList from "./BookList";
import BookFindSection from "./BookFindSection";
import { getBooksByTitle } from "../api/api";
import { StorageService } from "../services/StorageService";
import { BOOK_LIST_STORAGE_KEY } from "../constants/storageKeys";
import BookModeSection from "./BookModeSection";
import Toast from "./Toast";

const getInitialState = () => {
    return JSON.parse(StorageService.getItem(BOOK_LIST_STORAGE_KEY)) ?? [];
};

export const BookContainer = () => {
    const [books, setBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [systemMode, setSystemMode] = useState(false);
    const [apiPage, setApiPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [toastMessage, setToastMessage] = useState("");
    const booksPerPage = useRef(20);

    useEffect(() => {
        const data = getInitialState();
        setBooks(data);
    }, []);

    useEffect(() => {
        if (!searchQuery) {
            const data = getInitialState();
            setBooks(data);
            setCurrentPage(1);
            setApiPage(1);
            setTotalResults(data.length);
            return;
        }
    
        const debounce = setTimeout(() => {
            getBooksByTitle(searchQuery.trim(), 1)
                .then((res) => res.json())
                .then((res) => {
                    if (res.numFound > 0) {
                        const fetchedBooks = res.docs;
                        setBooks(fetchedBooks);
                        setApiPage(1);
                        setTotalResults(res.numFound);
                        setCurrentPage(1);
                    } else {
                        setBooks([]);
                        setDisplayedBooks([]);
                        setTotalResults(0);
                        console.log(`No books found for the query: "${searchQuery}"`);
                    }
                })
        }, 1000);
    
        return () => clearTimeout(debounce);
    }, [searchQuery]);    

    useEffect(() => {
        const startIndex = (currentPage - 1) * booksPerPage.current;
        const endIndex = startIndex + booksPerPage.current;
        if (endIndex > books.length && books.length < totalResults) {
            getBooksByTitle(searchQuery.trim(), apiPage + 1)
                .then((res) => res.json())
                .then((res) => {
                    if (res.docs.length > 0) {
                        setBooks([...books, ...res.docs]);
                        setApiPage(prev => prev + 1);
                    }
                })
        } else {
            setDisplayedBooks(books.slice(startIndex, endIndex));
        }
    }, [currentPage, books, totalResults]);    

    const searchBook = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const showToast = (message) => {
        setToastMessage(message);
    };

    const addBook = (id) => {
        const temp = books.find(item => item.key === id);
        if (!temp) return;

        let existingBooks = getInitialState();

        if (existingBooks.some(book => book.key === id)) {
            showToast(`Book with id: '${id}' is already saved.`);
            return;
        }

        existingBooks.push({ ...temp, isLocal: !temp.isLocal });
        StorageService.setItem(BOOK_LIST_STORAGE_KEY, JSON.stringify(existingBooks));
        showToast(`The book "${temp.title}" was added to favorites!`);
    };

    const deleteBook = (id) => {
        let updatedBooks = getInitialState().filter(item => item.key !== id);
        StorageService.setItem(BOOK_LIST_STORAGE_KEY, JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
    };

    const markDone = (id) => {
        let updatedBooks = books.map(item =>
            item.key === id ? { ...item, isDone: !item.isDone } : item);
        StorageService.setItem(BOOK_LIST_STORAGE_KEY, JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
    };

    const toggleMode = () => {
        setSystemMode(!systemMode);
    };

    return (
        <div className="books">
            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage("")} />
            )}
            <BookModeSection onToggleModeButtonClick={toggleMode} />
            <BookFindSection onSearchBookButtonClick={searchBook} />
            <BookList
                books={displayedBooks}
                onBookItemSaveButtonClick={addBook}
                onBookItemDeleteButtonClick={deleteBook}
                onBookItemCheckboxClick={markDone}
                toggleMode={systemMode}
                currentPage={currentPage}
                totalPages={Math.ceil(totalResults / booksPerPage.current)}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};
