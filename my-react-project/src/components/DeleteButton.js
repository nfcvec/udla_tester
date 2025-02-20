import React from 'react';

const DeleteButton = ({ onDelete }) => {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            onDelete();
        }
    };

    return (
        <button onClick={handleDelete} className="delete-button">
            Delete
        </button>
    );
};

export default DeleteButton;