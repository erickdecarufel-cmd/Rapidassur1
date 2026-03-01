import React from 'react';

interface QuizProps {
    children: React.ReactNode;
}

const Quiz: React.FC<QuizProps> = ({ children }) => {
    return (
        <div className="my-8 border-l-4 border-accent bg-secondary/20 p-6 rounded-lg">
            {children}
        </div>
    );
};

export default Quiz;