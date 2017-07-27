import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'app/login-model';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { TranslateService } from 'app/services/Translate/translation.service';
import { NgRedux } from "@angular-redux/store/lib";
import { IUserProfile } from "app/state/iUserProfile";
import { AssignRole } from "app/state/actions";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    busy: any;
    vacation: any;
    ngOnInit(): void { }

    model: any;
    isLoggedin = false;
    loginAuthMsg: string;
    passweordtxt: any = { 'Password': 'كلمة السر' };
    constructor(private authService: AuthService, private router: Router,
        private translationService: TranslateService, private ngredux: NgRedux<IUserProfile>) {
        this.model = new LoginModel();

    }
    onsubmit() {
        debugger;
        const observable = this.authService.login(this.model);
        observable.finally(() => {
           
        });
         
        this.busy = observable.toPromise().then((x) => {
            this.isLoggedin = x;
            let userRole = "";
      
            if (this.isLoggedin) {
                if (+this.model.UserName > 0)
                    userRole = 'student'
                else
                    userRole = 'user';
                localStorage.setItem("userName",this.model.UserName)
                this.router.navigate([userRole]);
                this.ngredux.dispatch({type: AssignRole, value:userRole})

            } else {
                this.loginAuthMsg = 'User name or password is wrong.';
            }
        });


    }
    changeLang() {
        this.translationService.ChangeLang();
    }


}
