import { Component, OnInit } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { AuthService } from 'app/services/auth/auth.service';
import { Router } from "@angular/router";
import { PortalNotificationService } from "app/services/portal-notification.service";

@Component({
    moduleId: module.id,
    templateUrl: 'salarycertificate.component.html'
})
export class SalaryCertificateComponent implements OnInit {

    constructor(private contentService: ContentService, private authservice: AuthService,
        private notify: PortalNotificationService) { }

    salaryCertificateInfo: any = {};
    ngOnInit() {
        this.getUserName();
        const authObserv =
            this.authservice.getClearUserName()
                .flatMap(userNameresult => this.contentService.getSalaryCertificateInfo(userNameresult));

      this.busy =  authObserv.subscribe(next => {
            if (next.d != undefined) {
                if ((next.d.ErrorMessage != undefined && next.d.ErrorMessage != "") || next.d.Employment_No == null) {
                    this.notify.NotifyNoDataUser();
                }
                this.salaryCertificateInfo = next.d;
            }
        },
            error => console.log(error),
            () => {
                //console.log(this.salaryCertificateInfo);
            });
    }
    busy: any;
    urlBase: string = 'https://eservices.uod.edu.sa/eportal/api';
    //urlBase: string = 'http://localhost:25762/api';
    apiUrl: string = this.urlBase + '/ServiceAjax.svc/GeneratSalaryCertificatePdf';
    usr: string = "";
    getUserName() {
        this.busy = this.authservice.getUserName().subscribe(next => {
            if (next != undefined) {

                this.usr = next;
            }
        },
            error => console.log(error),
            () => {
                console.log(this.salaryCertificateInfo);
            });
    }
}