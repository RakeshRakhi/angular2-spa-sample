import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { LoginModel } from 'app/login-model';
import { HttpService } from 'app/services/http/http.service';

@Injectable()
export class AuthService {
    _data: any;
    errorMessage: any;
    headers: Headers;

    constructor(private http:  Http, private _httpService: HttpService) {

    }
 
    public checkLogin(role: Object): Observable<any> {
        const url = '/api/UserAccountApi/IsLogedIn';
        return this.http.get(url)
            .map(x => x.json())
            .catch(this._httpService.handleError);
    }
     simulateCheckLoginRole(data:any):Array<boolean>{
         debugger;
        if(data.json().filter(x=>x.userName == localStorage["userName"]).length >0)
            return [true];
       return [false];
     }   
    public checkLogedinRole(role: object): Observable<boolean> {

        return this.http.get('./DataFiles/UserRoles.json').
        flatMap(x=> Observable.from(this.simulateCheckLoginRole(x)));
     
        // const url = '/umbraco/api/UserAccountApi/IsLogedInRoled';
        // return this.http.post(url, role)
        //     .map(x => x.json())
        //     .catch(this._httpService.handleError);




    }
    simulateLogin(data:any, model: LoginModel):Array<boolean>{


        let logindata = data.filter(x=>x.userName == model.UserName &&x.password == model.Password);
        if(logindata !==null )
             return [true]

        return [false];
    }
    public login(model: LoginModel): Observable<boolean> {


        // const obs = this.http.post('/umbraco/api/UserAccountApi/login', model)
        //     .map(x => x.json())
        //     .catch(this._httpService.handleError);
        // return obs;

        return this.http.get('./DataFiles/UserRoles.json').map(x =>
            x.json()).flatMap(x => Observable.from(this.simulateLogin(x, model)));
    }
    logout(): Observable<boolean> {

        const obs = this.http.get('/umbraco/api/UserAccountApi/logout')
            .map(x => x.json())
            .catch(this._httpService.handleError);
        return obs;

    }

    getRoles(): Observable<Array<string>> {


        // const obs = this.http.get('/api/UserAccountApi/GetUserRoles')
        //     .map(x => x.json())
        //     .catch(this._httpService.handleError);
        // return obs;
debugger;
        let data = this.getClearUserName().flatMap(x =>
            this.http.get('./DataFiles/UserRoles.json').
            map(f => f.json().filter(j => j.userName == x)[0].roles)
        );
        return data;

    }
    getUserName(): Observable<string> {
        const status = false;

        // const obs = this.http.get('/api/UserAccountApi/GetUserName')
        //     .map(x => x.json())
        //     .catch(this._httpService.handleError);
        //      return obs;

        //encrypted user name
        return Observable.from(["X4UTS51rsa8="]);


    }
    getClearUserName(): Observable<string> {
        const status = false;
        // const obs = this.http.get('/api/UserAccountApi/GetClearUserName')
        //     .map(x => x.json())
        //     .catch(this._httpService.handleError);

        // return obs;
        return Observable.from([localStorage["userName"]]);

    }



}
