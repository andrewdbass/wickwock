import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @Output() selectedTags = new EventEmitter();
  public tags: Array<any>;
  private allSelected = {
    state: true,
    style: ['tags__tag', "tags__tag--selected", "tags__tag--global"]
  }
  constructor(
    private http: Http
  ) { }
  private updateOutput(){
    let arr = [];
    for(let tag of this.tags){
      if(tag.selected) arr.push(tag);
    }
    this.selectedTags.emit(arr);
  }
  private toggleAllTags(){
    if(this.allSelected.state){
      for (let tag of this.tags){
        tag.selected = false;
        tag.style = ["tags__tag"]
      }
      this.allSelected.state = false;
      this.allSelected.style = ['tags__tag',  "tags__tag--global"]
      this.updateOutput();
    }
    else{
      for (let tag of this.tags){
        tag.selected = true;
        tag.style = ["tags__tag", "tags__tag--selected"]
      }
      this.allSelected.state = true;
      this.allSelected.style = ['tags__tag', "tags__tag--selected", "tags__tag--global"]
      this.updateOutput();
    }
  }
  private toggleTag(tag){
    tag.selected = !tag.selected;
    if(tag.selected){
      tag.style = ["tags__tag", "tags__tag--selected"];
    }
    else{
      tag.style = ["tags__tag"];
      this.allSelected.state = false;
      this.allSelected.style = ['tags__tag', "tags__tag--global"]
    }
    this.sortTags();
    this.updateOutput();
  }
  private sortTags(){
    this.tags.sort((a,b) => {
      if(!a.selected && b.selected) return 1;
      if(a.selected && !b.selected) return -1;
      return 0;
    });
  }
  private loadResults(url?: string) {
    if(url){
      this.http.get(url)
        .map(response => response.json())
        .subscribe((r)=>{
        console.log(r);
        this.tags = this.tags.concat(r.results);
        if(r.next){
          console.log(r.next);
          this.loadResults(r.next);
        }
        else{
          for( let tag of this.tags) {
            tag.style = ["tags__tag", "tags__tag--selected"]
            tag.selected = true;
          }
        }
        this.updateOutput()
      })
    }
    else{
      this.http.get("https://m.wickwock.com/api/tags")
        .map(response => response.json())
        .subscribe((r)=>{
        this.tags = this.tags.concat(r.results)
        console.log(r)
        if(r.next){
          console.log(r.next)
          this.loadResults(r.next)
        }
        else{
          for( let tag of this.tags) {
            tag.style = ["tags__tag", "tags__tag--selected"]
            tag.selected = true;
          }
        }
        this.updateOutput()
      })
    }
  }
  ngOnInit() {
    this.tags = [];
    this.loadResults();
  }
}
