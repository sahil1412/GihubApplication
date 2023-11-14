import { Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { SearchService } from '../service/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  user! : User;
  searchText! : string;
  displayUserDetailContainer = false;
  displayGithubUserErrorNotFound = false;
  username: string = "";
  constructor(private searchService : SearchService){}
  @ViewChild('f')
  searchForm! : NgForm;
  ngOnInit() : void{}

  searchGithubUser(data : any) {
    // console.warn(data);
    this.searchText = data;
    this.searchService.getUserResponse(this.searchText).then(
      (response) =>{
        this.user = this.searchService.getUserDetails;
        this.displayUserDetailContainer = true;
      },(error) =>{
        console.log(error);
        this.displayGithubUserErrorNotFound = true;
      }
    );   
  }

}
