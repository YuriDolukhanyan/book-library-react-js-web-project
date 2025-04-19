
# React JS : Book Library Web App

This is a React.js-based Book Library application that allows users to search for books, manage a personal collection, and browse through paginated results. It demonstrates key React concepts such as state management, side effects, conditional rendering, local storage integration, and component composition. Built using hooks like `useState`, `useEffect`, and `useRef`.

## Features

- **Search Books** – Search for books using keywords via an API.
- **Pagination** – Navigate through paginated results (10 books per page).
- **Favorites System** – Save books to your local library with a single click.
- **Completion Toggle** – Mark books as completed/unread.
- **Delete Books** – Remove books from local storage.
- **Debounced Search** – Reduces API calls using a 750ms debounce.
- **React Hooks** – Built with `useState`, `useEffect`, and `useRef`.
- **Local Storage** – Persist book data between sessions.

## Technologies Used

- React (functional components)
- JavaScript ES6+
- CSS for basic styling
- OpenLibrary API

## Components Overview

- `BookContainer` – Main component handling logic and rendering.
- `BookList` – Displays books, allows saving, deleting, and toggling completion.
- `BookItem` – Handles each individual 'book' component.
- `BookFindSection` – Search bar with button.
- `BookModeSection` – Toggle system modes (custom logic).
- `StorageService` – Handles local storage `getItem` and `setItem`.

## Behavior Notes

- Search queries are debounced to avoid excessive API calls.
- Each book can be marked as "done" or "not done" and toggled.
- Saved books are stored in `localStorage` with a custom flag.
- Pagination allows navigation through multiple result pages.

## Follow these steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/react-js-book-library.git
   ```

2. **Navigate into the project folder**:
   ```bash
   cd react-js-book-library
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

> Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
