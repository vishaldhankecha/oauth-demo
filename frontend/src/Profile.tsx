import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import { API_SERVER } from "./config";

export function Profile({
    token,
    setToken
}: {
    token: string;
    setToken: (t: string) => void;
}) {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        apiFetch(
            `${API_SERVER}/api/profile`,
            token,
            setToken
        ).then(setProfile);
    }

    return (
        <>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
            <button onClick={fetchData}>Refresh</button>
        </>
    );
}
