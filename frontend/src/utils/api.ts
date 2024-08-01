/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "http://localhost:8080/api/v1";
const api = {
    server: {
        POST: async (path: string, payload: Record<string, any>) => {
            const token = localStorage.getItem('token');
            return fetch(`${BASE_URL}${path}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
        },
        PUT: async (path: string, payload: Record<string, any>) => {
            const token = localStorage.getItem('token');
            return fetch(`${BASE_URL}${path}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
        },
        GET: async (path: string) => {
            const token = localStorage.getItem('token');
            return fetch(`${BASE_URL}${path}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        },
    },
};

export default api;
