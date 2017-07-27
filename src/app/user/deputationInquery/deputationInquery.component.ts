import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal';
import { AuthService } from 'app/services/auth/auth.service';
import { ContentService } from 'app/services/content.service';
import { PortalNotificationService } from "app/services/portal-notification.service";
@Component({
    moduleId: module.id,
    templateUrl: 'deputationInquery.component.html',

})
export class DeputationInqueryComponent implements OnInit {
    @ViewChild('modal')
    modal: ModalComponent;
    busy: any;
    deputationData: any = {};

    constructor(private contentService: ContentService, private authservice: AuthService,
        private notify: PortalNotificationService) { }

    ngOnInit() {
        const authObserv = this.authservice.getClearUserName()
            .flatMap(userNameresult => this.contentService.getDeputationInquery(userNameresult));

        this.busy = authObserv.subscribe(next => {
            if (next.d != undefined) this.deputationData = next.d;
        },
            error => {
                console.log(error);
                this.notify.NavigateHomeOnly();
            },

            () => {
               // console.log(this.deputationData);
            });


    }
    detailsData: any = {};
    openDetails(dNo: string) {

        const details = this.deputationData.DeputationInfoList.filter(x => x.DecisionNo == dNo);
        if (details.length > 0) {
            this.detailsData = details[0];
            this.modal.open();
        }

    }

}