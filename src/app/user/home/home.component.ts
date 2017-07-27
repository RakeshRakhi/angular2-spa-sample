import { Component, OnInit } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { TranslateService } from 'app/services/Translate/translation.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  trans: any;
  constructor(private contentService: ContentService, private authService: AuthService
    , private translateService: TranslateService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.trans = this.route.snapshot.data['trans'];
    if (this.trans != undefined && this.trans.length > 0) {
      this.news = this.trans[0];
      this.sliderImage = this.trans[1];
    }

    this.getRole();
  }
  sliderImage: any;
  favoriteLinks: any;
  newLinks: any;
  role: any;
  news: any;
  getHomeFavoriteLinks(type: string) {
    this.contentService.getServiceslinks(type).subscribe(
      res => this.favoriteLinks = res,
      error => console.log(error),
      () => { }
    );
  }
  getNews() {
    this.contentService.getNews().subscribe(
      res => this.news = res,
      error => console.log(error),
      () => { }
    );
  }
  getHomeNewLinks(type: string) {
    this.contentService.getServiceslinks(type).subscribe(
      res => this.favoriteLinks = res,
      error => console.log(error),
      () => { }
    );
  }
  getSlider() {
    const observable = this.contentService.getsliderImages(this.translateService.currentLang)
      .subscribe(
      res => {
        this.sliderImage = res;
        console.log(res);
      },
      error => console.log(error),
      () => { }
      );
  }
  getRole() {
    const observable = this.authService.getRoles();
    observable.subscribe(
      next => {
        this.role = next[0];
      },
      error => console.log(error),
      () => { }
    );
  }
 
}
