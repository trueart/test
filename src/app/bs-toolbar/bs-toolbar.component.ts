import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import {CoursexosService} from  '../coursexos.service';
import {SideMenu} from '../matnavlist/sidemenu.model';
@Component({
  selector: 'app-bs-toolbar',
  templateUrl: './bs-toolbar.component.html',
  styleUrls: ['./bs-toolbar.component.scss']
})
export class BsToolbarComponent  {
  @Output() snavToggle = new EventEmitter<void>();
  menu : [string]; menuCode : [string];
  @Output() menuEvent = new EventEmitter<[string]>();
  @Output() menuCodeEvent = new EventEmitter<[string]>();
  constructor(public authenticationService: AuthenticationService,
              private cours: CoursexosService,
              private toastr: ToastrService) { }

  onToggle() {
    this.cours.currentSidenavValue.subscribe(msg => {//console.log('ici22menu=', msg); 
                                                    this.menu= msg;     
                                                    });
    this.cours.currentSidenavCodeValue.subscribe(msg => {//console.log('ici22menuCode=', msg); 
                                                        this.menuCode= msg;     
                                                  });                                                    

    console.log("oninitmenu2=", this.menu);
    if (this.menu && this.menuCode) {
      this.menuEvent.emit(this.menu);
      this.menuCodeEvent.emit(this.menuCode);
    }
    
    this.snavToggle.emit();
  }


}
