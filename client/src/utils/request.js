const request = async (method,url,data,options = {}) => {
    if (method !== 'GET') {
        options.method=method;
}


if (data) {
    options = {
        ...options, 
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        body: JSON.stringify(data),
    }
}

const response = await fetch(url,options);
const responsContentType = response.headers.get('Content-Type');

if (!responsContentType) {
    return;
}

const result = await response.json();

return { result, response };

};

export default {
    get: request.bind(null,'GET'),
    post: request.bind(null,'POST'),
    put: request.bind(null,'PUT'),
    delete: request.bind(null,'DELETE'),
    baseRequest: request,
}