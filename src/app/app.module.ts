import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


/****** Modules */
import { BusyModule } from 'angular2-busy';
import { HttpService } from 'app/services/http/http.service';
import { AuthService } from 'app/services/auth/auth.service';
import { TranslateService } from 'app/services/Translate/translation.service';
import { TRANSLATION_PROVIDERS } from 'app/services/Translate/translation.provider';
import { UserModule } from 'app/user/user.module';
import { AuthGuardService } from 'app/services/auth/auth-guard.service';
import { ContentService } from 'app/services/content.service';
import { ContactComponent } from 'app/contact/contact.component';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { PortalNotificationService } from "app/services/portal-notification.service";




@NgModule({
  exports: [],
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpModule, AppRoutingModule,
    BusyModule, BrowserAnimationsModule,
    UserModule,

    NgReduxModule 
  ],
  providers: [AuthService, HttpService, TranslateService, TRANSLATION_PROVIDERS,
   AuthGuardService, ContentService,PortalNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
