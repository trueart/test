import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import {CoursexosService} from  '../coursexos.service';

@Component({
  selector: 'app-matnavlist',
  templateUrl: './matnavlist.component.html',
  styleUrls: ['./matnavlist.component.scss'],
  providers: [CoursexosService]
})
export class MatnavlistComponent implements OnInit {
@Output() sidenavToggle = new EventEmitter<void>();
@Input() menu: [string];
@Input() menuCode: [string];
cour:[{chapitre:string, chapitre_url:string}];
@Output() courEvent = new EventEmitter<[{chapitre:string, chapitre_url:string}]>();
  
  constructor(private cours: CoursexosService) {
    console.log("oninitcours=");
   }

  
  onClose() {
      console.log("oninitcours2=");
    this.sidenavToggle.emit();
  }

  ngOnInit() {
    //this.cours.currentSidenavValue.subscribe(menu => {console.log('ici2=', menu); this.menu= menu;});
    console.log("oninitcours=");
  }
  

}
