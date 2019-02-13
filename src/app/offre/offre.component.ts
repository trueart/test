import { Component, OnInit} from '@angular/core';
import * as M from "../../assets/materialize/js/materialize.min.js";

@Component({
  selector: 'app-offre',
  templateUrl: 'offre.component.html',
  styleUrls: ['offre.component.scss']
})
export class OffreComponent implements  OnInit{
 images: string[];
 options= {fullWidth: true, height: 300, transition:500, interval:6000};
 options1 = {};
  constructor() { }

  ngOnInit(){
    this.images= ['/assets/images/amina_La_pluie.jpg', 
    '/assets/images/2008acry1.jpg',
    '/assets/images/amina_brouillard.jpg'];
    var elems = document.querySelector('.slider');
    var instances = M.Slider.init(elems, this.options);

    document.addEventListener('DOMContentLoaded', function() {
      var elems1 = document.querySelectorAll('.modal');
      var instances1 = M.Modal.init(elems, this.options1);
    });
  }
   
}

