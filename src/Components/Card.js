import React from 'react';

export default function Card({src, key, onClick}) {
    return (
        <img 
            className="card" 
            src={src}
            key={key}
            onClick={onClick} 
        />
    );
}