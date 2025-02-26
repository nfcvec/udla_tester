import { graphRequest } from "../authConfig";
import { msalInstance } from "../main";

export async function callMsGraphUserDetails({ accessToken, userId }) {
    if (!accessToken) {
        const account = msalInstance.getActiveAccount();
        if (!account) {
            throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }

        const response = await msalInstance.acquireTokenSilent({
            scopes: graphRequest.scopes,
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

    const url = new URL(`https://graph.microsoft.com/v1.0/users/${userId}`);

    return fetch(url, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}