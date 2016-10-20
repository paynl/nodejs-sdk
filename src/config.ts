export class Config {
    private static apiToken: string;
    private static serviceId: string;
    private static baseUrl = "https://rest-api.pay.nl";

    static setApiToken(apiToken: string) {
        this.apiToken = apiToken;
    }
    static getApiToken() {
        return this.apiToken;
    }
    static setServiceId(serviceId: string) {
        this.serviceId = serviceId;
    }
    static getServiceId() {
        return this.serviceId;
    }
    static setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    static getBaseUrl() {
        return this.baseUrl;
    }
}