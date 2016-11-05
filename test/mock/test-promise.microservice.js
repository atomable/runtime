import { promisify } from 'atomable-sdk';

module.exports = (body, query, headers) => {
    return promisify({ body, query, headers });
};