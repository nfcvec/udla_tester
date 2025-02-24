import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Link,
    Typography,
    Box,
    IconButton,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import WelcomeName from "./WelcomeName";
import SignInSignOutButton from "./SignInSignOutButton";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                    >
                        <MenuItem onClick={handleMenuClose} component={RouterLink} to="/administrar">
                            Administrar
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose} component={RouterLink} to="/asignar">
                            Asignar
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose} component={RouterLink} to="/resultados">
                            Resultados
                        </MenuItem>
                    </Menu>
                    <Typography style={{ flexGrow: 1 }}>
                        <Link
                            component={RouterLink}
                            to="/"
                            color="inherit"
                            variant="h6"
                            underline="none"
                        >
                            {import.meta.env.VITE_TITLE}
                        </Link>
                    </Typography>
                    <Box
                        sx={{
                            visibility: {
                                xs: "hidden",
                                sm: "hidden",
                                md: "visible",
                                lg: "visible",
                                xl: "visible",
                            },
                        }}
                    >
                        <WelcomeName />
                    </Box>
                    <SignInSignOutButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;