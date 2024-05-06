import React, { useState } from 'react';
import './submit.css';

const SubmitButton = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        setInputValue('');
    };

    return (
        <div>
            <input value={inputValue} className='input' type="text" placeholder='bokoblin...' onChange={handleInputChange} />
            <button className='submit-button' type="submit" onClick={handleSubmit}>
                Confirm
            </button>
        </div>
    );
};

export default SubmitButton;