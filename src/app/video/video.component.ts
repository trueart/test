import { Component, OnInit, Injectable } from '@angular/core';
import { TrainingComponent } from "../training/training.component";
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
@Injectable()
export class VideoComponent implements OnInit {
  src: string;
  constructor(private tc: TrainingComponent ) { }

  ngOnInit() {
    this.src = "https://www.youtube.com/watch?v=U0fk5L1ifbo";
  }
  onSrc(){
    
  }
}
