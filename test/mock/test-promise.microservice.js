module.exports = (body, query, headers) =>
    new Promise(resolve => resolve({ body, query, headers }));
