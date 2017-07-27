import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

    constructor() { }
    public extractData(res: Response) {
        const body = res.json();
        console.log(body);
        return body || {};
    }

    public handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure

        let errMsg: string;
        let body: any = {};
        if (error instanceof Response) {
            body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        if (body.Message == undefined || body.Message == "")
            body.Message = "Please contact help desk";
        console.error(errMsg);
        alert('Error, ' + body.Message);
        return Observable.throw(errMsg);
    }
}