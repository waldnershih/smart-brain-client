const errorHandler = (response) => {
    const data = response.json();
    switch (response.status) {
        case 200:
        case 201:
            return data;

        case 400:
        case 401:
        case 403:
        case 404:
            return data.then((data) => {
                throw new Error(data.error);
            });

        default:
            return data.then(() => {
                throw new Error("Server error or Server is unavailable");
            });
    }
};

export default errorHandler;
