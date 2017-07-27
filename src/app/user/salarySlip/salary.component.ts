import { Component, OnInit } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { PortalNotificationService } from "app/services/portal-notification.service";


@Component({
    moduleId: module.id,

    templateUrl: 'salary.component.html'
})
export class SalarySlipComponent implements OnInit {
    constructor(private contentService: ContentService, private notify: PortalNotificationService) { }

    ngOnInit() {
        this.getSalarySlip();
    }

    salaryData: any = {};
    getSalarySlip() {

        const absorvable = this.contentService.getSalarySlip().subscribe(
            data => {
                if (data != null)
                    this.salaryData = data;
                else {
                    this.notify.NotifyNoDataUser();
                    
                }
                console.log(data);
            },
            error => {
                console.log(error);
                this.notify.NavigateHomeOnly();
            },
            () => { }
        );
    }
}