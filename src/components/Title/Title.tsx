import React from 'react';
import './Title.css';

interface TitleProps {
    title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <h1 className='title-hyruledle'>{title}</h1>
    );
}

export default Title;