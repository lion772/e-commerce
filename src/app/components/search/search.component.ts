import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public search: string = '';

  public constructor(public searchService: SearchService) {
  }

  public ngOnInit(): void {
  }


  handleSubmit(e: SubmitEvent, search: HTMLInputElement) {
    e.preventDefault();
    this.searchService.setSearchQuery(search.value);
  }
}
