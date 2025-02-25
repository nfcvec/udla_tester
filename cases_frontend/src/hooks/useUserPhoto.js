import { useState, useEffect } from 'react';
import { msalInstance } from '../main';
import { graphUsersRequest } from '../authConfig';

const useUserPhoto = (userId) => {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            setLoading(true);
            try {
                const account = msalInstance.getActiveAccount();
                if (!account) {
                    throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
                }

                const response = await msalInstance.acquireTokenSilent({
                    ...graphUsersRequest,
                    account: account,
                });

                const accessToken = response.accessToken;
                const headers = new Headers();
                const bearer = `Bearer ${accessToken}`;
                headers.append("Authorization", bearer);

                const photoUrl = `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`;
                const photoBlob = await fetch(photoUrl, { headers })
                    .then(response => response.blob())
                    .catch(error => console.log(error));

                setPhoto(URL.createObjectURL(photoBlob));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhoto();
    }, [userId]);

    return { photo, loading, error };
};

export default useUserPhoto;
