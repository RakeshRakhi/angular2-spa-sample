import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'app/services/content.service';
import { DataTableModule } from 'angular2-datatable';
@Component({
    moduleId: module.id,
    templateUrl: 'decision.component.html'
})
export class DecisionComponent implements OnInit {

    constructor(private service: ContentService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.LoadData();
    }
    dataList: Array<any>;
    fullDatalist: Array<any>;
    LoadData() {

        let dataType = this.route.snapshot.data['type'];
        if (dataType == undefined) dataType = 'D';
        console.log(`route data ${dataType['type']}`);
        const observ = this.service.getDecisionData(dataType);
        observ.subscribe(
            next => {
                this.dataList = next;
                this.fullDatalist = next;
                
            },
            error => console.log(error),
            () => { });
    }

    AuthorityFilter(val: string) {

        this.dataList = this.fullDatalist;
        if (val != '') {
            this.dataList = this.dataList.filter(x => x.Authority.includes(val));
        }

    }
    NumberFilter(val: string) {

        this.dataList = this.fullDatalist;
        if (val != '') {
            this.dataList = this.dataList.filter(x => x.DecisionNumber.includes(val));
        }

    }
    SubjectFilter(val: string) {

        this.dataList = this.fullDatalist;
        if (val != '') {
            this.dataList = this.dataList.filter(x => x.Decision.includes(val));
        }

    }
    checkMediaUrl(data:string, stringToCheck :string):boolean{
        return data.startsWith(stringToCheck);
    }

}