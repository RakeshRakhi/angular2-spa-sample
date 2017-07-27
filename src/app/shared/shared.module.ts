import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { TopMenuNavComponent } from 'app/shared/top_nav/top_menu.component';
import { UsrPipe } from 'app/shared/userName.pipe';
import { BusyModule } from 'angular2-busy';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { FilterPipe } from 'app/shared/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    RouterModule, DataTableModule,Ng2Bs3ModalModule
  ],
  exports: [ TopMenuNavComponent, UsrPipe, BusyModule, Ng2Bs3ModalModule, DataTableModule, FilterPipe],
  declarations: [ TopMenuNavComponent, UsrPipe, FilterPipe, ]
})
export class SharedModule { }
