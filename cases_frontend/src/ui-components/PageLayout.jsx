import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import NavBar from "./NavBar";
import { Container } from "@mui/material";
import { useState } from "react";

const drawerWidth = 140;

export const PageLayout = (props) => {

    return (
        <>
            <NavBar />
            <br />
            <br />
            <Container>{props.children}</Container>
        </>
    );
};
