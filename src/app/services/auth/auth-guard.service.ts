import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Injectable()
export class AuthGuardService {
    isloggedIn = false;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const absorver =
            this.auth
                .checkLogedinRole(route.data)
                .take(1);

        absorver.toPromise().then(x => {
            this.isloggedIn = x;
            if (!x) {
                this.router.navigate(['login']);
            }
        });
        return absorver;
    }
    constructor(private router: Router, private auth: AuthService) { }
}
