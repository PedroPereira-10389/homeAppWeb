import { getApiBaseUrl, makeRequest } from "@/tools/tools";

export async function getRoles() {
    const url = getApiBaseUrl() + '/users/roles'
    const results = await makeRequest(url, 'GET', {}, true);
    return results
}