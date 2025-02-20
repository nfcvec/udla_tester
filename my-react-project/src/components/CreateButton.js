import React from 'react';

const CreateButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="create-button">
            Create New Item
        </button>
    );
};

export default CreateButton;