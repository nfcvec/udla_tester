import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import Typography from "@mui/material/Typography";

const WelcomeName = () => {
    const { instance } = useMsal();
    const [name, setName] = useState(null);

    const activeAccount = instance.getActiveAccount();
    useEffect(() => {
        if (activeAccount) {
            setName(activeAccount.name);
        } else {
            setName(null);
        }
    }, [activeAccount]);

    if (name) {
        return <Typography variant="h6">Bienvenido, {name}</Typography>;
    } else {
        return null;
    }
};

export default WelcomeName;