import React, { useState, useEffect, useRef } from "react";
import BookList from "./BookList";
import BookFindSection from "./BookFindSection";
import { getBooksByTitle } from "../api/api";
import { StorageService } from "../services/StorageService";
import { BOOK_LIST_STORAGE_KEY } from "../constants/storageKeys";
import BookModeSection from "./BookModeSection";

const getInitialState = () => {
    return JSON.parse(StorageService.getItem(BOOK_LIST_STORAGE_KEY)) ?? [];
};

export const BookContainer = () => {
    const [books, setBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [systemMode, setSystemMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const isMounted = useRef(true);
    const booksPerPage = useRef(5);

    useEffect(() => {
        const data = getInitialState();
        setBooks(data);
        setTotalPages(Math.ceil(data.length / booksPerPage.current));
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!searchQuery) {
            const data = getInitialState();
            setBooks(data);
            setTotalPages(Math.ceil(data.length / booksPerPage.current));
            setCurrentPage(1);
            return;
        }
        const debounce = setTimeout(() => {
            getBooksByTitle(searchQuery.trim())
                .then((res) => res.json())
                .then((res) => {
                    if (isMounted.current && res.numFound > 0) {
                        const fetchedBooks = res.docs;
                        setBooks(fetchedBooks);
                        setTotalPages(Math.ceil(fetchedBooks.length / booksPerPage.current));
                        setCurrentPage(1);
                    } else {
                        setBooks([]);
                        setDisplayedBooks([]);
                        setTotalPages(1);
                        console.log(`No books found for the query: "${searchQuery}"`);
                    }
                })
                .catch((err) => {
                    if (isMounted.current) {
                        console.error('Error fetching books:', err);
                    }
                });
        }, 1000);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * booksPerPage.current;
        const endIndex = startIndex + booksPerPage.current;
        setDisplayedBooks(books.slice(startIndex, endIndex));
    }, [books, currentPage]);

    const searchBook = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const addBook = (id) => {
        const temp = books.find(item => item.key === id);
        if (!temp) return;

        let existingBooks = getInitialState();

        if (existingBooks.some(book => book.key === id)) {
            alert(`Book with id: '${id}' is already saved.`);
            return;
        }

        existingBooks.push({ ...temp, isLocal: !temp.isLocal });
        StorageService.setItem(BOOK_LIST_STORAGE_KEY, JSON.stringify(existingBooks));
        alert(`The book "${temp.title}" was added to favorites!`);
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
            <BookModeSection onToggleModeButtonClick={toggleMode} />
            <BookFindSection onSearchBookButtonClick={searchBook} />
            <BookList
                books={displayedBooks}
                onBookItemSaveButtonClick={addBook}
                onBookItemDeleteButtonClick={deleteBook}
                onBookItemCheckboxClick={markDone}
                toggleMode={systemMode}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};
