import { useState, useEffect } from 'react';
import { callMsGraphUsers } from '../utils/MSGraphUsersCall';

const useMsGraphUsers = (search) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const usersResponse = await callMsGraphUsers({ search });
                if (usersResponse && usersResponse.value) {
                    for (const user of usersResponse.value) {
                        const photoUrl = `https://graph.microsoft.com/v1.0/users/${user.id}/photo/$value`;
                        user.photo = await fetch(photoUrl, {
                            headers: {
                                Authorization: `Bearer ${usersResponse.accessToken}`
                            }
                        })
                        .then(response => response.blob())
                        .then(blob => URL.createObjectURL(blob))
                        .catch(error => console.log(error));
                    }
                    setUsers(usersResponse.value);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [search]);

    return { users, loading, error };
};

export default useMsGraphUsers;
