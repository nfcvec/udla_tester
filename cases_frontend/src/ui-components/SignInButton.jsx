import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { loginRequest } from "../authConfig";
import { red } from '@mui/material/colors';

export const SignInButton = () => {
    const { instance } = useMsal();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleLogin = (loginType) => {
        setAnchorEl(null);

        const loginScopes = loginType === "popup" ? loginRequest.scopes : graphUsersRequest.scopes;

        if (loginType === "popup") {
            instance.loginPopup({
                scopes: loginScopes,
                redirectUri: import.meta.env.VITE_POPUP_REDIRECT_URI,
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect({
                scopes: loginScopes,
            });
        }
    }

    return (
        <div>
            <Button
                // onClick={(event) => setAnchorEl(event.currentTarget)}
                

                variant="contained"
                onClick={() => handleLogin("popup")} key="loginPopup"
            >
                Iniciar sesión
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                {/* <MenuItem onClick={() => handleLogin("popup")} key="loginPopup">Iniciar sesión</MenuItem> */}
            </Menu>
        </div>
    )
};