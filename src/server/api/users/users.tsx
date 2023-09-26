import { checkUserName } from "@/tools/forms/validations";
import { getApiBaseUrl, makeRequest } from "@/tools/tools";

export async function getUsers() {
    const url = getApiBaseUrl() + '/users'
    const results = await makeRequest(url, 'GET', {}, true);
    return results
}

export async function createUser(user: any) {
    const usernameCheck = await checkUserName(user.name, user.last_name);
    let results = {};
    if (usernameCheck) {
     /*   const url = getApiBaseUrl() + '/users'
        results = await makeRequest(url, 'POST', { username: user.username }, true);*/
    } else {
        results = usernameCheck;
    }
    return results;
}