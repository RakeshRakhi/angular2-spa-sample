import { Component, OnInit } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { AuthService } from 'app/services/auth/auth.service';
import { PortalNotificationService } from "app/services/portal-notification.service";


@Component({
    moduleId: module.id,

    templateUrl: 'vacationInquery.component.html'
})
export class VacationInquery implements OnInit {
    constructor(private contentService: ContentService, private authservice: AuthService
        , private notify: PortalNotificationService) { }
    busy: any;
    vacationInqueryData: any = {};
    ngOnInit() {
        const authObserv = this.authservice.getClearUserName()
            .flatMap(userNameresult => this.contentService.getVacationInquery(userNameresult));

        this.busy = authObserv.subscribe(next => {
            if (next.d != undefined) {
                this.vacationInqueryData = next.d;
            }
        },
            error => {
                console.log(error);
                this.notify.NavigateHomeOnly();
            },
            () => {
                console.log(this.vacationInqueryData);

            });
    }


}