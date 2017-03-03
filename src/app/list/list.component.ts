import { Component, OnInit, Input, EventEmitter,HostListener } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    console.debug("Scroll Event", document.body.scrollTop);
    if(document.body.scrollTop>this.loadPosition) {
        this.loadResults(this.nextUrl);
        this.loadPosition = this.loadPosition +3000
    }
  }

  @Input() listInfo: EventEmitter<any>;
  public category="videos"
  public sharing = false;
  public nextUrl = null;
  public list = [];
  public loadPosition = 2800;
  public emptyState = {
    index: 0,
    messages: [
      {
        title: "Bored at work?",
        message: "Set the timer and we will serve up some awesome content."
      },
      {
        title: "Sitting on the john?",
        message: "Pick a time and we will find the perfect thing to read."
      },
      {
        title: "At a party and wishing you weren't?",
        message: "Choose a time and we will find something for you to do."
      }
    ]
  }
  public url:string;
  constructor(
    private http:Http,
    private router: Router,
  ) { }
  private shareItem($event){
    this.url = window.location.origin + "/" + this.category + "/" + $event.id;
    this.sharing = true;
  }
  private doneSharing($event){
    this.sharing = false;
  }
  private navigateTo(listItem){
    if(listItem.source === "Medium"){
      window.open(listItem.link, '_blank');
    }
    else{
      let route = "/"+this.category+"/"+listItem.id
      this.router.navigate([route]);
    }
  }
  private loadResults(url) {
    this.http.get(url)
      .map(response => response.json())
      .subscribe((res)=>{
        this.list = this.list.concat(res.results);
        if(res.next !== null) this.nextUrl = res.next;
    })
  }
  ngOnInit() {

    this.emptyState.index = Math.floor(Math.random()*(this.emptyState.messages.length))
    this.listInfo.subscribe((lInfo)=>{
      this.list = [];
      this.loadResults(lInfo.url);
      this.category = lInfo.category
    })

  }

}
