import React, { useState } from "react";

const BookFindSection = ({ onSearchBookButtonClick }) => {
    const [inputValue, setInputValue] = useState('');

    const searchHandle = (e) => {
        setInputValue(e.target.value);
        onSearchBookButtonClick(e.target.value);
    };

    return (
        <div>
            <input
                value={inputValue}
                onChange={searchHandle}
            />
            {/* &nbsp;<button onClick={searchHandle}>Search!</button> */}
        </div>
    );
};

export default BookFindSection;
