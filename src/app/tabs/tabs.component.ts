import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    if(document.body.scrollTop>323){
      this.tabsStyle = ['tabs', 'tabs--fixed'];
    }
    else{
      this.tabsStyle = ['tabs'];
    }

  }
  
  @Output() selectedTab = new EventEmitter();
  tabsStyle = ['tabs'];
  tabs = [
    {
      name: 'videos',
      style : ['tabs__tab', 'tabs__tab--selected']
    },
    {
      name: 'articles',
      style : ['tabs__tab']
    },
    {
      name: 'podcasts',
      style : ['tabs__tab']
    },
  ];
  constructor() { }
  selectTab(tab){
    for (let t of this.tabs){
      t.style = ['tabs__tab']
    }
    tab.style = ['tabs__tab', 'tabs__tab--selected']
    this.selectedTab.emit(tab.name)
  }
  ngOnInit() {

  }

}
