import { getApiBaseUrl, makeRequest } from "../tools";

export async function checkUserName(username: string) {
    const url = getApiBaseUrl() + '/users/username';
    const usernameApi = await makeRequest(url, 'POST', { username: username }, true);
    return usernameApi;
}

export function checkForm(formData: any, fields: any) {
    if (Object.keys(formData).length > 0 && (Object.keys(formData).length == fields.length)) {
        for (const key in formData) {
            if (formData[key] == '' && fields.includes(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export function createUserName(data: any) {
    if ((data.name != '' && data.name != undefined) && (data.last_name != '' && data.last_name != undefined)) {
        const maxLength = 10;
        const username = `${data.name}_${data.last_name}`.slice(0, maxLength);
        return username;
    }

}