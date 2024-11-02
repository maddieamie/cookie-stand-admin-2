import useSWR from 'swr';
import { useAuth } from '../contexts/auth';

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function useResource() {
    const { tokens, logout } = useAuth();
    // const { data, error, mutate } = useSWR([apiUrl, tokens], fetchResource);
    const { data, error, mutate } = useSWR(tokens ? apiUrl : null, fetchResource);


    async function fetchResource(url) {
        if (!tokens) return;

        try {
            const response = await fetch(url, config());
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (err) {
            handleError(err);
        }
    }

    async function createResource(info) {
        const newResource = { ...info, id: Date.now() }; // Generate a temporary ID
        mutate((currentData) => [...(currentData || []), newResource], false); // Optimistically update

        try {
            const options = config();
            options.method = "POST";
            options.body = JSON.stringify(info);
            await fetch(apiUrl, options);
            mutate(); 
            // Refetch the complete collection after the API call
        } catch (err) {
            handleError(err);
        }
    }

    async function deleteResource(id) {
        mutate((currentData) => (currentData || []).filter(resource => resource.id !== id), false); // Optimistically update

        try {
            const url = apiUrl + id + '/'; // Ensure you include the trailing slash
            const options = config();
            options.method = "DELETE";
            await fetch(url, options);
            mutate(); // Refetch the complete collection after the API call
        } catch (err) {
            handleError(err);
        }
    }

    async function updateResource(updatedInfo) {
        // Optimistically update the local state
        mutate((currentData) => {
            if (!currentData) return [];
            return currentData.map(resource =>
                resource.id === updatedInfo.id ? { ...resource, ...updatedInfo } : resource
            );
        }, false); // Set to false to avoid refetching immediately

        try {
            const url = apiUrl + updatedInfo.id + '/'; // Ensure you include the trailing slash
            const options = config();
            options.method = "PUT"; // Use PUT for updating
            options.body = JSON.stringify(updatedInfo);
            await fetch(url, options);
            mutate(); // Refetch the complete collection after the API call
        } catch (err) {
            handleError(err);
        }
    }

    function config() {
        return {
            headers: {
                'Authorization': 'Bearer ' + tokens.access,
                'Content-Type': 'application/json',
            }
        };
    }

    function handleError(err) {
        console.error(err);
        logout(); // Handle token expiry or other errors
    }

    return {
        resources: data,
        error,
        loading: tokens && !error && !data,
        createResource,
        deleteResource,
        updateResource,
    };
}
