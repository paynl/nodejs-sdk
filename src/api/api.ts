import { Config } from '../index';
import { Observable } from 'rxjs/Observable'

import * as request from 'request';
import 'rxjs/add/observable/throw';

export class Api {
    static getUrl(controller, action, version) {
        var url = Config.getBaseUrl();
        url += "/v" + version;
        url += "/" + controller;
        url += "/" + action;
        url += "/json";
        return url;
    }
    /**
     * Checks if the result is an error (there are many ways the api can return an error)
     */
    private static isError(body){         
        if(body['status'] && body['status'] == 'FALSE'){
            return body['error']; 
        }
        if(body['request'] && body['request']['result'] && body['request']['result'] == '0'){
            return body['request']['errorId']+" "+body['request']['errorMessage']; 
        }
        return false;
    }  
    static post(controller, action, version, data = {}): Observable<any> {
        return Observable.create((observable) => {
            let url = this.getUrl(controller, action, version);
          
            data['token'] = Config.getApiToken();
            data['serviceId'] = Config.getServiceId();
            
            let jsonData = JSON.stringify(data);           
            request.post({
                url: url,
                headers: {'Content-Type': 'application/json'},
                body: jsonData,
            }, (error, response, body) => {               
                if(error){
                    throw(error);
        
                }
                body = JSON.parse(body);

                if(this.isError(body) !== false){
                    throw(this.isError(body));                  
                }

                observable.next(body);
                observable.complete();
            });
        });

    }
}