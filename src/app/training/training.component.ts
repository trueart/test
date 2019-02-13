//RG3 AfterViewInit
import { Component, OnInit, Output, EventEmitter,Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CoursexosService } from '../coursexos.service';
import {exocours} from './exocours.model';
import { Subscription } from 'rxjs';

import { DomSanitizer} from '@angular/platform-browser';
import { Icoursexos} from './coursexos.model';
import { NgxSmartModalComponent, NgxSmartModalService } from '../../ngx-smart-modal';
import * as M from "../../assets/materialize/js/materialize.min.js";
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']

})
//RG3 AfterViewInit
export class TrainingComponent implements OnInit, AfterViewInit {

  @Output() varSelectcoursExo = new EventEmitter<void>();


  crsexodis: exocours[] = [];
  crsexoSubscription: Subscription;
  courselected: exocours = {id:'', url:''};
  training : {"CSurlselected": string, "CSimageselected": string} =  {"CSurlselected": "", "CSimageselected": ""};
  CSchapexoselected : string;
 
  urlselected : string;
  urlinit : string = 'https://www.youtube.com/embed/';
  imageinit: string = "/assets/images/";
  selectedValue: string;
  options={};
  entetecours:string;
  public coursexosdispo = [] ;
  cours:[{chapitre:string, chapitre_url:string}] ;
  exercice:[{exercice:string, exercice_url:string}] = [{"exercice": "", "exercice_url":""}];
  coursexos: Icoursexos;
  
  err :string;
  ngclass = 'mat-video-responsive';
image: string;
images: string[];

  constructor(private crsexo: CoursexosService, 
              private domsanitize: DomSanitizer,
              private route: ActivatedRoute,
              //rg3
              public ngxSmartModalService: NgxSmartModalService
              ) {}


  ngOnInit() {
    /*this.images= ['/assets/images/amina_La_pluie.jpg', 
    '/assets/images/2008acry1.jpg',
    '/assets/images/amina_brouillard.jpg'];*/
    console.log("training=");
    this.crsexodis = this.crsexo.getCrsexodispo();

    this.CSchapexoselected = this.crsexodis[0].id;

    this.route.queryParams.subscribe(params => {
      const page = params['page'];
      console.log("page=", page);
      //rg 2 
      if (page == 0){
        console.log("page=", page);
        this.crsexo.getcoursexos()
        .subscribe(response => {console.log('responsesCours=',response);
                                let cours1 : [{"chapitre":string, "chapitre_url":string}] = [{"chapitre":"", "chapitre_url":""}];
                                let exercice1 : [{exercice:string, exercice_url:string}] = [{"exercice":"", "exercice_url":""}];
                                let  cours1unitaire; let exercice1unitaire;
                                for (let i of Object.keys(response)) {
                                  let k =0; let j= 0; let m = 0;
                                  console.log('Object.keys(response)=',Object.keys(response));
                                  if (response[i].cour_type == "0"){
                                      cours1unitaire = {"chapitre": response[i].rcha_lib + ": partie " + response[i].cour_numvideo, "chapitre_url":response[i].cour_url};
                                      if (cours1[0].chapitre == ""){
                                        cours1[0] = cours1unitaire;
                                      } else {
                                        cours1.push(cours1unitaire);
                                      }
                                  } else {
                                    if (response[i].cour_type == "1"){
                                        exercice1unitaire = {"exercice": response[i].rcha_lib + ": exercice " + response[i].cour_numvideo, "exercice_url":response[i].cour_url};
                                        if (exercice1[0].exercice == ""){
                                          exercice1[0] = exercice1unitaire;
                                        } else {
                                          exercice1.push(exercice1unitaire);
                                        }
                                    }
                                  }
                                }
                                this.entetecours = response[0].rcha_lib;
                                console.log('this.entetecours=',this.entetecours);
                                this.cours = cours1;
                                this.exercice = exercice1;
                                console.log('this.cours=',cours1);
                                console.log('this.exercice=',exercice1);
       // console.log("listecoursfinale= ", this.chapitre );
                              });

      } else {
        this.crsexo.getDropDownCours(page)
        .subscribe(response => {//console.log('responsesCours=',response);
                              let cours1 : [{"chapitre":string, "chapitre_url":string}] = [{"chapitre":"", "chapitre_url":""}];
                              let exercice1 : [{exercice:string, exercice_url:string}] = [{"exercice":"", "exercice_url":""}];
                              let  cours1unitaire; let exercice1unitaire
                              for (let i of Object.keys(response)) {
                                let k =0; let j= 0; let m = 0;
                                 console.log('Object.keys(response)=',Object.keys(response));
                                 if (response[i].cour_type == "0"){
                                    cours1unitaire = {"chapitre": response[i].rcha_lib + ": partie " + response[i].cour_numvideo, "chapitre_url":response[i].cour_url};
                                    if (cours1[0].chapitre == ""){
                                      cours1[0] = cours1unitaire;
                                    } else {
                                      cours1.push(cours1unitaire);
                                    }
                                 } else {
                                   if (response[i].cour_type == "1"){
                                      exercice1unitaire = {"exercice": response[i].rcha_lib + ": exercice " + response[i].cour_numvideo, "exercice_url":response[i].cour_url};
                                      if (exercice1[0].exercice == ""){
                                        exercice1[0] = exercice1unitaire;
                                      } else {
                                        exercice1.push(exercice1unitaire);
                                      }
                                   }
                                 }
                              }
                              this.entetecours = response[0].rcha_lib;
                              console.log('this.entetecours=',this.entetecours);
                              this.cours = cours1;
                              this.exercice = exercice1;
                              console.log('this.cours=',cours1);
                              console.log('this.exercice=',exercice1);
                             // console.log("listecoursfinale= ", this.chapitre );
                          })
      }

      
    });
    
  
   // console.log('ici');
    //from json fake server
   /* this.crsexo.getcoursexos1()
         .subscribe((data:Icoursexos[]) => {this.coursexosdispo =  data; this.training.CSurlselected = this.urlinit + this.coursexosdispo[0].url;
                                                                         this.training.CSimageselected = this.imageinit + this.coursexosdispo[0].url + ".jpg"});
    
    this.crsexo.getcoursexos()
         .subscribe((data: Icoursexos) =>  {this.coursexos =  data; console.log('coursexos=', JSON.stringify(this.coursexos))});
 */
    //console.log('coursexos=', JSON.stringify(this.coursexos));

  
    //var elems = document.querySelectorAll('.collapsible');
    //var instances = M.Collapsible.init(elems, this.options);
   
  }

  getEmbedUrl(){
  //  console.log('this.CSurlselected=', this.training.CSurlselected);
    return this.domsanitize.bypassSecurityTrustResourceUrl( this.training.CSurlselected);
  }

  getImageSrc(){
    if (!(this.training.CSimageselected =="")){
      console.log('CSimageselected=', this.training.CSimageselected);
      return this.training.CSimageselected ;
    } else {
      return this.imageinit + "2007ptitf.jpg";
    } 
    
  }
  selectChangeHandler(valeur:any){
    //console.log('valeur1=', valeur);
    //const selectedExocours = this.coursexosdispo.find( ecdispo => ecdispo.id === valeur );
    const selectedExocours = valeur;
    //alert(this.urlinit + selectedExocours.url);
    this.training.CSurlselected = this.urlinit + valeur + "?rel=0&autoplay=1&controls=0&showinfo=0&ecver=1&enablejsapi=1";
    this.training.CSimageselected = this.imageinit + valeur + ".jpg";
    console.log('this.valeur=',valeur);
    return this.training;
  }


  
//RG3 AfterViewInit
ngAfterViewInit() {
  const obj: Object = {
    prop1: 'test',
    prop2: true,
    prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
    prop4: 327652175423
  };
  this.ngxSmartModalService.setModalData(obj, 'modalData');
  this.ngxSmartModalService.getModal('modalData').onOpen.subscribe((modal: NgxSmartModalComponent) => {
   // console.log(modal.getData());
  });  

  this.ngxSmartModalService.setModalData(obj, 'modalData');

  this.ngxSmartModalService.getModal('videoModal').onOpen.subscribe((modal: NgxSmartModalComponent) => {
    console.log('Rickroll modal opened!', modal);
  });  
}
 
visuvideo (val: number){
  return "visuvideo" + val;
}
}
