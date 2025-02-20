import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import CreateButton from './CreateButton';
import Dialog from './Dialog';

const DataGrid = () => {
    const [data, setData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/aplicacion/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCreate = () => {
        setCurrentItem(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`/api/aplicacion/${id}`);
                fetchData();
                setMessage('Item deleted successfully.');
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        fetchData();
    };

    return (
        <div>
            <h1>Data Grid</h1>
            <CreateButton onClick={handleCreate} />
            {message && <p>{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>
                                <EditButton item={item} onEdit={handleEdit} />
                                <DeleteButton id={item.id} onDelete={handleDelete} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDialogOpen && (
                <Dialog item={currentItem} onClose={handleDialogClose} />
            )}
        </div>
    );
};

export default DataGrid;