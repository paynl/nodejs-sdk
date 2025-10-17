/* eslint-disable */
// @ts-nocheck

import { ServiceConfig } from '../index';
import { Observable } from 'rxjs/Observable';
import * as request from 'request';
import 'rxjs/add/observable/throw';

export class Api {
    /**
     * Generate the url of the API to call
     */
    static getUrl(controller, action, version) {
        let url = Config.getBaseUrl();
        url += '/v' + version;
        url += '/' + controller;
        url += '/' + action;
        url += '/json';
        return url;
    }
    /**
     * Checks if the result is an error (there are many ways the api can return an error)
     */
    private static isError(body) {
        if (body['status'] && body['status'] == 'FALSE') {
            return body['error'];
        }
        if (body['request'] && body['request']['result'] && body['request']['result'] == '0') {
            return body['request']['errorId'] + ' ' + body['request']['errorMessage'];
        }
        return false;
    }
    /**
     * Do a post request on the API.
     */
    static post(controller: string, action: string, version: number, data = {}): Observable<any> {
        return Observable.create(observable => {
            const url = this.getUrl(controller, action, version);

            data['token'] = Config.getApiToken();
            data['serviceId'] = Config.getServiceId();

            const jsonData = JSON.stringify(data);

            request.post(
                {
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    body: jsonData,
                },
                (error, response, body) => {
                    if (error) {
                        observable.error(error);
                        return;
                    }

                    try {
                        body = JSON.parse(body);
                    } catch (e) {
                        observable.error(body);
                        return;
                    }

                    if (response.statusCode !== 200) {
                        if (this.isError(body) !== false) {
                            observable.error(this.isError(body));
                            return;
                        } else {
                            observable.error(response.statusCode + ' ' + response.statusMessage);
                            return;
                        }
                    }

                    if (this.isError(body) !== false) {
                        observable.error(this.isError(body));
                        return;
                    }

                    observable.next(body);
                    observable.complete();
                },
            );
        });
    }
}
