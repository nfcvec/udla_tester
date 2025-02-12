import React, { useEffect, useState } from 'react';
import { getCasos, deleteCaso, updateCaso } from '../apiService';
import { DataGrid, GridActionsCell, GridActionsCellItem } from '@mui/x-data-grid';
import { Typography, IconButton, Button, Icon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CasosList = ({ onEdit }) => {
    const [casos, setCasos] = useState([]);
    const [selectedCasos, setSelectedCasos] = useState([]);
    const fetchCasos = async () => {
        const data = await getCasos();
        setCasos(data);
    };
    useEffect(() => {

        fetchCasos();
    }, []);

    const handleEditCaso = (caso) => {
        onEdit(caso);
    };


    const handleDeleteSelected = async () => {
        for (const id of selectedCasos) {
            await deleteCaso(id);
        }
        setCasos(casos.filter(caso => !selectedCasos.includes(caso.id)));
        setSelectedCasos([]);
    };

    const handleRowSelectionChange = (params) => {
        setSelectedCasos(params);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'pantalla', headerName: 'Pantalla', width: 150, editable: true },
        { field: 'funcionalidad', headerName: 'Funcionalidad', width: 150, editable: true },
        { field: 'tipo_prueba', headerName: 'Tipo de Prueba', width: 150, editable: true },
        { field: 'sistema_operativo', headerName: 'Sistema Operativo', width: 150, editable: true },
        { field: 'tipo_usuario', headerName: 'Tipo de Usuario', width: 150, editable: true },
        { field: 'descripcion', headerName: 'Descripción', width: 200, editable: true },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() => handleEditCaso(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        onClick={() => {
                            handleDeleteSelected([params.id]);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

                </>
            ),
        },

    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Casos de Prueba
            </Typography>
            <DataGrid
                editMode='row'
                rows={casos}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={handleRowSelectionChange}
                processRowUpdate={async (params) => {
                    console.log(params);
                    await updateCaso(params.id, params);
                    return params;
                }
                }
                onProcessRowUpdateError={(params) => {
                    alert('Error al actualizar el caso de prueba');
                    return params.data;
                }
                }
            />
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteSelected}
                disabled={selectedCasos.length === 0}
            >
                Eliminar Seleccionados
            </Button>
        </div>
    );
};

export default CasosList;