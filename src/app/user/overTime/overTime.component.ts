import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal';
import { ContentService } from 'app/services/content.service';
import { AuthService } from 'app/services/auth/auth.service';
import { PortalNotificationService } from "app/services/portal-notification.service";



@Component({
    moduleId: module.id,
    templateUrl: 'overTime.component.html',

})

export class OverTimeComponent implements OnInit {

    @ViewChild('modal')
    modal: ModalComponent;


    constructor(private contentService: ContentService, private authservice: AuthService,
    private notify:PortalNotificationService) { }
    busy: any;
    overTime: any = {};
    ngOnInit() {
        const authObserv =
            this.authservice.getClearUserName().flatMap(userNameresult => this.contentService.getOverTimeInquery(userNameresult));
        this.busy = authObserv.subscribe(next => {
            if (next.d != undefined) {
                this.overTime = next.d;
            }
        },
            error => {
                console.log(error);
                this.notify.NavigateHomeOnly();
            },
            () => {
                console.log(this.overTime);
            });
    }
    detailsData: any = {};
    openDetails(dNo: string) {

        const details = this.overTime.OvertimeInfoList.filter(x => x.DecisionNo == dNo);
        if (details.length > 0) {
            this.detailsData = details[0];
            this.modal.open();
        }

    }
    onOpen() {

    }

}