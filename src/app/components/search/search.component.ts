import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public search: string = '';

  public constructor(public searchService: SearchService, private router: Router) {
  }

  public handleSubmit(e: SubmitEvent, searchEl: HTMLInputElement) {
    e.preventDefault();
    this.searchService.setSearchQuery(searchEl.value);
    this.router.navigateByUrl(`search/${searchEl.value}`);
  }
}
