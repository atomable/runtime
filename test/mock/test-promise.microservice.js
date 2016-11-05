module.exports = (body, query, headers) => {
    return new Promise((resolve, reject) => {
        resolve({ body, query, headers });
    });
};