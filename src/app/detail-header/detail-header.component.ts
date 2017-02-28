import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.css']
})
export class DetailHeaderComponent implements OnInit {
  @Input() category: string;
  @Input() duration: string;
  @Input() url: string;
  public sharing = false
  constructor(
    private location:Location
  ) { }
  back(){
    this.location.back()
  }
  share(){
    this.sharing = true;
  }
  doneSharing($event){
    this.sharing = false;
  }
  ngOnInit() {
  }

}
