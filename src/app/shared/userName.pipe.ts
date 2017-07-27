import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
@Pipe({
    name: 'usr',
    pure: false
})
export class UsrPipe implements PipeTransform {
    username: string;
    prevUser: string;

    constructor(private authService: AuthService) { }
    transform(value: string): any {
        if (value != undefined && this.prevUser !== value) {
            this.prevUser = value;
            this.authService.getUserName().subscribe(x => {
                this.username = x;
            });

        }
        return this.username;


    }
}