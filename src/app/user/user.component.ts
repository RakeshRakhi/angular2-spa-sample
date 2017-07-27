import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { ContentService } from 'app/services/content.service';
import { NgRedux, select, } from "@angular-redux/store";
import { IUserProfile } from "app/State/IUserProfile";
import { AddUserInfo, AddName } from 'app/state/actions'
import { Observable } from "rxjs/Observable";
import { TranslateService } from "app/services/Translate/translation.service";
import { Router } from "@angular/router";
 

@Component({

    templateUrl: './user.component.html',
    styles: []
})
export class UserComponent implements OnInit {
 
    constructor(private authService: AuthService,
        private contentService: ContentService,
        private translateService: TranslateService,
        private ngRedux: NgRedux<IUserProfile>, private router: Router) { }


    @select("UserInfo") name$: Observable<any>;
    name: string;
    ngOnInit() {
       
        this.getMainMenu();

        let state = this.ngRedux.getState();
        if (state.Role == 'user') {
            this.name$.subscribe(x => {
                if (this.translateService.currentLang == "ar")
                    this.name = this.getShortName(x.Full_Name_Ar);
                else
                    this.name = this.getShortName(x.Full_Name);
            });
            this.getUserInfo();

        }
        else if (state.Role == 'student') {
            this.name$.subscribe(x => {
                if (this.translateService.currentLang == "ar")
                    this.name = this.getShortName(x.NAME);
                else
                    this.name = this.getShortName(x.ENGLISH_NAME);
            });
            this.getStudentInfo();
        }



    }
    mainMenu: any;
    sliderImage: any;
    userRole: string;
    userInfo: any = {};

    getUserInfo() {
        const observable = this
            .contentService
            .getUserUpdateInfo();
        observable.subscribe(next => {
            // add the information to the state store 

            this.ngRedux.dispatch({ type: AddUserInfo, value: next });
        }, error => console.log(error), () => { });
    }
    getStudentInfo() {
        this.contentService
            .getStudentInfo().subscribe(next => {
                // add the information to the state store 

                this.ngRedux.dispatch({ type: AddUserInfo, value: next });
            }, error => console.log(error), () => { });
    }
    getFullInfo() {
        const observable = this
            .contentService
            .getUserInfo();
        observable.subscribe(next => this.userInfo = next, error => console.log(error), () => { });
    }
    vacation: any;
    getMainMenu() {
        const observable = this
            .contentService
            .getMenuLinks('Main Menu');
        observable.subscribe(next => this.mainMenu = next, error => console.log(error), () => { });
    }
    searchTabs(value: string) {
        this.router.navigate(["user/dashboard"]).then(x => {
            // alert(value);
        });

    }
    getShortName(name: any): string {
        return name;
    }
}
