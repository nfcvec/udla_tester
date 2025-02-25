import { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
import { graphUsersRequest, loginRequest } from "../authConfig";

// Sample app imports
import { ProfileData } from "../ui-components/ProfileData";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import { callMsGraph } from "../utils/MsGraphApiCall";

// Material-ui imports
import Paper from "@mui/material/Paper";
import { callMsGraphUsers } from "../utils/MSGraphUsersCall";
import { Box, Typography } from "@mui/material";


const ProfileContent = () => {
    const { instance, inProgress } = useMsal();// permite interactuar con el objeto MsalProvider
    const [graphData, setGraphData] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!graphData && inProgress === InteractionStatus.None) {
                    const graphResponse = await callMsGraph();
                    setGraphData(graphResponse);

                    const usersResponse = await callMsGraphUsers();
                    console.log(usersResponse.value);
                    setUsers(usersResponse.value);
                }
            } catch (e) {
                if (e instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect({
                        scopes: loginRequest.scopes,
                        account: instance.getActiveAccount()
                    });
                }
            }
        };

        fetchData();
    }, [inProgress, graphData, instance]);

    return (
        <Paper>
            {graphData ? <ProfileData graphData={graphData} /> : null}
            <Box>
                <Typography variant="h4">User Picker</Typography>
            </Box>
            {

                users.map((user, index) => {
                    return (
                        <div key={index}>
                            <Typography variant="h6">{user.displayName}</Typography>
                            <Typography variant="body1">{user.userPrincipalName}</Typography>
                        </div>
                    );
                })
            }
        </Paper>
    );
};

export function Profile() {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Popup}
            authenticationRequest={authRequest}
            errorComponent={ErrorComponent}
            loadingComponent={Loading}
        >
            <ProfileContent />

        </MsalAuthenticationTemplate>
    )
};