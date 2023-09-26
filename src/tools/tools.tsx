import axios, { AxiosRequestConfig } from "axios";
import { getSession, useSession } from "next-auth/react";

export async function makeRequest(url: string, method: any, body: any, usingHeaders: boolean) {
    const config = usingHeaders ? await getHeaders(usingHeaders) : {};
    console.log(config)
    switch (method) {
        case 'GET' || 'GET'.toLowerCase():
            return axios.get(url, config).then(function (response) { return response.data }).catch(err => err);
        case 'POST' || 'POST'.toLowerCase():
            return axios.post(url, body, config).then(function (response) { return response.data }).catch(err => err);
        case 'PUT' || 'PUT'.toLowerCase():
            return axios.put(url, body, config).then(function (response) { response.data }).catch(err => err);
        case 'DELETE' || 'DELETE'.toLowerCase():
            return axios.delete(url, config).then(function (response) { response.data }).catch(err => err);
        default:
            break;
    }
}

export function getApiBaseUrl() {
    return process.env.NEXT_PUBLIC_API_BASE_URL + ":" + process.env.NEXT_PUBLIC_API_BASE_PORT
}

export async function getHeaders(usingHeaders: boolean) {
    if (usingHeaders) {
        const session = await getSession();
        const access_token = session?.access_token;
        console.log(access_token)
        return {
            headers: {
                Authorization: "Bearer " + access_token
            }
        }
    }
}