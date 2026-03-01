import React from 'react';

interface HighlightProps {
    text: string;
    words: string[];
}

const Highlight: React.FC<HighlightProps> = ({ text }) => {
    return <span className="font-semibold text-accent">{text}</span>;
};

export default Highlight;