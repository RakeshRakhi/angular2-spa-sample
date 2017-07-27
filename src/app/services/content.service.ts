import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpService } from 'app/services/http/http.service';
import { AuthService } from 'app/services/auth/auth.service';
import { TranslateService } from 'app/services/Translate/translation.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ContentService {

    ePortalUrl = '';
    constructor(private http: Http, private httpService: HttpService,
        private translateService: TranslateService, private authService: AuthService) { }

    public getMenuLinks(rootName: string): Observable<any> {

        return this.http.get('./DataFiles/user_menu.json').map(x => x.json());;
        // return this.http.get(`/umbraco/api/contentApi/GetLinksItem?rootName=${rootName}&lan=${this.translateService.currentLang}`)
        //     .map(x => x.json())
        //     .catch(this.httpService.handleError);


    }
    public getTabs(): Observable<any> {

 return this.http.get('./DataFiles/userTabes.json').map(x => x.json());
        // return this.http.get(`/umbraco/api/contentApi/GetUserTabs?lan=${this.translateService.currentLang}`)
        //     .map(x => x.json())
        //     .catch(this.httpService.handleError);
    }
    public getsliderImages(lan: string = 'en'): Observable<Object> {
        return this.http.get('./DataFiles/pageSlider.json').map(x => x.json());
        // return this.http.get(`/umbraco/api/contentApi/GetUserPageSlider?lan=${lan}`)
        //     .map(x => x.json())
        //     .catch(this.httpService.handleError);
    }
    public getServiceslinks(type: string): Observable<Object> {
        const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
        const options = new RequestOptions({ headers: headers });

        return this.http.get(`/umbraco/api/contentApi/GetUserHomeLinks?type=${type}`, options)
            .map(x => x.json())
            .catch(this.httpService.handleError);
    }
    public getNews(): Observable<Object> {

        return this.http.get('./DataFiles/news.json').map(x => x.json());
        // return this.http.get(`/umbraco/api/contentApi/GetNews?lan=${this.translateService.currentLang}`)
        //     .map(x => x.json())
        //     .catch(this.httpService.handleError);
    }

    public getDecisionData(type: string): Observable<any> {

        const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
        const options = new RequestOptions({ headers: headers });

        return this.http.get(`/umbraco/api/contentApi/GetDecisionData?dataType=${type}`, options)
            .map(x => x.json())
            .catch(this.httpService.handleError);
    }

    public getSalarySlip() {
        const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
        const options = new RequestOptions({ headers: headers });

        return this.http.get(`/umbraco/api/contentApi/GetSalarySlip`, options)
            .map(x => x.json())
            .catch(this.httpService.handleError);
    }
    public getUserUpdateInfo() {
        // return this.http.get(`/umbraco/api/userAccountapi/GetUserUpdateInfo?lan=${this.translateService.currentLang}`)
        //     .map(x => x.json())
        //     .catch(this.httpService.handleError);


        return this.http.get('./DataFiles/UserRoles.json')
            .map(

            x => x.json().filter(x => x.userName == localStorage["userName"]))
            .catch(this.httpService.handleError);

    }
    public getUserInfo() {
        const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
        const options = new RequestOptions({ headers: headers });

        return this.http.get(`/umbraco/api/userAccountapi/GetUserInfo?lan=${this.translateService.currentLang}`, options)
            .map(x => x.json())
            .catch(this.httpService.handleError);
    }

    public getStudentInfo() {
        return this.http.get(`/umbraco/api/StudentApi/getStudentInfo?lan=${this.translateService.currentLang}`)
            .map(x => x.json())
            .catch(this.httpService.handleError);
    }
    public getStudentClass() {
        return this.http.get(`/umbraco/api/StudentApi/GetStudentClass?lan=${this.translateService.currentLang}`)
            .map(x => x.json())
            .catch(this.httpService.handleError);
    }

    public getStudentTranscript() {
        return this.http.get(`/umbraco/api/StudentApi/GetStudentTranscript?lan=${this.translateService.currentLang}`)
            .map(x => x.json())
            .catch(this.httpService.handleError);
    }
    public getStudentCalender() {
        const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
        const options = new RequestOptions({ headers: headers });

        return this.http.get(`/umbraco/api/StudentApi/GetAcadimicEvents?lan=${this.translateService.currentLang}`, options)
            .map(x => x.json())
            .catch(this.httpService.handleError);
    } getVacationInquery(userName: string, lang = 'en'): Observable<any> {
        const status = false;
        const currentLang = this.translateService.currentLang;
        if (currentLang.length == 2) lang = currentLang;
        const body = { 'userName': userName, 'lang': lang };
        const obs = this.http.post(this.ePortalUrl + '/api/ServiceAjax.svc/VicationInquery', body)
            .map(x => x.json())
            .catch(this.httpService.handleError);
        return obs;
    }

    getOverTimeInquery(userName: string, lang = 'en'): Observable<any> {
        const url = this.ePortalUrl + '/api/ServiceAjax.svc/OvertimeInquiry';

        const currentLang = this.translateService.currentLang;
        if (currentLang.length == 2) lang = currentLang;
        const body = { 'userName': userName, 'lang': lang };
        const obs = this.http.post(url, body)
            .map(x => x.json())
            .catch(this.httpService.handleError);
        return obs;
    }
    getDeputationInquery(userName: string, lang = 'en'): Observable<any> {
        const url = this.ePortalUrl + '/api/ServiceAjax.svc/DeputationInquiry';


        const headers = new Headers({ 'Access-Control-Request-Headers': 'Content-Type, Accept' });
        const options = new RequestOptions({ headers: headers });

        const currentLang = this.translateService.currentLang;
        if (currentLang.length == 2) lang = currentLang;
        const body = { 'userName': userName, 'lang': lang };
        const obs = this.http.post(url, body)
            .map(x => x.json())
            .catch(this.httpService.handleError);
        return obs;
    }
    getCourseInquery(userName: string, lang = 'en'): Observable<any> {
        const url = this.ePortalUrl + '/api/ServiceAjax.svc/CourseInquiry';
        const currentLang = this.translateService.currentLang;
        if (currentLang.length == 2) lang = currentLang;
        const body = { 'userName': userName, 'lang': lang };
        const obs = this.http.post(url, body)
            .map(x => x.json())
            .catch(this.httpService.handleError);
        return obs;
    }

    getSalaryCertificateInfo(userName: string, lang = 'en'): Observable<any> {
        const url = this.ePortalUrl + '/api/ServiceAjax.svc/SalaryCertificate';


        const headers = new Headers({ 'Access-Control-Request-Headers': 'Content-Type, Accept' });
        const options = new RequestOptions({ headers: headers });

        const currentLang = this.translateService.currentLang;
        if (currentLang.length == 2) lang = currentLang;
        const body = { 'userName': userName, 'lang': lang };
        const obs = this.http.post(url, body)
            .map(x => x.json())
            .catch(this.httpService.handleError);

        return obs;
    }

    getStudnetInfoFull(): Observable<any> {
        let url = `/umbraco/api/StudentApi/GetStudentInfoFull`;
        const obs = this.http.get(url)
            .map(x => x.json())
            .catch(this.httpService.handleError);
        return obs;
    }
    getSalaryCertificatePdf(userName: string, cmd = 'AS'): Observable<any> {
        const url = this.ePortalUrl + '/api/ServiceAjax.svc/GeneratSalaryCertificatePdf';


        const headers = new Headers({ 'Access-Control-Request-Headers': 'Content-Type, Accept' });
        const options = new RequestOptions({ headers: headers });

        const currentLang = this.translateService.currentLang;
        const body = { 'userName': userName, 'cmd': cmd };
        const obs = this.http.post(url, body, options)
            .map(x => x)
            .catch(this.httpService.handleError);
        return obs;
    }
    getDefinitionLetterPdf(userName: string): Observable<any> {
        const url = this.ePortalUrl + '/api/ServiceAjax.svc/GenerateDefinitionLetter';
        const headers = new Headers({ 'Access-Control-Request-Headers': 'Content-Type, Accept' });
        const options = new RequestOptions({ headers: headers });

        const currentLang = this.translateService.currentLang;
        const body = { 'userName': userName };
        const obs = this.http.post(url, body, options)
            .map(x => x)
            .catch(this.httpService.handleError);
        return obs;
    }
}
