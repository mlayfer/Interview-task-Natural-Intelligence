import HttpUtilsService from './httpUtills.service';
import HttpParams from "../../../models/HttpParams";

export default class HttpService {

    /** HTTP */

    static async get(url, params) {

        if (!params) {
            params = new HttpParams();
        }

        params.requestType = "GET";
        params.url = url;

        return this.performRequest(params);
    }

    static async performRequest(params) {

        let httpData = HttpUtilsService.getHttpData(params.requestType, params.headers, params.body);

        return fetch(params.url, httpData)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).catch(response => {
                console.log("http.service: Failed to fetch");
                return Promise.reject(response);
            });
    }
}

