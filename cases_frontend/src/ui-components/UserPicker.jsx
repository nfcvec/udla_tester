import React, { useEffect } from "react";
import { callMsGraphUsers } from "../utils/MSGraphUsersCall";
import { Box, Typography } from "@mui/material";

export default function UserPicker() {

    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        callMsGraphUsers().then(response => {
            setUsers(response);
            console.log(response);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    return (
        <>
            <Box>
                <Typography variant="h4">User Picker</Typography>
            </Box>
            
        </>
    );
}

