import { Component, OnInit, OnDestroy } from '@angular/core';
import { IContact } from 'src/app/interfaces/icontact';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  results: IContact[];
  private _isFilterContactsAsObservable;
  private _disposable;

  constructor(private searchService:SearchService) { }

  ngOnInit() {
    this._isFilterContactsAsObservable = this.searchService.isSearchListAsAObservable();
    this._disposable = this._isFilterContactsAsObservable.subscribe(
      (filtered: IContact[]) =>{
        this.results = filtered;
      }
    )
  }

  ngOnDestroy() {
    this.searchService.clearSearch();
    this._disposable.unsubscribe();
  }

  // searchContactHome(contacts: IContact[]) {
  //   console.log(contacts)
  //   this.results = contacts;
  // }
}
