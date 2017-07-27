import { Component, OnInit } from '@angular/core';
import { ContentService } from 'app/services/content.service';

@Component({
    moduleId: module.id,

    templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit {
    constructor(private contentService: ContentService) { }

    ngOnInit() {
        this.getForms();
     }
    formsLinks: Array<any>;
    getForms() {
        this.contentService.getMenuLinks('Forms').subscribe(
            res => this.formsLinks = res,
            error => console.log(error),
            () => {}
        );
    }

}