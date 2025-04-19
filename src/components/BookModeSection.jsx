import React from "react";

const BookModeSection = ({ onToggleModeButtonClick }) => {
    return (
        <div>
            <button onClick={onToggleModeButtonClick}>Toggle Light/Dark Mode!</button>
            <br /><br />
        </div>
    );
};

export default BookModeSection;
