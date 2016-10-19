"use strict";
const index_1 = require('../index');
const Observable_1 = require('rxjs/Observable');
const request = require('request');
require('rxjs/add/observable/throw');
class Api {
    static getUrl(controller, action, version) {
        var url = index_1.Config.getBaseUrl();
        url += "/v" + version;
        url += "/" + controller;
        url += "/" + action;
        url += "/json";
        return url;
    }
    /**
     * Checks if the result is an error (there are many ways the api can return an error)
     */
    static isError(body) {
        if (body['status'] && body['status'] == 'FALSE') {
            return body['error'];
        }
        if (body['request'] && body['request']['result'] && body['request']['result'] == '0') {
            return body['request']['errorId'] + " " + body['request']['errorMessage'];
        }
        return false;
    }
    static post(controller, action, version, data = {}) {
        return Observable_1.Observable.create((observable) => {
            let url = this.getUrl(controller, action, version);
            data['token'] = index_1.Config.getApiToken();
            data['serviceId'] = index_1.Config.getServiceId();
            let jsonData = JSON.stringify(data);
            request.post({
                url: url,
                headers: { 'Content-Type': 'application/json' },
                body: jsonData,
            }, (error, response, body) => {
                if (error) {
                    throw (error);
                }
                body = JSON.parse(body);
                if (this.isError(body) !== false) {
                    throw (this.isError(body));
                }
                observable.next(body);
                observable.complete();
            });
        });
    }
}
exports.Api = Api;
//# sourceMappingURL=api.js.map