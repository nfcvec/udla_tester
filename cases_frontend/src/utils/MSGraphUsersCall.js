import { loginRequest, graphConfig, graphRequest, graphUsersRequest } from "../authConfig";
import { msalInstance } from "../main";

export async function callMsGraphUsers(accessToken) {
    if (!accessToken) {
        const account = msalInstance.getActiveAccount();
        if (!account) {
            throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }
    
        const response = await msalInstance.acquireTokenSilent({
            ...graphUsersRequest,
            account: account,
            
        });
        accessToken = response.accessToken;
    }

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("https://graph.microsoft.com/users", options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
