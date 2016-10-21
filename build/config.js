"use strict";
var Config = (function () {
    function Config() {
    }
    Config.setApiToken = function (apiToken) {
        this.apiToken = apiToken;
    };
    Config.getApiToken = function () {
        return this.apiToken;
    };
    Config.setServiceId = function (serviceId) {
        this.serviceId = serviceId;
    };
    Config.getServiceId = function () {
        return this.serviceId;
    };
    Config.setBaseUrl = function (baseUrl) {
        this.baseUrl = baseUrl;
    };
    Config.getBaseUrl = function () {
        return this.baseUrl;
    };
    Config.baseUrl = "https://rest-api.pay.nl";
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map