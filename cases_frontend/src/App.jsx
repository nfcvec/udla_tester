import React, { useState } from 'react';
import Administrar from './components/administrar';
import {
    Drawer,

    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,


} from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ListItemText } from '@mui/material';
import { Divider } from '@mui/material';





function App() {


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Drawer anchor="left" open={true} variant="permanent" sx={{ width:150 }}>
                    <List>
                        {['Administrar', 'Asignar', 'Resultados'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Administrar />
            </Box>
        </>
    );
}



export default App;