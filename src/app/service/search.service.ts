import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  getUserDetails : User;

  constructor(private http : HttpClient) {
    this.getUserDetails = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      0,
      0,
      new Date(),
    );

    }
    getUserResponse(githubUsername : string){
      interface ApiUserResponse{
        name : string,
        login : string,
        avatar_url:string,
        html_url:string,
        location:string,
        bio:string,
        public_repos:number,
        followers:number,
        following:number,
        created_at:Date,
      }

      let userPromise = new Promise<void>((resolve,reject) =>
      this.http.get<ApiUserResponse>(
        environment.apiUrl +
         '/' + 
         githubUsername
      + '?access_token=' + 
        environment.apiKey
      )
      .toPromise()
      .then(
        (response)=>{
          // this.getUserDetails = response;
          console.log(response);
          resolve();
        }
      )
      );
      return userPromise;
    }
}
