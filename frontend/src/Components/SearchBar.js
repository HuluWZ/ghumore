import React, { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);

        // Perform API call or any other logic to fetch suggestions based on the input value
        // For this example, we'll use a static list of suggestions
        const suggestions = ['Apple', 'Banana', 'Orange', 'Mango'].filter((item) =>
            item.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(suggestions);

        // Show or hide the dropdown based on the input value
        setShowDropdown(value.length > 0);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setShowDropdown(false);
        // Do something with the selected suggestion, such as initiating a search
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
            />
            {showDropdown && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;