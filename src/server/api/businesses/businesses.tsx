import { getApiBaseUrl, makeRequest } from "@/tools/tools";

export async function getBusinesses() {
    const url = getApiBaseUrl() + '/surveys/businesses'
    const results = await makeRequest(url, 'GET', {}, true);
    return results
}