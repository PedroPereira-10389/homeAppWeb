import { Message } from "@/components/toast";
import { getApiBaseUrl, makeRequest } from "@/tools/tools";

/*CRUD OPERATIONS FOR PRODUCTS*/

export async function getProducts() {
    const url = getApiBaseUrl() + '/products'
    const results = await makeRequest(url, 'GET', {}, true);
    return results
}

export async function createProduct(product: any) {
    const url = getApiBaseUrl() + '/products'
    const results = await makeRequest(url, 'POST', product, true);
    return results
}

export async function getProductById(id: any) {
    const url = getApiBaseUrl() + '/products/' + id
    const results = await makeRequest(url, 'GET', {}, true);
    return results;
}

export async function updateProduct(id: any) {
    const url = getApiBaseUrl() + '/products/' + id;
    const results = await makeRequest(url, 'PUT', {}, true);
    return results
}


export async function deleteProduct(id: any) {
    const url = getApiBaseUrl() + '/products/' + id;
    const results = await makeRequest(url, 'DELETE', {}, true);
    return results
}

export async function importProducts(files: any) {
    const url = getApiBaseUrl() + '/products/import'
    const formData = new FormData();
    formData.append('file', files);
    const results = await makeRequest(url, 'POST', formData, true);
    console.log(results)
    switch (results['status']) {
        case 200:
            return results['message'];
        default:
            return Message(results['message'], results['status']);
    }
}

