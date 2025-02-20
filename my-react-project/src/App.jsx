import React, { useState, useEffect } from 'react';
import DataGrid from './components/DataGrid';
import CreateButton from './components/CreateButton';
import Dialog from './components/Dialog';
import './styles/App.css';

function App() {
  const [items, setItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    // Fetch items from the API
    // setItems(response.data);
  };

  const handleCreate = () => {
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setConfirmationMessage('');
  };

  const handleConfirmation = (message) => {
    setConfirmationMessage(message);
    fetchItems();
  };

  return (
    <div className="App">
      <h1>My React Project</h1>
      <CreateButton onClick={handleCreate} />
      {confirmationMessage && <div className="confirmation">{confirmationMessage}</div>}
      <DataGrid items={items} onEdit={handleEdit} />
      <Dialog 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
        currentItem={currentItem} 
        onConfirmation={handleConfirmation} 
      />
    </div>
  );
}

export default App;