import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';


@Component({

    selector: 'nav-top',
    templateUrl: './top_menu.component.html'
})

export class TopMenuNavComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }
    logout() {
        // const observal = this.authService.logout();
        // observal.subscribe(
        //     res => {
        //         this.router.navigate(['login']);
        //     },
        //     error => {
        //         console.log(error);
        //         this.router.navigate(['login']);
        //     }


        // );
        localStorage.clear();
        this.router.navigate(['login']);

    }
    changeLang() {
        let currentLang = localStorage.getItem('lang');
        if (currentLang == undefined)
            currentLang = 'en';
        if (currentLang == 'en')
            localStorage.setItem('lang', 'ar');
        else
            localStorage.setItem('lang', 'en');

        location.reload();
    }

    ngOnInit() {


    }
}