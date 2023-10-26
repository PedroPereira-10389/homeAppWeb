import { getApiBaseUrl, makeRequest } from "@/tools/tools";

export async function getSurveysByUser(userId: string) {
    const url = getApiBaseUrl() + '/surveys/user/' + userId
    const results = await makeRequest(url, 'GET', {}, true);
    return results
}

export async function createSurvey(data: any) {
    const url = getApiBaseUrl() + '/surveys';
    const results = await makeRequest(url, 'POST', data, true);
    return results
}