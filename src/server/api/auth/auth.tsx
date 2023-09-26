import { makeRequest } from "@/tools/tools";

export async function authApi(credentials: any) {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + ":" + process.env.NEXT_PUBLIC_API_BASE_PORT + "/users/auth";
    const results = await makeRequest(url, 'POST', credentials, false);
    return results;
}
