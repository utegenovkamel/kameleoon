import { useState, useCallback } from "react";
import { TestI, SiteI } from "../interfaces";

type RequestType = (
    url: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: any
) => void;

type ClearErrorType = () => void;

export const useHttp = <T>() => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<T | null>(null);

    const request: RequestType = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setLoading(true);
            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers["Content-Type"] = "application/json";
                }

                const response = await fetch(url, { method, body, headers });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Что-то пошло не так");
                }

                setLoading(false);

                setData(data);
            } catch (e) {
                setLoading(false);
                setError(e.message);
                throw e;
            }
        },
        []
    );

    const clearError: ClearErrorType = useCallback(() => setError(null), []);

    return [request, data, loading, error, clearError] as [
        RequestType,
        T,
        boolean,
        null | string,
        ClearErrorType
    ];
};
