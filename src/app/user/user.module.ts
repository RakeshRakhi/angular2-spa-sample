import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router/';
import { AuthGuardService } from 'app/services/auth/auth-guard.service';
import { TopMenuNavComponent } from 'app/shared/top_nav/top_menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
 
import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from 'app/user/home/home.component';
import { HomeResolver } from 'app/user/home/home.resolver';
import { AdministrativeComponent } from 'app/user/AdminiatrativeGuides/administrative.component';
import { SalarySlipComponent } from 'app/user/salarySlip/salary.component';
import { VacationInquery } from 'app/user/vacationInquery/vacationInquery.component';
import { BusyModule } from 'angular2-busy';
import { OverTimeComponent } from 'app/user/overTime/overTime.component';
import { DeputationInqueryComponent } from 'app/user/deputationInquery/deputationInquery.component';
import { CourseInqueryComponent } from 'app/user/courseInquery/courseInquery.component';
import { SalaryCertificateComponent } from 'app/user/salaryCertificate/salaryCertificate.component';
import { FormsComponent } from 'app/user/forms/forms.component';
import { ContactComponent } from 'app/contact/contact.component';
import { DecisionComponent } from 'app/user/decision/decision.component';
import { CircularComponent } from 'app/user/circular/circular.component';


const userChiledRoutes: Routes = [
  { path: 'home', component: HomeComponent, data: { role: 'employee' }, canActivate: [AuthGuardService], resolve: { trans: HomeResolver } },
  { path: 'decision', component: DecisionComponent, data: { role: 'employee', type: 'D' }, canActivate: [AuthGuardService] },
  { path: 'circular', component: CircularComponent, data: { role: 'employee', type: 'C' }, canActivate: [AuthGuardService] },


  { path: 'salaryslip', component: SalarySlipComponent, data: { role: 'employee', }, canActivate: [AuthGuardService] },
  { path: 'vacation-inquery', component: VacationInquery, data: { role: 'employee', }, canActivate: [AuthGuardService] },
  { path: 'overtime-inquery', component: OverTimeComponent, data: { role: 'employee', }, canActivate: [AuthGuardService] },
  { path: 'deputation-inquery', component: DeputationInqueryComponent, data: { role: 'employee', }, canActivate: [AuthGuardService] },
  { path: 'course-inquery', component: CourseInqueryComponent, data: { role: 'employee', }, canActivate: [AuthGuardService] },
  { path: 'salary-certificate', component: SalaryCertificateComponent, data: { role: 'employee', }, canActivate: [AuthGuardService] },

  { path: 'dashboard', component: DashboardComponent, data: { role: 'employee' }, canActivate: [AuthGuardService], },
  { path: 'dashboard/:tab', component: DashboardComponent,data: { role: 'employee' }, canActivate: [AuthGuardService] },
  { path: 'adminiatrative-guides', component: AdministrativeComponent,data: { role: 'employee' }, canActivate: [AuthGuardService] },
  { path: 'forms', component: FormsComponent,data: { role: 'employee' }, canActivate: [AuthGuardService] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '/user/home',data: { role: 'employee' }, pathMatch: 'full', canActivate: [AuthGuardService] },
];
const userRoutes: Routes = [
  { path: 'user', component: UserComponent, children: userChiledRoutes, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/user/home', data: { role: 'employee' }, pathMatch: 'full', canActivate: [AuthGuardService] },
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    SharedModule,

  ],
  exports: [RouterModule],
  declarations: [UserComponent, DashboardComponent, HomeComponent, AdministrativeComponent,
    SalarySlipComponent, VacationInquery, OverTimeComponent, DeputationInqueryComponent, CourseInqueryComponent,
    SalaryCertificateComponent, FormsComponent, DecisionComponent, CircularComponent],
  providers: [HomeResolver]
})
export class UserModule { }
