import React, { useState } from 'react';
import { IoIosClose } from "react-icons/io";
function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleClear = () => {
        setSearchTerm("");
        onSearch("");
    };

    return (
        <div className="col-md-4">
            {/* Search Bar */}
            <div className="input-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Buscar..." 
                    value={searchTerm}
                    onChange={handleChange}
                />
                {searchTerm && (
                    <div className="input-group-append">
                        <button
                            className="btn btn-primary custom-primaty-btn"
                            type="button"
                            onClick={handleClear}
                            aria-label="Clear"
                        >
                            <IoIosClose />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
