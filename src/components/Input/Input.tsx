import React from "react";
import './Input.css';

interface InputProps {
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ type, placeholder, onChange }) => {
    return (
        <input className='input' type={type} placeholder={placeholder} onChange={onChange} />
    );
}

export default Input;