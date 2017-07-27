import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal';
import { AuthService } from 'app/services/auth/auth.service';
import { ContentService } from 'app/services/content.service';
import { PortalNotificationService } from "app/services/portal-notification.service";


@Component({
    moduleId: module.id,
    templateUrl: 'courseInquery.component.html',

})
export class CourseInqueryComponent implements OnInit {
busy: any;
    constructor(private contentService: ContentService, private authservice: AuthService,
     private notify: PortalNotificationService) { }
    courseData: any = {};
    ngOnInit() {
        const authObserv =
            this.authservice.getClearUserName().flatMap(userNameresult => this.contentService.getCourseInquery(userNameresult));
      this.busy =  authObserv.subscribe(next => {
            if (next.d != undefined) {
                this.courseData = next.d;
            }
        },
             error => {
                console.log(error);
                this.notify.NavigateHomeOnly();
            },
            () => {
                console.log(this.courseData);
            });
    }

}