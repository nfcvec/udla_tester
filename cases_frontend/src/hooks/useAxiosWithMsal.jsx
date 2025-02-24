import { useState, useCallback } from 'react';
import { InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import axios from 'axios';

/**
 * Custom hook to call a web API using bearer token obtained from MSAL
 * @param {Object} msalRequest 
 * @returns 
 */
const useAxiosWithMsal = (msalRequest) => {
    const { instance } = useMsal();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const { result, error: msalError } = useMsalAuthentication(InteractionType.Popup, {
        ...msalRequest,
        account: instance.getActiveAccount(),
        redirectUri: '/redirect'
    });

    /**
     * Execute an axios request with the given options
     * @param {Object} config: Axios request configuration
     * @returns JSON response
     */
    const execute = async (config) => {
        if (msalError) {
            console.error("MSAL Error:", msalError);
            setError(msalError);
            return;
        }

        if (result) {
            try {
                console.log('Calling API with token:', result.accessToken);
                const headers = {
                    ...config.headers,
                    Authorization: `Bearer ${result.accessToken}`,
                };

                setIsLoading(true);

                const response = await axios({ ...config, headers });
                setData(response.data);

                setIsLoading(false);
                return response.data;
            } catch (e) {
                console.error("Request Error:", e);
                setError(e);
                setIsLoading(false);
                throw e;
            }
        }
    };
//hola
    return {
        isLoading,
        error,
        data,
        execute: useCallback(execute, [result, msalError]), // to avoid infinite calls when inside a `useEffect`
    };
};

export default useAxiosWithMsal;