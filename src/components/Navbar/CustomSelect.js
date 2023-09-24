import React, { useState } from 'react';
import './CustomSelect.css'; // Import your CSS file

const CustomSelect = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleOption = (optionValue) => {
        if (selectedOptions.includes(optionValue)) {
            setSelectedOptions(selectedOptions.filter(item => item !== optionValue));
        } else {
            setSelectedOptions([...selectedOptions, optionValue]);
        }
    };

    return (
        <div className="custom-select">
            <div className="label-with-icon" onClick={() => setShowDropdown(!showDropdown)}>
                Music Languages
                <div className={`select-icon ${showDropdown ? 'open' : ''}`} role="button" tabIndex="0">
                    <i className="fas fa-chevron-down"></i> 
                </div>
            </div>
            {showDropdown && (
                <div className="dropdown">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`dropdown-item ${selectedOptions.includes(option.value) ? 'selected' : ''}`}
                            onClick={() => toggleOption(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
            {selectedOptions.length > 0 && (
                    <p className="selected-language-text">
                        {selectedOptions.map((option, index) => (
                            <span key={option}>
                                {index > 0 && ', '}
                                {options.find(opt => opt.value === option).value}
                            </span>
                        ))}
                    </p>
            )}
        </div>
    );
};

export default CustomSelect;
