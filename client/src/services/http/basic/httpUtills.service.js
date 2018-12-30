/**
 * Http convenience methods. This codebase should be pure and not dependent on the other app's modules
 */
export default class HttpUtilsService {

    static getHttpData (method, headers, body) {
        return {
            method: method,
            headers: headers,
            body: (!!body && Object.keys(body).length !== 0) ? JSON.stringify(body) : undefined
        };
    }
}
