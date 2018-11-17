import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  greeting:string = "Welcome from Angular content project section";

  constructor() { }

  ngOnInit() {
  }

}
