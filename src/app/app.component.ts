import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "app/services/auth/auth.service";
import { NgRedux } from "@angular-redux/store/lib";
import { IUserProfile, rootReducer, InitialState } from "app/state/iUserProfile";
import { AssignRole } from "app/state/actions";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {
  constructor(private ngRedux: NgRedux<IUserProfile>, private authService: AuthService) {
    ngRedux.configureStore(rootReducer, InitialState)
  }
  ngOnInit(): void {
    
    let state = this.ngRedux.getState();
    if (state != undefined) {
      let role = state.Role;
      if (role == "") {
        this.authService.getClearUserName().subscribe(data => {
          if (+data > 0) {
            role = 'student';
          }
          else {
            role = 'user';
          }
          this.ngRedux.dispatch({ type: AssignRole, value: role });
        }, error => console.log(error));

      }
    }
  }


}
