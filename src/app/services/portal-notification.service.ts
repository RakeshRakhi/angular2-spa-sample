import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class PortalNotificationService {

  constructor(private router: Router) { }

  NotifyNoDataUser(): void {
    
    let enMsg = "There is no data ";
    let arMsg = "لايوجد لديك بيانات";
    alert(`${enMsg} - ${arMsg}`);
    this.router.navigate(['user/home']);
  }

  NavigateHomeOnly():void{
     this.router.navigate(['user/home']);
  }

}
