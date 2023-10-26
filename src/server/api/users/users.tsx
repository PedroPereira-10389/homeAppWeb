import { checkUserName } from "@/tools/forms/validations";
import { getApiBaseUrl, makeRequest } from "@/tools/tools";

export async function getUsers() {
  const url = getApiBaseUrl() + '/users'
  const results = await makeRequest(url, 'GET', {}, true);
  return results
}

export async function createorUpdateUser(user: any) {
  var usernameInUse = false;

  if (user.id == undefined) {
    const isInUse = await checkUserName(user.name, user.last_name);
    usernameInUse = isInUse['message']
  }

  let results = {};
  if (!usernameInUse || user.id != undefined) {
    const url = getApiBaseUrl() + '/users'
    results = await makeRequest(url, 'POST', user, true);

  } else {
    results = { status: 500, message: 'Username Already in use' }
  }

  return results;
}

export async function getUserById(uuid: any) {
  const url = getApiBaseUrl() + '/users/user/' + uuid
  const results = await makeRequest(url, 'GET', {}, true)
  return results;
}

