import { getApiBaseUrl, makeRequest } from "@/tools/tools";

export async function getSubscriptionsType() {
    const url = getApiBaseUrl() + '/users/subscriptions/type'
    const results = await makeRequest(url, 'GET', {}, true);
    return results
  }