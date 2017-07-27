import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ContentService } from 'app/services/content.service';
import { TranslateService } from 'app/services/Translate/translation.service';

@Injectable()
export class HomeResolver implements Resolve<any>{


    constructor(private contentService: ContentService, private translateService: TranslateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const ob = Observable.forkJoin(
            this.contentService.getNews(),
            this.contentService.getsliderImages(this.translateService.currentLang)
        );
        return ob;
    }
}