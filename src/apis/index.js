import errorHandler from "../utils/errorHandler";

const baseUrl = "http://localhost:3001";

const fetchApi = async (path, token) => {
    const url = `${baseUrl}/${path}`;
    return await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    })
        .then((response) => response.json())
        .then((response) => errorHandler(response));
};

const postApi = (path, data, token) => {
    const url = `${baseUrl}/${path}`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
    }).then((response) => errorHandler(response));
};

const putApi = (path, data, token) => {
    const url = `${baseUrl}/${path}`;
    return fetchfetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
    }).then((response) => errorHandler(response));
};

const deleteApi = (path, token) => {
    const url = `${baseUrl}/${path}`;
    return fetch(url, {
        method: "DELETE",
    }).then((response) => errorHandler(response));
};

export { fetchApi, postApi, putApi, deleteApi };
