const API_URL = 'https://openlibrary.org/search.json';
const BOOK_COVER_URL = 'https://covers.openlibrary.org/b/id/';
const AUTHOR_COVER_URL = 'https://covers.openlibrary.org/a/olid/';

const getBooksByTitle = async (searchTerm, page = 1) => {
    const url = `${API_URL}?q=${searchTerm}&page=${page}`;
    return fetch(url);
};

const getBookCoverImageById = (coverId, authorKey) => {
    if (coverId)
        return `${BOOK_COVER_URL}${coverId}-M.jpg`;
    else if (authorKey)
        return `${AUTHOR_COVER_URL}${authorKey}-M.jpg`;
    else
        return '/fallback-cover.png';
};

export { getBooksByTitle, getBookCoverImageById };
