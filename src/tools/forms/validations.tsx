import { getApiBaseUrl, makeRequest } from "../tools";

export async function checkUserName(firstName: string, lastName: string) {
    const url = getApiBaseUrl() + '/users/username';
    const maxLength = 10;
    const username = `${firstName}_${lastName}`.slice(0, maxLength);
    const usernameApi = await makeRequest(url, 'POST', { username: username }, true);
    return usernameApi;
}

export function checkForm(formData: any, fields: any) {
    if (Object.keys(formData).length > 0 && (Object.keys(formData).length == fields.length)) {
        for (const key in formData) {
            if (formData[key] == '' && fields.includes(key)) {
                return false
            }
        }
        return true;
    }

    return false;
}