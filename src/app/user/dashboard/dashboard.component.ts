import { Component, OnInit } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
declare var InitTabs: any;
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {

    constructor(private contentService: ContentService, private router: Router, private route: ActivatedRoute, ) { }

    tabs: Array<Object>;
    currentTab: string;
    ngOnInit() {
        this.gettabs();
        this.currentTab = this.route.snapshot.params['tab'];

    }
    gettabs() {
        const observable = this.contentService.getTabs().subscribe(
            res => this.tabs = res,
            err => { throw (err); },
            () => {
                console.log('fetching tabs completed');

            }

        );
    }

    count = 0;
    ngAfterViewChecked() {
        const tabselem = document.getElementsByClassName('active');
        if (tabselem.length > 0 && this.count < 1) {
            InitTabs(this.currentTab);
            this.count++;
        }

    }



}
