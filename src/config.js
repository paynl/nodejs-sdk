"use strict";
class Config {
    static setApiToken(apiToken) {
        this.apiToken = apiToken;
    }
    static getApiToken() {
        return this.apiToken;
    }
    static setServiceId(serviceId) {
        this.serviceId = serviceId;
    }
    static getServiceId() {
        return this.serviceId;
    }
    static setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }
    static getBaseUrl() {
        return this.baseUrl;
    }
}
Config.baseUrl = "https://rest-api.pay.nl";
exports.Config = Config;
//# sourceMappingURL=config.js.map