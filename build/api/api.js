"use strict";
var index_1 = require('../index');
var Observable_1 = require('rxjs/Observable');
var request = require('request');
require('rxjs/add/observable/throw');
var Api = (function () {
    function Api() {
    }
    /**
     * Generate the url of the API to call
     */
    Api.getUrl = function (controller, action, version) {
        var url = index_1.Config.getBaseUrl();
        url += "/v" + version;
        url += "/" + controller;
        url += "/" + action;
        url += "/json";
        return url;
    };
    /**
     * Checks if the result is an error (there are many ways the api can return an error)
     */
    Api.isError = function (body) {
        if (body['status'] && body['status'] == 'FALSE') {
            return body['error'];
        }
        if (body['request'] && body['request']['result'] && body['request']['result'] == '0') {
            return body['request']['errorId'] + " " + body['request']['errorMessage'];
        }
        return false;
    };
    /**
     * Do a post request on the API.
     */
    Api.post = function (controller, action, version, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return Observable_1.Observable.create(function (observable) {
            var url = _this.getUrl(controller, action, version);
            data['token'] = index_1.Config.getApiToken();
            data['serviceId'] = index_1.Config.getServiceId();
            var jsonData = JSON.stringify(data);
            request.post({
                url: url,
                headers: { 'Content-Type': 'application/json' },
                body: jsonData,
            }, function (error, response, body) {
                if (error) {
                    observable.error(error);
                    return;
                }
                try {
                    body = JSON.parse(body);
                }
                catch (e) {
                    observable.error(body);
                    return;
                }
                if (_this.isError(body) !== false) {
                    observable.error(_this.isError(body));
                    return;
                }
                observable.next(body);
                observable.complete();
            });
        });
    };
    return Api;
}());
exports.Api = Api;
//# sourceMappingURL=api.js.map