import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  public isNavOpen = false;

  constructor() {
  }

  ngOnInit() {
  }



  public onToggleNavCollapse() {

  }
}
